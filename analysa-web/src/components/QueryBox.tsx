import { useTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const QueryBox = ({ handleQueryResult }) => {
  const queryUrl =
    "https://request-confidence-intervals-ybmnqf5yga-uc.a.run.app";

  const theme = useTheme();

  const [comparisonA, setComparisonA] = useState("control");
  const [comparisonB, setComparisonB] = useState("test");
  const [queryDateRange, setQueryDateRange] = useState<DateRange<Dayjs>>([
    dayjs("2023-05-15"),
    dayjs("2023-05-24"),
  ]);
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered handle Submit");
    let queryArgsPairs = [
      ["comparisonA", comparisonA],
      ["comparisonB", comparisonB],
      ["startDate", queryDateRange[0].format("YYYY-MM-DD")],
      ["endDate", queryDateRange[1].format("YYYY-MM-DD")],
    ];
    let queryArgsPairsMapped = queryArgsPairs.map((x) => x.join("="));
    let queryArgsString = queryArgsPairsMapped.join("&");
    console.log(queryUrl + "?" + queryArgsString);

    try {
      let res = await fetch(queryUrl + "?" + queryArgsString, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("call returned");
      let resJson = await res.json();
      let resString = JSON.stringify(resJson);
      if (res.status === 200) {
        console.log("call success");
        console.log(resString);
        handleQueryResult(resJson);
      } else {
        console.log("call failure");
        setMessage("Submitted, error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box height={12}></Box>
      <Paper elevation={5}>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" rowSpacing={1.5} padding={1.5}>
            <Grid item>
              <Grid
                container
                direction="row"
                columnSpacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={5.6}>
                  <FormControl required={true} fullWidth>
                    <InputLabel htmlFor="comparisonA" variant="outlined">
                      Comparison A
                    </InputLabel>
                    <Select
                      id="comparisonA"
                      value={comparisonA}
                      label="Comparison A"
                      defaultValue={"control"}
                      onChange={(e) => setComparisonA(e.target.value)}
                    >
                      <MenuItem value={"control"}>control</MenuItem>
                      <MenuItem value={"test"}>test</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={0.8}>
                  <Typography align="center">vs</Typography>
                </Grid>
                <Grid item xs={5.6}>
                  <FormControl required={true} fullWidth>
                    <InputLabel htmlFor="comparisonB" variant="outlined">
                      Comparison B
                    </InputLabel>
                    <Select
                      id="comparisonB"
                      value={comparisonB}
                      label="Comparison B"
                      onChange={(e) => setComparisonB(e.target.value)}
                    >
                      <MenuItem value={"control"}>control</MenuItem>
                      <MenuItem value={"test"}>test</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl required={true} fullWidth>
                <DateRangePicker
                  label="Start Date"
                  value={queryDateRange}
                  minDate={dayjs("2023-05-15")}
                  maxDate={dayjs("2023-05-24")}
                  onChange={(newValue) => setQueryDateRange(newValue)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="outlined">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Typography className="message">
                {message ? message : ""}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default QueryBox;
