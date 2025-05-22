import React from "react";
import { Typography, Box, Alert, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const ConfirmationStep = ({ formik, bookingResult }) => {
  return (
    <Box className="text-black">
      {bookingResult ? (
        <>
          <Box className="flex items-center mb-4">
            <CheckCircle color="success" className="mr-2" />
            <Typography variant="h6">Booking Confirmed!</Typography>
          </Box>
          <Box className="space-y-2">
            <Typography>Booking ID: {bookingResult.booking.id}</Typography>
            <Typography>Vehicle: {bookingResult.booking.vehicle}</Typography>
            <Typography>Dates: {bookingResult.booking.dates}</Typography>
            <Typography>Customer: {bookingResult.booking.customer}</Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Review Your Booking
          </Typography>
          <Box className="space-y-2">
            <Typography>
              Name: {formik.values.firstName} {formik.values.lastName}
            </Typography>
            {/* <Typography>Wheels: {formik.values.wheels}</Typography> */}
            {/* <Typography>Vehicle Type: {formik.values.vehicleType}</Typography> */}
            <Typography>Vehicle Model: {formik.values.vehicleModel}</Typography>
            <Typography>
              Dates: {formik.values.startDate?.toLocaleDateString()} to{" "}
              {formik.values.endDate?.toLocaleDateString()}
            </Typography>
          </Box>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
            className="mt-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Confirm Booking"}
          </Button> */}
        </>
      )}
    </Box>
  );
};

export default ConfirmationStep;
