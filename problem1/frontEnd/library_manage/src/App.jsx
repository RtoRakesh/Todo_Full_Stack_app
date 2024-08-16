import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </>
  );
}

export default App;
