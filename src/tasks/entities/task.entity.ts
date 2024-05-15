import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: string;

  @Column()
  @IsNotEmpty()
  @Field()
  title: string;

  @Column({default: false})
  @Field()
  completed: boolean

  @ManyToOne(type => User, user => user.tasks)
  @Field(type => User)
  user: User;
}
