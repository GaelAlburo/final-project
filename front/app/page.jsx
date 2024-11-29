"use client";
import { Container, Typography, useTheme } from "@mui/material";


export default function Home() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{border: "1px solid red"}}>
      <Typography variant="h1">
        How are you
      </Typography>
    </Container>
  );
}
