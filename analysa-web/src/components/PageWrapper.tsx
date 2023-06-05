import { Container, Grid, Paper } from "@mui/material";
import MainPage from "./MainPage";
import NavBar from "./Navbar";

const PageWrapper = () => {
  return (
    <Grid container direction="row" columnSpacing={2}>
      <Grid item width={270}>
        <NavBar />
      </Grid>
      <Grid item sx={{ flexGrow: "1" }}>
        <Container>
          <MainPage />
        </Container>
      </Grid>
      <Grid item width={270}></Grid>
    </Grid>
  );
};

export default PageWrapper;
