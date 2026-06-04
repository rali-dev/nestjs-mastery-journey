import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true})
  email!: string;

  @Column({ length: 25, nullable: true })
  first_name!: string;

  @Column({ length: 25, nullable: true })
  last_name!: string;

  @Column({ nullable: true })
  age!: number;

  @Column({ length:100, nullable: false, select: false})
  password!: string;
}
