import { Grid, Typography } from "@mui/material";
import ExperimentInfo from "./ExperimentInfo";
import QueryBox from "./QueryBox";
import { useState } from "react";
import QueryPlot from "./QueryPlot";

const MainPage = () => {
  const [queryResult, setQueryResult] = useState("");
  const [queryResultString, setQueryResultString] = useState("");

  const handleQueryResult = (resJson: JSON) => {
    let resString = JSON.stringify(resJson);
    console.log(resString);
    console.log("adityaiyer: in handleQueryResult");
    console.log(new Map(Object.entries(resJson)));
    setQueryResult(resJson);
    setQueryResultString(resString);
  };

  return (
    <Grid container direction="column" rowSpacing={1}>
      <Grid item height={"8em"} />
      <Grid item>
        <ExperimentInfo />
      </Grid>
      <Grid item>
        <Grid container direction="row" columnSpacing={2}>
          <Grid item xs={4}>
            <QueryBox handleQueryResult={handleQueryResult} />
          </Grid>
          <Grid item xs={8}>
            {queryResult ? <QueryPlot queryResultJson={queryResult} /> : ""}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
