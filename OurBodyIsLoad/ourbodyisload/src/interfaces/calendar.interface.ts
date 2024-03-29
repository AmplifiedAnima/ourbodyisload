
export interface PreExistingClassesInterface {
  _id: string;
  id: string;
  name: string;
  description: string;
  videoUrl: string;
}

export interface UserChosenClassesInterface {
  _id: string;
  preExistingClassName: string;
  preExistingClassVideoUrl: string;
  userOwnerId: string;
  scheduleTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UpdateUserChosenClassInterface {
  scheduleTime: Date;
}

export interface UserActivityData {
  activityId: string;
  scheduleTime: Date;
}
export interface CalendarAppState {
  classes: PreExistingClassesInterface[];
  userChosenClasses: UserChosenClassesInterface[];
  status: string;
  error: string | null;
  postSuccess: boolean;
}
