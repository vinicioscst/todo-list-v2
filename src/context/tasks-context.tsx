"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UUID, randomUUID } from "crypto";
import { createContext, useEffect, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";

interface ITasksContext {
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
}
interface ITasksProvider {
  children: React.ReactNode;
}

interface ITask {
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

type TCreateTask = z.infer<typeof handleTask>;

export const TasksContext = createContext({} as ITasksContext);

function TasksProvider({ children }: ITasksProvider) {
  const [tasksToDo, setTasksToDo] = useState<ITask[] | []>([]);
  const [tasksDone, setTasksDone] = useState<ITask[] | []>([]);
  const [tasksDeleted, setTasksDeleted] = useState<ITask[] | []>([]);

  useEffect(() => {
    const storedTasksToDo = JSON.parse(localStorage.getItem("TODOLIST@TASKSTODO") || "[]");
    const storedTasksDone = JSON.parse(localStorage.getItem("TODOLIST@TASKSDONE") || "[]");
    const storedTasksDeleted = JSON.parse(localStorage.getItem("TODOLIST@TASKSDELETED") || "[]");

    if (storedTasksToDo && storedTasksToDo !== "")
      setTasksToDo(storedTasksToDo);
    if (storedTasksDone && storedTasksDone !== "")
      setTasksDone(storedTasksDone);
    if (storedTasksDeleted && storedTasksDeleted !== "")
      setTasksDeleted(storedTasksDeleted);
  }, []);

  const { handleSubmit, register, reset } = useForm<TCreateTask>({
    resolver: zodResolver(handleTask),
  });

  function handleCreateTask(data: TCreateTask) {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      name: data.name,
      createdAt: new Date().toISOString(),
    };

    const newListToDo = [...tasksToDo, newTask]
    setTasksToDo(newListToDo);
    localStorage.setItem("TODOLIST@TASKSTODO", JSON.stringify(newListToDo));
    reset()
  }

  return (
    <TasksContext.Provider value={{ handleCreateTask, handleSubmit, register }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
