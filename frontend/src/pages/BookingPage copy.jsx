import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import ProgressStepper from "../components/ProgressStepper";
import NameStep from "../components/BookingForm/NameStep";
import WheelsStep from "../components/BookingForm/WheelsStep";
import VehicleTypeStep from "../components/BookingForm/VehicleTypeStep";
import VehicleModelStep from "../components/BookingForm/VehicleModelStep";
import DateStep from "../components/BookingForm/DateStep";
import ConfirmationStep from "../components/BookingForm/ConfirmationStep";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitBooking } from "../services/api";
import Header from "./Header";

const steps = [
  "Personal Information",
  "Wheels Selection",
  "Vehicle Type",
  "Vehicle Model",
  "Booking Dates",
  "Confirmation",
];


const BookingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [bookingResult, setBookingResult] = useState(null);

  // Separate onSubmit function
  const onSubmit = async (values, { setSubmitting }) => {
    console.log("Submitting with values:", values);
    try {
      const result = await submitBooking({
        firstName: values.firstName,
        lastName: values.lastName,
        vehicleTypeId: values.vehicleType,
        vehicleId: values.vehicleModel,
        startTime: values.startDate.toISOString(),
        endTime: values.endDate.toISOString(),
        customerContact: "email@example.com",
      });
      console.log("Booking result:", result);
      setBookingResult(result);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Connect onSubmit to Formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      wheels: "",
      vehicleType: "",
      vehicleModel: "",
      startDate: null,
      endDate: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      wheels: Yup.string().required("Please select number of wheels"),
      vehicleType: Yup.string().required("Please select vehicle type"),
      vehicleModel: Yup.string().required("Please select vehicle model"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("startDate"), "End date must be after start date"),
    }),
    onSubmit, // Connect the onSubmit function
  });

  const handleNext = () => {
    const currentStepValidation = () => {
      switch (activeStep) {
        case 0:
          return !formik.errors.firstName && !formik.errors.lastName;
        case 1:
          return !formik.errors.wheels;
        case 2:
          return !formik.errors.vehicleType;
        case 3:
          return !formik.errors.vehicleModel;
        case 4:
          return !formik.errors.startDate && !formik.errors.endDate;
        default:
          return true;
      }
    };

    if (currentStepValidation()) {
      setActiveStep(activeStep + 1);
    } else {
      formik.validateForm();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <NameStep formik={formik} />;
      case 1:
        return <WheelsStep formik={formik} />;
      case 2:
        return <VehicleTypeStep formik={formik} />;
      case 3:
        return <VehicleModelStep formik={formik} />;
      case 4:
        return <DateStep formik={formik} />;
      case 5:
        return (
          <ConfirmationStep formik={formik} bookingResult={bookingResult} />
        );
      default:
        return null;
    }
  };

  const commonStyle = `w-44 h-10 bg-black rounded-full tracking-[1.5px] 
  font-bold text-md flex items-center justify-center text-center 
  transition-transform duration-150 active:scale-95`;

  return (
    <div className="pt-44 text-white">
      <Container maxWidth="md" className="py-8">
        <Typography variant="h2" align="center" gutterBottom>
          Book A vehicle
        </Typography>
        <ProgressStepper activeStep={activeStep} steps={steps} />
        <Box className="mt-8 p-6 bg-white rounded-lg shadow-md">
          {getStepContent(activeStep)}
          <Box className="flex justify-between mt-6">
         
              <button 
                  disabled={activeStep === 0}
                  onClick={handleBack}
               className={commonStyle}
               style={{ boxShadow: `1px 1px 10px black}` }}
             >
               Back
             </button>
            {activeStep < steps.length - 1 ? (
                <button 
               onClick={handleNext}
                className={commonStyle}
                style={{ boxShadow: `1px 1px 10px black}` }}
              >
               {activeStep === steps.length - 2 ? "Review Booking" : "Next"}
              </button>

            ) : (
            
               <button 
              onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
               className={commonStyle}
               style={{ boxShadow: `1px 1px 10px black}` }}
             >
               Confirm
             </button>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default BookingPage;
