import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { getVehicleTypes } from "../../services/api";

const VehicleTypeStep = ({ formik }) => {
  const [types, setTypes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const data = await getVehicleTypes();
        setTypes(data);
      } catch (error) {
        console.error("Failed to fetch vehicle types:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const filteredTypes = formik.values.wheels
    ? types[formik.values.wheels] || []
    : [];

  return (
    <Box className="text-black">
      <Typography variant="h6" gutterBottom className="text-black">
        Type of vehicle
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <FormControl component="fieldset" className="mt-4">
          <FormLabel component="legend">Select vehicle type:</FormLabel>
          <RadioGroup
            aria-label="vehicleType"
            name="vehicleType"
            value={formik.values.vehicleType}
            onChange={formik.handleChange}
          >
            {filteredTypes.map((type) => (
              <FormControlLabel
                key={type.id}
                value={type.id.toString()}
                control={<Radio />}
                label={`${type.name} (${type.category})`}
              />
            ))}
          </RadioGroup>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <Typography color="error" variant="body2">
              {formik.errors.vehicleType}
            </Typography>
          )}
        </FormControl>
      )}
    </Box>
  );
};

export default VehicleTypeStep;
