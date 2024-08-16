// src/components/AddTodoForm.js
import React, { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newTodo = {
      title,
      completed,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/todos",
        newTodo,
        config
      );
      onAdd(res.data);
      setTitle("");
      setCompleted(false);
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
