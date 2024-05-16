import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User>{
    const newUser = await this.usersRepository.create(createUserInput);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      }
    });

    if(!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      }
    })

    if(!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(user, updateUserInput);
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        tasks: true,
      }
    })

    if(!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.usersRepository.remove(user);

    return 'User deleted';
  }

  async findTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        userId,
      }
    })
  }
}
