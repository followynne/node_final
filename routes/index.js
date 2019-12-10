var express = require('express');
var router = express.Router();
var unirest = require("unirest");


/* GET home page. */
router.get('/', function (req, res, next) {

  var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/continent=EU");
  req.query({
    "lang": "en",
    "show": "continents"
  });

  req.headers({
    "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
    "x-rapidapi-key": "56d819242bmsh4b3f8126e930fc8p1e2a16jsn3766d82d1118"
  });


  req.end(function (rese) {
    if (rese.error) throw new Error(rese.error);
    console.log(rese);
    res.render('index', { title: 'Weather and Webcams'});
  });
});

router.post('/', function (req, res, next) {
  console.log(req);
  return;
})

module.exports = router;
