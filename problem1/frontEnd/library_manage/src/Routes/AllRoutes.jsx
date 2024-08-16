import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUp from "../components/SignUp";

import Login from "../components/Login";

import Home from "../components/Home";
import TodoTable from "../components/TodoTable";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todos" element={<TodoTable />} />
    </Routes>
  );
};

export default AllRoutes;
