const express = require("express");
const connectToDB = require("./src/config/mongoose");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const auth = require("./src/middlewares/auth");
const todoRoute = require("./src/routes/todoRoutes");

require("dotenv").config();

const port = process.env.PORT || 8080;
const db_url = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("this is home route");
});

app.use("/user", userRoutes);
app.use("/todos", auth, todoRoute);

app.listen(port, async () => {
  try {
    await connectToDB(db_url);
    console.log("server conntected to database sucessfull");
    console.log(`server is running on http://localhost:${port}`);
  } catch (err) {
    console.log("error", err);
  }
});
