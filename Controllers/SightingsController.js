const { Sequelize } = require("sequelize");
const { getSightings } = require("../utils");
const Op = Sequelize.Op;

class SightingsController {
  constructor(model, comments) {
    this.model = model;
    this.comments = comments;
  }

  list = async (req, res) => {
    try {
      const sightings = await this.model.findAll();
      res.json(sightings);
    } catch (e) {
      console.log(e);
    }
  };

  listByIndex = async (req, res) => {
    try {
      const { sightingIndex } = req.params;
      const sightings = await this.model.findByPk(sightingIndex);
      res.json(sightings);
    } catch (e) {
      console.log(e);
    }
  };

  listByFilter = async (req, res) => {
    try {
      const filterDate = Number(req.params.year);
      const startDate = Date.parse(filterDate);
      const endDate = Date.parse(filterDate + 1);
      const condition = {
        where: { date: { [Op.between]: [startDate, endDate] } },
      };
      const sightings = await this.model.findAll(condition);
      // const filteredSightingsList = sightings.filter(
      //   (item) => item[key] == filterParam
      // );
      res.json(sightings);
    } catch (e) {
      console.log(e);
    }
  };

  postNewSighting = async (req, res) => {
    try {
      const { date, location, notes } = req.body;
      const sightings = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });

      const newSightings = await this.model.findAll();
      res.json(newSightings);
    } catch (e) {
      console.log(e);
    }
  };

  removeSighting = async (req, res) => {
    try {
      const { sightingIndex } = req.params;
      const condition = { where: { id: sightingIndex } };
      const deleteSighting = await this.model.destroy(condition);

      const newSightings = await this.model.findAll();
      res.json(newSightings);
    } catch (e) {
      console.log(e);
    }
  };

  retrieveComment = async (req, res) => {
    try {
      const { sightingIndex } = req.params;
      const condition = { where: { sightingId: sightingIndex } };

      const allComments = await this.comments.findAll(condition);
      res.json(allComments);
    } catch (e) {
      console.log(e);
    }
  };

  postComment = async (req, res) => {
    try {
      const { sightingIndex } = req.params;
      const { content } = req.body;

      const postComment = await this.comments.create({
        content: content,
        sightingId: sightingIndex,
      });
      res.json(postComment);
    } catch (e) {
      console.log(e);
    }
  };

  retrieveEditComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const commentForEdit = await this.comments.findByPk(commentId);
      res.json(commentForEdit);
    } catch (e) {
      console.log(e);
    }
  };

  editComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const editedComment = await this.comments.update(
        { content: content },
        {
          where: { id: commentId },
        }
      );
      const newCommentList = await this.comments.findAll();
      res.json(newCommentList);
    } catch (e) {
      console.log(e);
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const editedComment = await this.comments.destroy({
        where: { id: commentId },
      });
      const newCommentList = await this.comments.findAll();
      res.json(newCommentList);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = SightingsController;
