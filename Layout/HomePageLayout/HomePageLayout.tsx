import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface HomePageLayoutProps {
  leftSide: ReactNode;
  rightSide: ReactNode;
}

export default function HomePageLayout({
  leftSide,
  rightSide,
}: HomePageLayoutProps) {
  return (
    <Grid p={3} pt={5} container spacing={2}>
      <Grid item xs={5}>
        {leftSide}
      </Grid>
      <Grid item xs={7}>
        {rightSide}
      </Grid>
    </Grid>
  );
}
