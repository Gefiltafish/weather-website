const request = require("request");

const geocode = (adress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(adress) +
    ".json?access_token=pk.eyJ1IjoiZ2VmaWx0YWZpc2giLCJhIjoiY2tzaGplMW9sMDJlZjJwb3hrNjBla2t2NCJ9.A3dZ0Q8lt6lwPogNDdWvMg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connent to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
