import { Injectable } from '@nestjs/common';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseBlueprint } from 'src/exercises/Schemas/exercise.schema';
import mongoose from 'mongoose';
import { TrainingPlanBlueprint } from './schemas/training-plans.schema';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { CreatePeriodizedTrainingCycleDto } from './dto/create-periodized-model.dto';
import { CycleOfTrainingPlans } from './schemas/cycle-of-training-plans.schema';

@Injectable()
export class TrainingPlansService {
  constructor(
    @InjectModel(ExerciseBlueprint.name)
    private exerciseBlueprintModel: mongoose.Model<ExerciseBlueprint>,
    @InjectModel(TrainingPlanBlueprint.name)
    private trainingPlanBlueprintModel: mongoose.Model<TrainingPlanBlueprint>,
    @InjectModel(CycleOfTrainingPlans.name)
    private cycleOfTrainingPlansModel: mongoose.Model<TrainingPlanBlueprint>,
  ) {}

  async create(createTrainingPlanDto: CreateTrainingPlanDto) {
    const trainingPlan = new this.trainingPlanBlueprintModel(
      createTrainingPlanDto,
    );

    const newTrainingPlan = await trainingPlan.save();

    return newTrainingPlan;
  }
  async createPeriodizedModel(
    createPeriodizedTrainingCycleDto: CreatePeriodizedTrainingCycleDto,
  ) {
    const { trainingPlans, timesAWeek } = createPeriodizedTrainingCycleDto;
    console.log(`Created Training Plan: `, createPeriodizedTrainingCycleDto);
    console.log(`service log `, timesAWeek);

    // Ensure the property names match what's being sent from the frontend
    const newTrainingPlans = trainingPlans.map((trainingPlan) => ({
      ...trainingPlan,
      _id: new mongoose.Types.ObjectId(),
      mainExercises: trainingPlan.mainExercises.map((exercise) => ({
        // Corrected property name
        ...exercise,
        _id: new mongoose.Types.ObjectId(),
      })),
      accessoryExercises: trainingPlan.accessoryExercises.map((exercise) => ({
        // Corrected property name and typo
        ...exercise,
        _id: new mongoose.Types.ObjectId(),
      })),
    }));

    const newPeriodizedModel = await this.cycleOfTrainingPlansModel.create({
      _id: new mongoose.Types.ObjectId(),
      trainingPlans: newTrainingPlans,
      timesAWeek: timesAWeek,
    });

    return newPeriodizedModel;
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
