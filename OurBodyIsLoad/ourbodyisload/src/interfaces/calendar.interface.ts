
export interface preExistingClassesInterface {
  _id: string;
  id: string;
  name: string;
  description: string;
  videoUrl: string;
}

export interface userChosenClassesInterface {
  _id: string;
  preExistingClassName: string;
  preExistingClassVideoUrl: string;
  userOwnerId: string;
  scheduleTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface updateUserChosenClassInterface {
  scheduleTime: Date;
}

export interface userActivityData {
  activityId: string;
  scheduleTime: Date;
}
export interface calendarAppState {
  classes: preExistingClassesInterface[];
  userChosenClasses: userChosenClassesInterface[];
  status: string;
  error: string | null;
  postSuccess: boolean;
}
