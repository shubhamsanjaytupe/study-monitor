export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export enum TaskCategory {
  WRITING = 'Writing Work',
  LEARNING = 'Learning',
}

export interface Subject {
  id: string;
  name: string;
  tasks: {
    [TaskCategory.WRITING]: Task[];
    [TaskCategory.LEARNING]: Task[];
  };
}

export interface TodayTask extends Task {
  subjectId: string;
  subjectName: string;
  category: TaskCategory;
}
