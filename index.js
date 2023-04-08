const cors = require("cors");
const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = require("./db/models/index");
const { sightings } = db;

const SightingsController = require("./Controllers/SightingsController");
const SightingsRouter = require("./Routers/SightingsRouter");

const sightingsController = new SightingsController(sightings);
const sightingsRouter = new SightingsRouter(express, sightingsController);

app.use("/sightings", sightingsRouter.route());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
