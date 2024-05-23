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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TCreateTask>({
    resolver: zodResolver(handleTask),
  });

  const {
    handleSubmit: handleSubmitEdit,
    register: registerEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<TCreateTask>({
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

  function handleTaskDone(task: ITask) {
    const listWithoutTask: ITask[] = tasksToDo.filter(
      (prevTask) => prevTask.id !== task.id
    );
    setTasksToDo(listWithoutTask);
    localStorage.setItem("TODOLIST@TASKSTODO", JSON.stringify(listWithoutTask));

    const newListDone = [...tasksDone, task];
    setTasksDone(newListDone);
    localStorage.setItem("TODOLIST@TASKSDONE", JSON.stringify(newListDone));

    handleToast({
      message: "Task marked as done",
      severity: "success",
      variant: "filled",
    });

    reset();
  }

  function handleEditTask(data: TCreateTask, taskId: string) {
    const listWithEditedTask: ITask[] = tasksToDo.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: data.name };
      }
      return task;
    });
    setTasksToDo(listWithEditedTask);

    localStorage.setItem(
      "TODOLIST@TASKSTODO",
      JSON.stringify(listWithEditedTask)
    );

    handleToast({
      message: "Task edited with success",
      severity: "success",
      variant: "filled",
    });

    resetEdit();
  }

  function handleDeleteTask(taskId: string) {
    const deletedTask: ITask[] = tasksToDo.filter((task) => task.id === taskId);
    const newListDeleted = [...tasksDeleted, deletedTask[0]];
    setTasksDeleted(newListDeleted);
    localStorage.setItem(
      "TODOLIST@TASKSDELETED",
      JSON.stringify(newListDeleted)
    );

    const listWithoutTask: ITask[] = tasksToDo.filter(
      (task) => task.id !== taskId
    );
    setTasksToDo(listWithoutTask);
    localStorage.setItem("TODOLIST@TASKSTODO", JSON.stringify(listWithoutTask));

    handleToast({
      message: "Task deleted with success",
      severity: "success",
      variant: "filled",
    });
  }

  return (
    <TasksContext.Provider
      value={{
        handleCreateTask,
        handleSubmit,
        handleSubmitEdit,
        register,
        registerEdit,
        errors,
        errorsEdit,
        tasksToDo,
        tasksDone,
        tasksDeleted,
        handleTaskDone,
        handleEditTask,
        handleDeleteTask,
        setTasksToDo,
        setTasksDone,
        setTasksDeleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
