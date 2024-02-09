import { Injectable } from '@nestjs/common';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';

@Injectable()
export class TrainingPlansService {
  create(createTrainingPlanDto: CreateTrainingPlanDto) {
    console.log(createTrainingPlanDto);
    return 'This action adds a new trainingPlan';
  }

  findAll() {
    return `This action returns all trainingPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingPlan`;
  }

  update(id: number, updateTrainingPlanDto: UpdateTrainingPlanDto) {
    console.log(updateTrainingPlanDto);
    return `This action updates a #${id} trainingPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingPlan`;
  }
}
