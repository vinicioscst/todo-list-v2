import CreateTaskForm from "@/components/create-task-form";
import Nav from "@/components/nav";
import TasksListSection from "@/components/tasks-list";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" width="100%" maxWidth="36.5rem" marginY="5rem">
      <CreateTaskForm />
      <TasksListSection listType="to-do" />
    </Box>
  );
}
