import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";

const WheelsStep = ({ formik }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom className="text-black">
        Number of wheels
      </Typography>
      <FormControl component="fieldset" className="mt-4">
        <FormLabel component="legend" className="text-black">Select number of wheels:</FormLabel>
        <div className="text-black">

        <RadioGroup
          row
          aria-label="wheels"
          name="wheels"
          value={formik.values.wheels}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
          <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
        </RadioGroup>
        </div>
        {formik.touched.wheels && formik.errors.wheels && (
          <Typography color="error" variant="body2">
            {formik.errors.wheels}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default WheelsStep;
