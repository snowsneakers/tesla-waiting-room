const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const DBconnect = require("./config/db");

DBconnect();

const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/entries", require("./routes/entryRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.listen(PORT, console.log("server running!"));
