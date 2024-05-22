"use client";
import { Box, Button } from "@mui/material";
import NotesTwoToneIcon from "@mui/icons-material/NotesTwoTone";
import Link from "next/link";
import theme from "@/styles/theme";

function Nav() {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        maxWidth: "36.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "5rem",
        marginBottom: "2.5rem",
      }}
    >
      <NotesTwoToneIcon
        sx={{
          fontSize: 40,
          bgcolor: theme.palette.secondary.main,
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      />
      <Box>
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
    </Box>
  );
}

export default Nav;
