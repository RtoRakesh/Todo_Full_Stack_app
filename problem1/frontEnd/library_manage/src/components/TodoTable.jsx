import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodoForm from "./AddTodo";

const TodoTable = () => {
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTodos = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const res = await axios.get("http://localhost:8080/todos", config);

        if (Array.isArray(res.data)) {
          setTodos(res.data);
        } else {
          console.error("API response is not an array:", res.data);
          setTodos([]);
        }
      } catch (error) {
        console.log("Something went wrong in getting data!", error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.delete(`http://localhost:8080/todos/${id}`, config);
        setTodos(todos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.log("Error deleting todo:", error);
      }
    }
  };

  const toggleCompletion = async (id, completed) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.patch(
        `http://localhost:8080/todos/${id}`,
        { completed: !completed },
        config
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.log("Error updating todo status:", error);
    }
  };

  const renderActions = (todo) => {
    return (
      <td>
        <button onClick={() => toggleCompletion(todo._id, todo.completed)}>
          {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
        </button>
        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      </td>
    );
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTodoForm onAdd={addTodo} />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Completed" : "Incomplete"}</td>
              {renderActions(todo)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
