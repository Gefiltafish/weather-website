const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=acc8db2a25fad9de9d18e143295401b0&query= +
    ${latitude}
    ,
    ${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!");
    } else if (body.error) {
      callback(
        "Could not find forecast for this location. Try another search."
      );
    } else {
      const location = body.location.name;
      const description = body.current.weather_descriptions[0].toLowerCase();
      const temperature = body.current.temperature;
      callback(
        undefined,
        `The weather in ${location} is currently ${description}, with a temperature of ${temperature} celcius`
      );
    }
  });
};

module.exports = forecast;
