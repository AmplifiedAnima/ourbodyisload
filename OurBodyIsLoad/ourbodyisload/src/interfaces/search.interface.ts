import { ExerciseBlueprintsInterface } from "./Exercise.interface";

export interface SearchFunctionalityInterface {
  exercises: ExerciseBlueprintsInterface[];
  posts: {};
  searchQuery: string;
  status: string;
  selectedOffer: ExerciseBlueprintsInterface | null;
}
export interface BlogPostInterface {
  _id: string;
  title: string;
}
