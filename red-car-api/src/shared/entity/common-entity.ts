import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('CommonEntity')
export abstract class CommonEntity {
  @FilterableField(() => String)
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @FilterableField(() => Date)
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;
}
