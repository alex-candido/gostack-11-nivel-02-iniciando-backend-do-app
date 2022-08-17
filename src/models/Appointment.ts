import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from './User';


@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, )
  @JoinColumn({
    name: 'provider_id',
    referencedColumnName: "id",
   })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
