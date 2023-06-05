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
import { blue } from "@mui/material/colors";

const ExperimentInfo = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Paper elevation={5}>
      <Grid container direction="row" xs={12} padding={4}>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            rowSpacing={1.5}
            columnSpacing={1.5}
          >
            <Grid item>
              <Typography variant="h5">
                Experiment: Full Screen by Default
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="grey">
                gated by: full_screen_default
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="grey">CREATED BY:</Typography>
                </Grid>
                <Grid item>
                  <Typography>Aditya Iyer</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container direction="column">
                <Grid item>
                  <Typography color="grey">ID TYPE:</Typography>
                </Grid>
                <Grid item>
                  <Typography>user_id</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item xs={3}>
                  <Typography color="grey">TAGS:</Typography>
                </Grid>
                <Grid item>
                  <Typography>Player Tab</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </LocalizationProvider>
);

export default ExperimentInfo;
