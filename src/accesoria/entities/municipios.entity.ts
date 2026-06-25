import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Departamento } from './departamentos.entity';

@Entity({
  name: 'Municipios',
  database: 'SIRIS_EPS',
  schema: 'Accesoria',
  synchronize: false,
})
export class Municipio {
  @PrimaryColumn({ name: 'Municipio_ide', type: 'int' })
  municipioIde: number;

  @Column({ name: 'codigo', type: 'nvarchar', length: 3, nullable: false })
  codigo: string;

  @Column({ name: 'descripcion', type: 'nvarchar', length: 100, nullable: false })
  descripcion: string;

  @Column({ name: 'Departamento_Ide', type: 'int', nullable: false })
  departamentoIde: number;

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios)
  @JoinColumn({ name: 'Departamento_Ide', referencedColumnName: 'departamentoIde' })
  departamento?: Departamento;

  @Column({ name: 'zeDispGeo', type: 'int', nullable: true })
  zeDispGeo: number | null;

  @Column({ name: 'ZonaDispGeoContr', type: 'int', nullable: true })
  zonaDispGeoContr: number | null;

  @Column({ name: 'Cobertura', type: 'int', nullable: true })
  cobertura: number | null;
}
