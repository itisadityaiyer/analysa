import { Grid, Typography } from "@mui/material";
import ExperimentInfo from "./ExperimentInfo";
import QueryBox from "./QueryBox";
import { useState } from "react";

const MainPage = () => {
  const [queryResult, setQueryResult] = useState("");

  const handleQueryResult = (resJson: JSON) => {
    let resString = JSON.stringify(resJson);
    console.log(resString);
    setQueryResult(resString);
  };

  return (
    <Grid container direction="column" rowSpacing={1} width="md">
      <Grid item height={"8em"} />
      <Grid item>
        <Typography variant="h1">Analysa</Typography>
      </Grid>
      <Grid item height={"2em"} />
      <Grid item>
        <Typography variant="h4">take control of your experiments!</Typography>
      </Grid>
      <Grid item height={"2em"} />
      <Grid item>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={6}>
            <ExperimentInfo />
          </Grid>
          <Grid item xs={6}>
            <QueryBox handleQueryResult={handleQueryResult} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography className="queryResult">
            {queryResult ? queryResult : ""}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
