import { Box, Grid, Paper, Typography } from "@mui/material";
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
      "",
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
    <Paper elevation={5} style={{ width: "100%" }}>
      {/* <Box height={12}></Box> */}
      <Grid container direction="column" rowSpacing={1.5} padding={4}>
        <Grid item>
          <Typography variant="h5">Confidence Intervals</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            See how your metrics compare against baselines and identify
            statistically significant deviations from the control and baseline
            groups.
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            <Grid item xs={4}>
              <Grid
                container
                direction="column"
                height="100%"
                justifyContent="space-evenly"
              >
                <Grid item></Grid>
                <Grid item></Grid>
                {[...queryResultObject.keys()].map((key) => (
                  <Grid item>
                    <Typography fontSize={15}>{key}</Typography>
                  </Grid>
                ))}
                <Grid item></Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Chart
                chartType="CandlestickChart"
                width="100%"
                height={500}
                data={data}
                options={options}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QueryPlot;
