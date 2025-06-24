require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utils/db");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api", require("./routes/authRoutes"));
app.get("/", (req, res) => res.send("Hello world!"));
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}!`));
