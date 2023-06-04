import { Box, Container } from "@mui/system";
import Trip from "./components/Trip";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";

import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const QueryBox = ({ handleQueryResult }) => {
  const theme = useTheme();

  const [comparisonA, setComparisonA] = useState("");
  const [comparisonB, setComparisonB] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered handle Submit");
    try {
      let res = await fetch(
        "https://request-confidence-intervals-ybmnqf5yga-uc.a.run.app",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" rowSpacing={1.5} maxWidth="lg">
          <Grid item>
            <Grid
              container
              direction="row"
              columnSpacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={5.6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="comparisonA" variant="outlined">
                    Comparison A
                  </InputLabel>
                  <Select
                    id="comparisonA"
                    value={comparisonA}
                    label="Comparison A"
                    onChange={(e) => setComparisonA(e.target.value)}
                  >
                    <MenuItem value={"Control"}>Control</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={0.8}>
                <Typography align="center">vs</Typography>
              </Grid>
              <Grid item xs={5.6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="comparisonB" variant="outlined">
                    Comparison B
                  </InputLabel>
                  <Select
                    id="comparisonB"
                    value={comparisonB}
                    label="Comparison B"
                    onChange={(e) => setComparisonB(e.target.value)}
                  >
                    <MenuItem value={"Control"}>Control</MenuItem>
                    <MenuItem value={"Test"}>Test</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <DateRangePicker
              label="Start Date"
              // onChange={(e) => setDates(e)}
            />
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
    </LocalizationProvider>
  );
};

export default QueryBox;
