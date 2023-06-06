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
  Link,
} from "@mui/material";

import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const ReportDownload = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={5}>
        <Grid container direction="column" rowSpacing={1.5} padding={4}>
          <Grid item>
            <Typography variant="h5">AI Generated Analysis</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Have our AI Engine analyze your experiment and generate a report
              similar to one written by a seasoned data scientist.
            </Typography>
          </Grid>
          <Grid item>
            <Button href="Analysa-Report.pdf" variant="outlined" download>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default ReportDownload;
