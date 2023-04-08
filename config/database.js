require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: "postgres",
  },
};
