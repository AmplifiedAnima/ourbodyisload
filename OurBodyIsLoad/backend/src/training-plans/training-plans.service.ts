import { Injectable } from '@nestjs/common';
// import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';
import mongoose from 'mongoose';
import { TrainingPlanBlueprint } from './schemas/training-plans.schema';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { CreatePeriodizedTrainingCycleDto } from './dto/create-periodized-model.dto';

@Injectable()
export class TrainingPlansService {
  constructor(
    @InjectModel(ExerciseBlueprint.name)
    private exerciseBlueprintModel: mongoose.Model<ExerciseBlueprint>,
    @InjectModel(TrainingPlanBlueprint.name)
    private trainingPlanBlueprintModel: mongoose.Model<TrainingPlanBlueprint>,
  ) {}

  async create(createTrainingPlanDto: CreateTrainingPlanDto) {
    // Ensure mainExercisesPart and accesoryExercises are arrays
    const { mainExercisesPart, accesoryExercises } = createTrainingPlanDto;

    const trainingPlan = new this.trainingPlanBlueprintModel({
      mainExercisesPart,
      accesoryExercises,
    });

    // Save the document to the database
    const newTrainingPlan = await trainingPlan.save();

    console.log(`Created Training Plan: `, newTrainingPlan);
    console.log(`service log `, mainExercisesPart, accesoryExercises);
    return newTrainingPlan;
  }
  async createPeriodizedModel(
    createPeriodizedTrainingCycleDto: CreatePeriodizedTrainingCycleDto,
  ) {
    console.log(
      `new training periodized model ${createPeriodizedTrainingCycleDto}`,
    );
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
