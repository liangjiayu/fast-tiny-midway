import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('sys_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column()
  gender: number;

  @Column()
  nickname: string;

  @Column({
    name: 'profile_picture_url',
  })
  profilePictureUrl: string;

  @Column({
    name: 'profile_description',
  })
  profileDescription: string;

  // @Column()
  // metadata: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
