import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getVehicleTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicle-types`);
  return response.data;
};

export const getVehiclesByType = async (typeId) => {
  const response = await axios.get(
    `${API_BASE_URL}/vehicles/by-type/${typeId}`,
  );
  return response.data;
};

export const checkVehicleAvailability = async (vehicleId, start, end) => {
  const response = await axios.get(
    `${API_BASE_URL}/vehicles/${vehicleId}/availability`,
    {
      params: { start, end },
    },
  );
  return response.data;
};

export const submitBooking = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, data);
    return response.data;
  } catch (error) {
    console.error("Booking submission failed:", error);
    throw error;
  }
};
