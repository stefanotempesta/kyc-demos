const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/EnvConfig");
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.use("/api", routes);

app.get("/health", (req, res) =>
  res.status(200).send({ success: true, message: "Candy Api running" })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});


mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then((res) => {
    console.log("DB connected Successfully.");
    app.listen(process.env.PORT, () =>
      console.log(
        `Server Running Successfully on: http://localhost:${config.port}`
      )
    );
  })
  .catch((err) => console.log("failed to connect with db"));
