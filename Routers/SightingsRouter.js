class SightingsRouter {
  constructor(express, sightingsController) {
    this.controller = sightingsController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.list);
    router.post("/", this.controller.postNewSighting);

    router.get("/:sightingIndex", this.controller.listByIndex);
    router.delete("/:sightingIndex", this.controller.removeSighting);
    router.get("/filter/:year", this.controller.listByFilter);

    router.get("/:sightingIndex/comments", this.controller.retrieveComment);
    router.post("/:sightingIndex/comments", this.controller.postComment);
    router.get(
      "/:sightingIndex/comments/:commentId",
      this.controller.retrieveEditComment
    );
    router.put(
      "/:sightingIndex/comments/:commentId",
      this.controller.editComment
    );
    router.delete(
      "/:sightingIndex/comments/:commentId",
      this.controller.deleteComment
    );

    return router;
  };
}
module.exports = SightingsRouter;
