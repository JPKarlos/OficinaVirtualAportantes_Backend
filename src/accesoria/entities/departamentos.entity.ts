import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Municipio } from './municipios.entity';

@Entity({
  name: 'Departamentos',
  database: 'SIRIS_EPS',
  schema: 'Accesoria',
  synchronize: false,
})
export class Departamento {
  @PrimaryColumn({ name: 'Departamento_Ide', type: 'int' })
  departamentoIde: number;

  @Column({ name: 'codigo', type: 'nvarchar', length: 2, nullable: false })
  codigo: string;

  @Column({ name: 'descripcion', type: 'nvarchar', length: 100, nullable: false })
  descripcion: string;

  @OneToMany(() => Municipio, (municipio) => municipio.departamento)
  municipios?: Municipio[];
}
