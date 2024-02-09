import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';

@Controller('training-plans')
export class TrainingPlansController {
  constructor(private readonly trainingPlansService: TrainingPlansService) {}

  @Post()
  create(@Body() createTrainingPlanDto: CreateTrainingPlanDto) {
    return this.trainingPlansService.create(createTrainingPlanDto);
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
  update(@Param('id') id: string, @Body() updateTrainingPlanDto: UpdateTrainingPlanDto) {
    return this.trainingPlansService.update(+id, updateTrainingPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingPlansService.remove(+id);
  }
}
