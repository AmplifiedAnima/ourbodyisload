import { exerciseBlueprintsInterface } from "./exercise.interface";

export interface searchFunctionalityInterface {
  exercises: exerciseBlueprintsInterface[];
  posts: {};
  searchQuery: string;
  status: string;
  selectedOffer: exerciseBlueprintsInterface | null;
}
export interface blogPostInterface {
  _id: string;
  title: string;
}
