import { Injectable } from '@nestjs/common';
import { preExistingClass } from './schemas/preExistingClass.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePreExistingClassDto } from './dto/create-pre-existing-class.dto';

@Injectable()
export class preExistingClassesService {
  constructor(
    @InjectModel(preExistingClass.name)
    private classRepository: mongoose.Model<preExistingClass>,
  ) {}

  async create(
    createClassDto: CreatePreExistingClassDto,
  ): Promise<preExistingClass> {
    const createdClass = new this.classRepository(createClassDto);
    return createdClass.save();
  }
  findAll() {
    return this.classRepository.find({});
  }

  findOne(id: number) {
    return this.classRepository.findById(id).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
