import { ApiProperty } from '@midwayjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersMetaData } from './usersMeta.entity';

@Entity('sys_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户id' })
  id: number;

  @Column()
  @ApiProperty({ description: '用户名，唯一' })
  username: string;

  @Column()
  @ApiProperty({ description: '用户密码' })
  password: string;

  @Column({
    name: 'phone_number',
  })
  @ApiProperty({ description: '用户手机号' })
  phoneNumber: string;

  @Column()
  @ApiProperty({
    description: '"用户性别，枚举类型：男性(1)、女性(2)、其他(3)',
  })
  gender: number;

  @Column()
  @ApiProperty({ description: '用户称号' })
  nickname: string;

  @Column({
    name: 'profile_picture_url',
  })
  @ApiProperty({ description: '用户头像的URL' })
  profilePictureUrl: string;

  @Column({
    name: 'profile_description',
  })
  @ApiProperty({ description: '用户简介' })
  profileDescription: string;

  @Column('simple-json')
  @ApiProperty({ description: '元信息', type: UsersMetaData })
  metadata: UsersMetaData;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  @ApiProperty({ description: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  @ApiProperty({ description: '更新时间' })
  updatedAt: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  @ApiProperty({ description: '逻辑删除时间' })
  deletedAt: string;
}
