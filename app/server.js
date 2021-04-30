const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/src/views"));
app.use(express.static(path.join(__dirname + "/src/public")));
app.use(cors());

app.get(["/", "/index", "/index.html"], (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/api/weather", async (req, res) => {
  if (req.query.city) {
    let raw = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${req.query.city}&appid=${process.env.weather_api_key}`
    );

    let data = await raw.json();

    res.send(data);
  } else res.json("no");
});

app.listen(process.env.port, () => {
  console.clear();
  console.log(`Server online! (http://localhost:${process.env.port})`);
});
