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
    const { trainingPlans, timesAWeek, periodization } =
      createPeriodizedTrainingCycleDto;
    console.log(`Created Training Plan: `, createPeriodizedTrainingCycleDto);
    console.log(`times a week`, timesAWeek);
    console.log(`periodization`, periodization);

    const newTrainingPlans = trainingPlans.map((trainingPlan) => ({
      ...trainingPlan,
      _id: new mongoose.Types.ObjectId(),
      mainExercises: trainingPlan.mainExercises.map((exercise) => ({
        ...exercise,
        _id: new mongoose.Types.ObjectId(),
      })),
      accessoryExercises: trainingPlan.accessoryExercises.map((exercise) => ({
        ...exercise,
        _id: new mongoose.Types.ObjectId(),
      })),
    }));

    const newPeriodizedModel = await this.cycleOfTrainingPlansModel.create({
      _id: new mongoose.Types.ObjectId(),
      periodization: periodization,
      trainingPlans: this.periodizeModel(
        newTrainingPlans,
        periodization,
        timesAWeek,
      ),
      timesAWeek: timesAWeek,
    });

    return newPeriodizedModel;
  }
  public periodizeModel(
    newTrainingPlans: TrainingPlanBlueprint[],
    periodization: string,
    timesAWeek: string,
  ) {
    // Iterate over each training plan and then each exercise to log their details
    newTrainingPlans.forEach((trainingPlan) => {
      console.log(`Day: ${trainingPlan.day}`);

      const mainExercisesLog = trainingPlan.mainExercises
        .map(
          (exercise) =>
            `name: ${exercise.name}, sets: ${exercise.sets}, reps: ${exercise.reps} ,
          `,
        )
        .join('; ');

      console.log(`Main Exercises: ${mainExercisesLog}`);

      const accessoryExercisesLog = trainingPlan.accessoryExercises
        .map(
          (exercise) =>
            `name: ${exercise.name}, sets: ${exercise.sets}, reps: ${exercise.reps}`,
        )
        .join('; ');

      console.log(`Accessory Exercises: ${accessoryExercisesLog}`);
    });

    console.log(`Periodization: ${periodization}`);
    console.log(`Times a Week: ${timesAWeek}`);

    return newTrainingPlans;
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
