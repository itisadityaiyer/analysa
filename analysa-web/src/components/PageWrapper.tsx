import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import MainPage from "./MainPage";
import NavBar from "./NavBar";

const PageWrapper = () => {
  return (
    <Grid container direction="row" columnSpacing={2} wrap="nowrap">
      <Grid item width="270px">
        <NavBar />
      </Grid>
      <Grid item sx={{ flexGrow: "1" }} marginRight="270px">
        <Container>
          <MainPage />
        </Container>
      </Grid>
    </Grid>
  );
};

export default PageWrapper;
