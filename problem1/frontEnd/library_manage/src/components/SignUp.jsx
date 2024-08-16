import React, { useState } from "react";

// Define the available roles
const roles = ["CREATOR", "VIEWER", "VIEW_ALL"];

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    roles: roles[0],
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      alert(data.message);
      console.log("response from signup server", data);
    } catch (err) {
      console.log("error while posting SignUp info", err);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInput}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Password"
        />
        <br />
        <select name="roles" value={user.roles} onChange={handleInput}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
