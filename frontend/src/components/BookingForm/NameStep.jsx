import React from "react";
import { TextField, Box, Typography } from "@mui/material";

const NameStep = ({ formik }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
        What is your name?
      </Typography>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          InputLabelProps={{ style: { color: "black" } }} 
          InputProps={{ style: { color: "black" } }}  
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          InputLabelProps={{ style: { color: "black" } }}
          InputProps={{ style: { color: "black" } }}
        />
      </Box>
    </Box>
  );
};

export default NameStep;
