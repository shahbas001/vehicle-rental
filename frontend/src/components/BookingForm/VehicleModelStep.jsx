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
import { getVehiclesByType } from "../../services/api";

const VehicleModelStep = ({ formik }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (formik.values.vehicleType) {
        setLoading(true);
        try {
          const data = await getVehiclesByType(formik.values.vehicleType);
          console.log(data, "data");
          setVehicles(data);
        } catch (error) {
          console.error("Failed to fetch vehicles:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchVehicles();
  }, [formik.values.vehicleType]);

  return (
    <Box className="text-black">
      <Typography variant="h6" gutterBottom>
        Specific Model
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <FormControl component="fieldset" className="mt-4">
          <FormLabel component="legend">Select vehicle model:</FormLabel>
          <RadioGroup
            aria-label="vehicleModel"
            name="vehicleModel"
            value={formik.values.vehicleModel}
            onChange={formik.handleChange}
          >
            {vehicles.map((vehicle) => (
              <FormControlLabel
                key={vehicle.id}
                value={vehicle.id.toString()}
                control={<Radio />}
                label={vehicle.name}
              />
            ))}
          </RadioGroup>
          {formik.touched.vehicleModel && formik.errors.vehicleModel && (
            <Typography color="error" variant="body2">
              {formik.errors.vehicleModel}
            </Typography>
          )}
        </FormControl>
      )}
    </Box>
  );
};

export default VehicleModelStep;
