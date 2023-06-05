import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import Chart from "react-google-charts";

const lower_bound = "lower_bound";
const upper_bound = "upper_bound";

const QueryPlot = ({ queryResultJson }) => {
  let data = [["Metric", "", "", "", '"']];
  let queryResultObject = new Map(Object.entries(queryResultJson));
  for (var metric in queryResultJson) {
    queryResultObject.set(
      metric,
      new Map(Object.entries(queryResultObject.get(metric)))
    );
    data.push([
      metric,
      queryResultObject.get(metric).get(lower_bound),
      queryResultObject.get(metric).get(lower_bound),
      queryResultObject.get(metric).get(upper_bound),
      queryResultObject.get(metric).get(upper_bound),
    ]);
  }
  const options = {
    legend: "none",
    fontName: "BlinkMacSystemFont",
    orientation: "vertical",
    vAxis: {
      textPosition: "in",
    },
  };

  const height = (queryResultObject.size * 100).toString();

  console.log("starting plot working");
  return (
    <Paper elevation={5} style={{ width: "100%" }} sx={{ padding: 4 }}>
      {/* <Grid container direction="row">
        <Grid item xs={2}>
          <Grid
            container
            direction="column"
            height="100%"
            justifyContent="space-evenly"
          >
            <Grid item></Grid>
            {[...queryResultObject.keys()].map((key) => (
              <Grid item>
                <Typography>{key}</Typography>
              </Grid>
            ))}
            <Grid item></Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}> */}
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height={500}
        data={data}
        options={options}
      />
      {/* </Grid>
      </Grid> */}
    </Paper>
  );
};

export default QueryPlot;
