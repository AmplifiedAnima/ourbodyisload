import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Post(
    async createPeriodizedTrainingCycle: CreatePeriodizedTrainingCycleDto
  )
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
