import { Box, Container } from "@mui/system";
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

const Header = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Paper elevation={5}>
      <Grid
        container
        direction="column"
        // rowSpacing={1.5}
        columnSpacing={1.5}
        padding={4}
      >
        <Grid item>
          <Typography variant="h2">Analysa: Experiment Review</Typography>
        </Grid>
      </Grid>
    </Paper>
  </LocalizationProvider>
);

export default Header;
