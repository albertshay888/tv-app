var axios = require("axios");
var fs = require("fs");


// Create the TV constructor
var TV = function() {
  // divider will be used as a spacer between the tv data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";

  // findShow takes in the name of a tv show and searches the tvmaze API
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;
     
      // showData ends up being the string containing the show data we will print to the console
      var showData = [
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) {
            throw err;  
        } else {
            console.log(showData);
            console.log("Log Updated");
        }
      });
    });
  };

  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;

    axios.get(URL).then(function(response) {
        // Place the response.data into a variable, jsonData.
        var jsonData = response.data[0].person;
  
        // showData ends up being the string containing the show data we will print to the console
        var showData = [
          "Name: " + jsonData.name,
          "Birthday: " + jsonData.birthday,
          "Gender: " + jsonData.gender,
          "Country: " + jsonData.country.name,
          "URL: " + jsonData.image.original
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function(err) {
          if (err) {
              throw err;
          } else {
            console.log(showData);
            console.log("Log Updated");
          }
        });
      });
    };
}

module.exports = TV;
