import { exerciseInterface } from "./calendar.interface";

export interface searchFunctionalityInterface {
  exercises: exerciseInterface[];
  posts: {};
  searchQuery: string;
  status: string;
  selectedOffer: exerciseInterface | null;
}
export interface BlogPostInterface {
  _id: string;
  title: string;
}
