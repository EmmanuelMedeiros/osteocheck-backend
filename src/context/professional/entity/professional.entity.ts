import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Patient } from "../../patients/entity/patients.entity";

@Entity({
  name: "professionals",
})
export class Professional {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  accountConfirmationToken!: string;

  @Column()
  forgotPasswordToken?: string;

  @Column()
  hasConfirmedAccount!: boolean;

  @ManyToMany(() => Patient)
  @JoinTable({
    name: 'professionalPatients',
    joinColumn: { name: 'professionalId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'patientId', referencedColumnName: 'id' },
  })
  patients!: Patient[];

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}