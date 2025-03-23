import { ApiProperty } from '@midwayjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('demo_article')
export class DemoArticleEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

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
