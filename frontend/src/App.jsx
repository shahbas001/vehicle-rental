import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BookingPage from "./pages/BookingPage";
import Header from "./pages/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <div className="bg-gray-400 min-h-screen">
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <BookingPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
