import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateStep = ({ formik }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <Box className="text-black">
      <Typography variant="h6" gutterBottom>
        Booking Dates
      </Typography>
      <Box className="mt-4">
        <Typography gutterBottom>Select booking date range:</Typography>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
            formik.setFieldValue("startDate", update[0]);
            formik.setFieldValue("endDate", update[1]);
          }}
          minDate={new Date()}
          className="border p-2 rounded"
          isClearable={true}
        />
        <Box className="mt-2">
          {formik.touched.startDate && formik.errors.startDate && (
            <Typography color="error" variant="body2">
              {formik.errors.startDate}
            </Typography>
          )}
          {formik.touched.endDate && formik.errors.endDate && (
            <Typography color="error" variant="body2">
              {formik.errors.endDate}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DateStep;
