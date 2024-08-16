import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // This line parses the response into a JavaScript object
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      alert(data.message);
      console.log("responce from server", data.accessToken);
    } catch (err) {
      console.log("error while posting login info", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInput}
        />
        <br />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
