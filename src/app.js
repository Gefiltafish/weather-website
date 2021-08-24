const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help aricle not found");
});

app.get("*", (req, res) => {
  res.send("My 404 page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
