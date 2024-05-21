import { ITask } from "@/context/TasksContext/types";
import { Box, Card, Typography } from "@mui/material";
import { formatDistance } from "date-fns";

interface ITaskCard {
  task: ITask;
}

function TaskCard({ task }: ITaskCard) {
  return (
    <Card>
      <Box>
        <Typography>{task.name}</Typography>
        <Typography>
          {formatDistance(task.createdAt, new Date(), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </Typography>
      </Box>
      <Box></Box>
    </Card>
  );
}

export default TaskCard;
