"use client";

import theme from "@/styles/theme";
import { Box, Typography } from "@mui/material";
import CreateTaskForm from "./create-task-form";
import TasksListSection from "./tasks-list-section";

interface IPageSection {
  sectionName: string;
  listType: "to-do" | "done" | "deleted";
}

function PageSection({ listType, sectionName }: IPageSection) {
  return (
    <Box
      component="main"
      width="100%"
      maxWidth="36.5rem"
      marginTop="2.5rem"
      marginBottom="5rem"
      padding="2rem 1rem"
      borderRadius="10px"
      bgcolor={theme.palette.grey[900]}
    >
      <Typography
        variant="h4"
        align="center"
        color={theme.palette.secondary.light}
      >
        {sectionName}
      </Typography>
      {listType === "to-do" && <CreateTaskForm />}
      <TasksListSection listType={listType} />
    </Box>
  );
}

export default PageSection;
