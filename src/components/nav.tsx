import { Box, Button } from "@mui/material";
import Link from "next/link";

function Nav() {
  return (
    <Box component="nav" marginY="5rem">
      <Link href={"/"}>
        <Button color="secondary">To-Do</Button>
      </Link>
      <Link href={"/tasks/done"}>
        <Button color="secondary">Done</Button>
      </Link>
      <Link href={"/tasks/deleted"}>
        <Button color="secondary">Deleted</Button>
      </Link>
    </Box>
  );
}

export default Nav;
