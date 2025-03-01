import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
