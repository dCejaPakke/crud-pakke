import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @IsEmail()
  @Field()
  email: string;

  @OneToMany(type => Task, task => task.user)
  @Field(type => [Task], {nullable: true})
  tasks?: Task[];
}
