import TasksListSection from "@/components/tasks-list";

function TasksDeleted() {
  return (
    <>
      <h1>Deleted</h1>
      <TasksListSection listType="deleted" />
    </>
  );
}

export default TasksDeleted;
