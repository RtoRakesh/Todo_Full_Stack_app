import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        background: "lightgray",
        padding: "10px",
        gap: "10px",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/login">LogIn</Link>
      <Link to="/signup">SignUp</Link>
      <Link to="/todos">Todos</Link>
    </div>
  );
}

export default Navbar;
