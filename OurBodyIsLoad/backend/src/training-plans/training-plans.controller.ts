import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { TrainingPlanBlueprint } from './schemas/training-plans.schema';
import { CreatePeriodizedTrainingCycleDto } from './dto/create-periodized-model.dto';

@Controller('training-plans')
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) {}

  @Post()
  async create(
    @Body() createTrainingPlanDto: CreateTrainingPlanDto,
  ): Promise<TrainingPlanBlueprint> {
    console.log(`controller`, createTrainingPlanDto);
    const newTrainingPlan = await this.trainingPlansService.create(
      createTrainingPlanDto,
    );
    console.log(newTrainingPlan);
    return newTrainingPlan;
  }

  @Post('periodized-training')
  async createPeriodizedTrainingCycle(
    @Body() createPeriodizedTrainingCycleDto: CreatePeriodizedTrainingCycleDto,
  ) {
    if (
      !createPeriodizedTrainingCycleDto.trainingPlans ||
      !createPeriodizedTrainingCycleDto.trainingPlans.length
    ) {
      throw new HttpException(
        'Training plans data is empty!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check each training plan for empty main and accessory exercises
    createPeriodizedTrainingCycleDto.trainingPlans.forEach((plan) => {
      if (!plan.mainExercises.length && !plan.accessoryExercises.length) {
        throw new HttpException(
          `Training plan for day ${plan.day} is empty. Ensure each training day has at least one main or accessory exercise.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    console.log(createPeriodizedTrainingCycleDto);
    const cycleOfTrainingPlans =
      await this.trainingPlansService.createPeriodizedModel(
        createPeriodizedTrainingCycleDto,
      );
    return cycleOfTrainingPlans;
  }

  @Get()
  findAll() {
    return this.trainingPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingPlansService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainingPlanDto: UpdateTrainingPlanDto,
  ) {
    return this.trainingPlansService.update(+id, updateTrainingPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingPlansService.remove(+id);
  }
}
