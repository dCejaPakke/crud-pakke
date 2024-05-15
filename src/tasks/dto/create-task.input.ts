import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNegative, IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({defaultValue: false})
  completed: boolean;

  @Field(type => Int)
  @IsNotEmpty()
  @IsPositive()
  userId: number
}
