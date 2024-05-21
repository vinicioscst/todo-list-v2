"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ITask,
  ITasksContext,
  ITasksProvider,
  TCreateTask,
  handleTask,
} from "./types";
import { ToastContext } from "../ToastContext/toast.context";

export const TasksContext = createContext({} as ITasksContext);

function TasksProvider({ children }: ITasksProvider) {
  const [tasksToDo, setTasksToDo] = useState<ITask[] | []>([]);
  const [tasksDone, setTasksDone] = useState<ITask[] | []>([]);
  const [tasksDeleted, setTasksDeleted] = useState<ITask[] | []>([]);

  const { handleToast } = useContext(ToastContext);

  useEffect(() => {
    const storedTasksToDo = JSON.parse(
      localStorage.getItem("TODOLIST@TASKSTODO") || "[]"
    );
    const storedTasksDone = JSON.parse(
      localStorage.getItem("TODOLIST@TASKSDONE") || "[]"
    );
    const storedTasksDeleted = JSON.parse(
      localStorage.getItem("TODOLIST@TASKSDELETED") || "[]"
    );

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

    const newListToDo = [...tasksToDo, newTask];
    setTasksToDo(newListToDo);
    localStorage.setItem("TODOLIST@TASKSTODO", JSON.stringify(newListToDo));
    handleToast({
      message: "New task created",
      severity: "success",
      variant: "filled",
    });
    reset();
  }

  return (
    <TasksContext.Provider
      value={{
        handleCreateTask,
        handleSubmit,
        register,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
