const mongoose = require("mongoose");
const Celebrity = require("./celebrity");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;