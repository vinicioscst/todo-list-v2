import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export interface ITasksContext {
  handleCreateTask: (data: TCreateTask) => void;
  handleSubmit: UseFormHandleSubmit<
    {
      name: string;
    },
    undefined
  >;
  register: UseFormRegister<{
    name: string;
  }>;
  errors: FieldErrors<{
    name: string;
  }>;
  handleSubmitEdit: UseFormHandleSubmit<
    {
      name: string;
    },
    undefined
  >;
  registerEdit: UseFormRegister<{
    name: string;
  }>;
  errorsEdit: FieldErrors<{
    name: string;
  }>;
  tasksToDo: [] | ITask[];
  tasksDone: [] | ITask[];
  tasksDeleted: [] | ITask[];
  handleTaskDone(task: ITask): void;
  handleEditTask(data: TCreateTask, taskId: string): void;
  handleDeleteTask(taskId: string): void;
  setTasksToDo: React.Dispatch<React.SetStateAction<[] | ITask[]>>;
  setTasksDone: React.Dispatch<React.SetStateAction<[] | ITask[]>>;
  setTasksDeleted: React.Dispatch<React.SetStateAction<[] | ITask[]>>;
}

export interface ITasksProvider {
  children: React.ReactNode;
}

export interface ITask {
  id: string;
  name: string;
  createdAt: string;
}

export const handleTask = z.object({
  name: z
    .string()
    .min(3, { message: "Your task must have at least 3 characters" })
    .max(50, { message: "Your task cannot exceed 50 characters" }),
});

export type TCreateTask = z.infer<typeof handleTask>;
