const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

app.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      res.redirect("celebrities/new-celebrity");
      //next(error);
    });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.render("error");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log("There was an error connecting to the database");
    console.log(error);
  });
