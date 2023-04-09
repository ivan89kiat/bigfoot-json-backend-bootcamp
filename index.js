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
const { sighting, comment } = db;

const SightingsController = require("./Controllers/SightingsController");
const SightingsRouter = require("./Routers/SightingsRouter");

const sightingsController = new SightingsController(sighting, comment);
const sightingsRouter = new SightingsRouter(express, sightingsController);

app.use("/sightings", sightingsRouter.route());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
