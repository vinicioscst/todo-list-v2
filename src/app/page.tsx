import CreateTaskForm from "@/components/create-task-form";
import Nav from "@/components/nav";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Nav />
      <Box component="main" width="100%" maxWidth="36.5rem" marginY="5rem">
        <CreateTaskForm />
      </Box>
    </>
  );
}
