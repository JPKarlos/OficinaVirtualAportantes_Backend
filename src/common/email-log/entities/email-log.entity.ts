import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Email_Log', schema: 'RIPS', synchronize: false })
export class EmailLog {
  @PrimaryGeneratedColumn({ name: 'Email_Log_Id', type: 'int' })
  id: number;

  @Column({ name: 'Table', type: 'varchar', nullable: false })
  table: string; // [radicacion]

  @Column({ name: 'Transaction_Id', type: 'int' })
  transactionId: number;

  @Column({ name: 'Process', type: 'varchar' })
  process: string; // [devolucion, auditoria]

  @Column({ name: 'Email', type: 'varchar', nullable: false })
  email: string;

  @Column({ name: 'Subject', type: 'varchar', nullable: false })
  subject: string;

  @Column({ name: 'Status', type: 'varchar', nullable: false })
  status: string;

  @Column({ name: 'MessageUUID', type: 'varchar', nullable: false })
  messageUUID: string;

  @Column({ name: 'MessageID', type: 'varchar', nullable: false })
  messageID: string;

  @Column({ name: 'MessageHref', type: 'varchar', nullable: false })
  messageHref: string;

  @Column({ type: 'date', name: 'Date_Send' })
  dateSend: Date;
}
