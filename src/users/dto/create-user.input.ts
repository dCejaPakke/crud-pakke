import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
