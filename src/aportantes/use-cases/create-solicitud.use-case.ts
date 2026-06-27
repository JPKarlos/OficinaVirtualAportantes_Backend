import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { FtpService } from '../../common/ftp/ftp.service';
import { envs } from '../../config/envs';
import { CreateSolicitudResponseDto } from '../dto/solicitud-response.dto';
import { Aportante } from '../entities/aportantes.entity';
import { Solicitud } from '../entities/solicitud.entity';
import { V_Solicitudes } from '../entities/v_solicitudes.entity';
import {
  SOLICITUD_BY_RADICACION_SQL,
  generateCarpetaSoportes,
  generateRadicacion,
  mapSolicitudFromSqlRow,
} from '../mappers/solicitud.mapper';

const ESTADO_EN_TRAMITE_ID = 1;
const TIPOS_NOVEDAD_VALIDOS = new Set([1, 2, 3, 4, 5]);

export interface CreateSolicitudInput {
  aportanteId: number;
  authenticatedUserId: string;
  tipoNovedadId: number;
  observacion: string;
  files: Express.Multer.File[];
}

@Injectable()
export class CreateSolicitudUseCase {
  constructor(
    @InjectRepository(Solicitud, 'dbSIRIS_EPS')
    private readonly solicitudRepository: Repository<Solicitud>,
    @InjectRepository(V_Solicitudes, 'dbSIRIS_EPS')
    private readonly solicitudesViewRepository: Repository<V_Solicitudes>,
    @InjectRepository(Aportante, 'dbSIRIS_EPS')
    private readonly aportanteRepository: Repository<Aportante>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
    private readonly ftpService: FtpService,
  ) {}

  async execute(input: CreateSolicitudInput): Promise<CreateSolicitudResponseDto> {
    await this.assertAportanteAuthorized(
      input.aportanteId,
      input.authenticatedUserId,
    );

    if (!TIPOS_NOVEDAD_VALIDOS.has(input.tipoNovedadId)) {
      throw new BadRequestException('El tipo de novedad seleccionado no es válido.');
    }

    const observacion = input.observacion?.trim();
    if (!observacion) {
      throw new BadRequestException('La observación es obligatoria.');
    }

    if (!input.files?.length) {
      throw new BadRequestException(
        'Debe cargar al menos un documento de soporte.',
      );
    }

    const aportante = await this.aportanteRepository.findOne({
      where: { aportanteId: input.aportanteId },
    });

    if (!aportante) {
      throw new NotFoundException('No se encontró el aportante.');
    }

    const documentoAportante =
      aportante.idenAportante?.trim() ||
      String(input.aportanteId);

    const carpeta = generateCarpetaSoportes(documentoAportante);
    const basePath = envs.ftpPathSolicitudes.replace(/\\/g, '/').replace(/\/$/, '');
    const rutaSoportes = `${basePath}/${carpeta}`;

    const radicacion = generateRadicacion();

    await this.ftpService.uploadFilesToFolder(
      rutaSoportes,
      input.files.map((file) => ({
        originalName: file.originalname,
        buffer: file.buffer,
      })),
    );

    await this.solicitudRepository.insert({
      aportanteId: input.aportanteId,
      radicacion,
      fechaRadicacion: new Date(),
      estadoRadicacionId: ESTADO_EN_TRAMITE_ID,
      observacion,
      rutaSoportes,
      cantidadDocumentosCargados: input.files.length,
      tipoNovedadId: input.tipoNovedadId,
    });

    const rows: Record<string, unknown>[] =
      await this.solicitudesViewRepository.manager.query(
        SOLICITUD_BY_RADICACION_SQL,
        [radicacion],
      );

    if (!rows.length) {
      throw new NotFoundException(
        'La solicitud fue creada pero no fue posible consultarla.',
      );
    }

    return {
      solicitud: mapSolicitudFromSqlRow(rows[0]),
    };
  }

  private async assertAportanteAuthorized(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<void> {
    const authUser = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!authUser?.esAportante) {
      throw new ForbiddenException(
        'Solo los usuarios aportantes pueden crear solicitudes.',
      );
    }

    if (!authUser.aportanteId || authUser.aportanteId !== aportanteId) {
      throw new ForbiddenException(
        'No está autorizado para crear solicitudes de este aportante.',
      );
    }
  }
}
