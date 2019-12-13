var express = require('express');
var router = express.Router();
var unirest = require("unirest");
const apiKey = '3880c52a0c716a430380ffa1bfd11f31';


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Weather and Webcams'});
});

router.post('/', function (req, res, next) {
  let city = req.body.city;
  var req = unirest("GET", `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  req.end( result => {
    if (result.error) throw new Error(result.error);
    weather = result.body;
    res.render('partials/weatherdata', {weather: weather});

  })
  
})

module.exports = router;
