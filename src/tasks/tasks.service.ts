import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  private async findTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      }
    });

    if(!task) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return task;
  }

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const newTask = await this.tasksRepository.create(createTaskInput);
    return await this.tasksRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.findTaskById(id);
    return task;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.findTaskById(id);
    Object.assign(task, updateTaskInput);
    await this.tasksRepository.save(task);

    return task;
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findTaskById(id);
    await this.tasksRepository.remove(task);

    return task;
  }
}
