const { getSightings } = require("../utils");

class SightingsController {
  constructor() {}

  list = async (req, res) => {
    const sightings = await getSightings();
    res.json(sightings);
  };

  listByIndex = async (req, res) => {
    const sightings = await getSightings();
    const sightingIndex = req.params.sightingIndex;
    res.json(sightings[sightingIndex]);
  };

  listByFilter = async (req, res) => {
    const sightings = await getSightings();
    const filterParam = req.params.year;
    const key = "YEAR";
    const filteredSightingsList = sightings.filter(
      (item) => item[key] == filterParam
    );
    res.json(filteredSightingsList);
  };
}
module.exports = SightingsController;
