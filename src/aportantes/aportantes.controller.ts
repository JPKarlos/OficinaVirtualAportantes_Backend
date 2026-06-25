import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
  StreamableFile,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Response } from 'express';
import { Auth, GetUser } from '../auth/decorators';
import { UserDataResponse } from '../auth/services/user-data.service';
import { AportantesService } from './aportantes.service';
import { CreateAportanteDto } from './dto/create-aportante.dto';

@Auth()
@Controller('aportantes')
export class AportantesCreateController {
  constructor(private readonly aportantesService: AportantesService) {}

  @Post()
  create(
    @Body() createAportanteDto: CreateAportanteDto,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.create(createAportanteDto, user.id);
  }

  @Get(':aportanteId/afiliados')
  getAfiliados(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getAfiliadosByAportanteId(
      aportanteId,
      user.id,
    );
  }

  @Get(':aportanteId/mora')
  getMora(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getMoraByAportanteId(aportanteId, user.id);
  }

  @Get(':aportanteId/incapacidades')
  getIncapacidades(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getIncapacidadesByAportanteId(
      aportanteId,
      user.id,
    );
  }

  @Get(':aportanteId/licencias')
  getLicencias(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getLicenciasByAportanteId(
      aportanteId,
      user.id,
    );
  }

  @Get(':aportanteId/solicitudes')
  getSolicitudes(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getSolicitudesByAportanteId(
      aportanteId,
      user.id,
    );
  }

  @Post(':aportanteId/solicitudes')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: memoryStorage(),
      limits: { fileSize: 15 * 1024 * 1024 },
    }),
  )
  createSolicitud(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @Body('tipoNovedadId') tipoNovedadId: string,
    @Body('observacion') observacion: string,
    @UploadedFiles() files: Express.Multer.File[],
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.createSolicitud(
      aportanteId,
      user.id,
      Number(tipoNovedadId),
      observacion,
      files ?? [],
    );
  }

  @Get(':aportanteId/certificado/paz-y-salvo')
  async getCertificadoPazYSalvo(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, fileName } =
      await this.aportantesService.generateCertificadoPazYSalvo(
        aportanteId,
        user.id,
      );

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(buffer);
  }

  @Get(':aportanteId/certificado/mora')
  async getCertificadoMora(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, fileName } =
      await this.aportantesService.generateCertificadoMora(aportanteId, user.id);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return new StreamableFile(buffer);
  }

  @Get(':aportanteId')
  getById(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.getAportanteById(aportanteId, user.id);
  }

  @Put(':aportanteId')
  update(
    @Param('aportanteId', ParseIntPipe) aportanteId: number,
    @Body() updateAportanteDto: CreateAportanteDto,
    @GetUser() user: UserDataResponse,
  ) {
    return this.aportantesService.update(
      aportanteId,
      updateAportanteDto,
      user.id,
    );
  }
}

@Auth()
@Controller('ultimaActualizacion')
export class UltimaActualizacionController {
  constructor(private readonly aportantesService: AportantesService) {}

  @Get(':aportanteId')
  findOne(@Param('aportanteId', ParseIntPipe) aportanteId: number) {
    return this.aportantesService.findUltimaActualizacion(aportanteId);
  }
}
