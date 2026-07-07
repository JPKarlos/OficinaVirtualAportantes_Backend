import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAportanteDto } from '../dto/create-aportante.dto';
import { GetUltimaActualizacionAportanteByIdUseCase } from './get-ultimaactualizacionaportante-by-aportanteId.use-case';
import {
  UpdateAportanteResult,
  UpdateAportanteUseCase,
} from './update-aportante.use-case';

const MESES_LIMITE_ACTUALIZACION = 6;

@Injectable()
export class UpdateMisDatosAportanteUseCase {
  constructor(
    private readonly getUltimaActualizacionAportanteByIdUseCase: GetUltimaActualizacionAportanteByIdUseCase,
    private readonly updateAportanteUseCase: UpdateAportanteUseCase,
  ) {}

  async execute(
    aportanteId: number,
    updateAportanteDto: CreateAportanteDto,
    authenticatedUserId: string,
  ): Promise<UpdateAportanteResult> {
    const ultimaActualizacion =
      await this.getUltimaActualizacionAportanteByIdUseCase.findByAportanteId(
        aportanteId,
      );

    if (!ultimaActualizacion) {
      throw new ForbiddenException(
        'Debe actualizar sus datos mediante el proceso de actualización obligatoria.',
      );
    }

    if (
      ultimaActualizacion.mesesDesdeUltimaActualizacion >=
      MESES_LIMITE_ACTUALIZACION
    ) {
      throw new ForbiddenException(
        'Debe actualizar sus datos mediante el proceso de actualización obligatoria.',
      );
    }

    return this.updateAportanteUseCase.execute(
      aportanteId,
      updateAportanteDto,
      authenticatedUserId,
    );
  }
}
