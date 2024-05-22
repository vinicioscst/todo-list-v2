import TasksListSection from "@/components/tasks-list-section";

function TasksDeleted() {
  return (
    <>
      <h1>Deleted</h1>
      <TasksListSection listType="deleted" />
    </>
  );
}

export default TasksDeleted;
