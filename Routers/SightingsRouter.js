class SightingsRouter {
  constructor(express, sightingsController) {
    this.controller = sightingsController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.list);
    router.get("/:sightingIndex", this.controller.listByIndex);
    router.get("/filter/:year", this.controller.listByFilter);
    return router;
  };
}
module.exports = SightingsRouter;
