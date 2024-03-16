import { TrainingDays } from "../../../../../interfaces/TrainingPlan.interface";
import { ExerciseBlueprintsInterface } from "../../../../../interfaces/Exercise.interface";

export interface TrainingPlanTemplateInterface {
  daysAWeek: string;
  selectedDay: string;
  trainingDays: TrainingDays;
  reps: string;
  sets: string;
  intensity: string;
  exerciseTypeModalOpen: boolean;
  isExerciseListVisible: boolean;
  selectedExercise: ExerciseBlueprintsInterface | null;
  periodization: string;
  searchingQuery: string;
}

export const ReducerForTemplateCreationInitialState = {
  daysAWeek: "2",
  selectedDay: "day1",
  trainingDays: {},
  reps: "",
  sets: "",
  intensity: "",
  exerciseTypeModalOpen: false,
  isExerciseListVisible: false,
  selectedExercise: null,
  periodization: "strength",
  searchingQuery: "",
};

export type TrainingPlanTemplateAction =
  | { type: "SET_DAYS_A_WEEK"; payload: string }
  | { type: "INCREMENT_DAYS_A_WEEK" }
  | { type: "DECREMENT_DAYS_A_WEEK" }
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SET_TRAINING_DAY"; payload: TrainingDays }
  | {
      type: "ADD_EXERCISE_TO_DAY";
      payload: {
        day: string;
        type: "main" | "accessory";
        exercise: ExerciseBlueprintsInterface;
      };
    }
  | { type: "ADD_REPS"; payload: string }
  | { type: "ADD_SETS"; payload: string }
  | { type: "SET_INTENSITY"; payload: string }
  | { type: "SET_EXERCISE_MODAL_OPEN"; payload: boolean }
  | { type: "SET_EXERCISE_LIST_VISIBLE"; payload: boolean }
  | {
      type: "SET_SELECTED_EXERCISE";
      payload: ExerciseBlueprintsInterface | null;
    }
  | { type: "SET_PERIODIZATION"; payload: string }
  | { type: "SET_SEARCHING_QUERY"; payload: string };

export const ReducerForCreatingPeriodizedTemplate = (
  state: TrainingPlanTemplateInterface,
  action: TrainingPlanTemplateAction
): TrainingPlanTemplateInterface => {
  switch (action.type) {
    case "SET_DAYS_A_WEEK":
      return { ...state, daysAWeek: action.payload };
    case "INCREMENT_DAYS_A_WEEK":
      return {
        ...state,
        daysAWeek:
          state.daysAWeek === "3"
            ? "3"
            : (parseInt(state.daysAWeek) + 1).toString(),
      };
    case "DECREMENT_DAYS_A_WEEK":
      return {
        ...state,
        daysAWeek:
          state.daysAWeek === "1"
            ? "1"
            : (parseInt(state.daysAWeek) - 1).toString(),
      };
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };
    case "SET_TRAINING_DAY":
      return { ...state, trainingDays: action.payload };
    case "SET_SELECTED_EXERCISE":
      return { ...state, selectedExercise: action.payload };
    case "ADD_REPS":
      return { ...state, reps: action.payload };
    case "ADD_SETS":
      return { ...state, sets: action.payload };
    case "SET_INTENSITY":
      return { ...state, intensity: action.payload };
    case "SET_EXERCISE_MODAL_OPEN":
      return { ...state, exerciseTypeModalOpen: action.payload };
    case "SET_EXERCISE_LIST_VISIBLE":
      return { ...state, isExerciseListVisible: action.payload };
    case "SET_PERIODIZATION":
      return { ...state, periodization: action.payload };
    case "SET_SEARCHING_QUERY":
      return { ...state, searchingQuery: action.payload };
    default:
      return state;
  }
};

// const [state, dispatch] = useReducer(reducer, initialArg, init?)

// const [daysAWeek, setDaysAWeek] = useState("2");
// const [selectedDay, setSelectedDay] = useState("day1");
// const [trainingDays, setTrainingDays] = useState<TrainingDays>({});
// const [reps, setReps] = useState("");
// const [sets, setSets] = useState("");
// const [intensity, setIntensity] = useState<string>("");
// const [exerciseTypeModalOpen, setExerciseTypeModalOpen] =
//   useState<boolean>(false);
// const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
// const [selectedExercise, setSelectedExercise] =
//   useState<ExerciseBlueprintsInterface | null>(null);
// const [periodization, setPeriodization] = useState<string>("strength");
// const [searchingQuery, setSearchingQuery] = useState("");
