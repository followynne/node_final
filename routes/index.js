var express = require('express');
var router = express.Router();
var unirest = require("unirest");


/* GET home page. */
router.get('/', function (req, res, next) {

  var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/country=IT");
  var val;
  req.query({
    "lang": "en",
    "show": "webcams%3Aimage%2Clocation"
  });

  req.headers({
    "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
    "x-rapidapi-key": "56d819242bmsh4b3f8126e930fc8p1e2a16jsn3766d82d1118"
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    val = res.body;
    console.log(res.body.result.webcams[0]);
    
  });
  res.render('index', { title: 'Express', value : val });
});

router.post('/', function (req, res, next) {
  console.log(req);
})

module.exports = router;
