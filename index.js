const cors = require("cors");
const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

const SightingsController = require("./Controllers/SightingsController");
const SightingsRouter = require("./Routers/SightingsRouter");

const sightingsController = new SightingsController();
const sightingsRouter = new SightingsRouter(express, sightingsController);

app.use("/sightings", sightingsRouter.route());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
