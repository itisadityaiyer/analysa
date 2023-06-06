import { Grid, Typography } from "@mui/material";
import ExperimentInfo from "./ExperimentInfo";
import QueryBox from "./QueryBox";
import { useEffect, useRef, useState } from "react";
import QueryPlot from "./QueryPlot";
import ReportDownload from "./ReportDownload";
import Header from "./Header";

const MainPage = () => {
  const [queryResultString, setQueryResultString] = useState("");

  const handleQueryResult = (resJson: JSON) => {
    let resString = JSON.stringify(resJson);
    console.log(resString);
    console.log("adityaiyer: in handleQueryResult");
    console.log(new Map(Object.entries(resJson)));
    setQueryResultString(resString);
  };

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item height={"8em"} />
      <Grid item>
        <Header />
      </Grid>
      <Grid item></Grid>
      <Grid item>
        <ExperimentInfo />
      </Grid>
      <Grid item>
        <Grid container direction="row" columnSpacing={4}>
          <Grid item lg={5} xl={4}>
            <Grid container direction="column" rowSpacing={6}>
              <Grid item>
                <QueryBox handleQueryResult={handleQueryResult} />
              </Grid>
              <Grid item>
                <ReportDownload />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={7} xl={8}>
            {queryResultString ? (
              <QueryPlot queryResultJsonString={queryResultString} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item height={"8em"} />
    </Grid>
  );
};

export default MainPage;
