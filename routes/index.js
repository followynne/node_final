var express = require('express');
var router = express.Router();
var unirest = require("unirest");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Weather and Webcams'});
});

router.post('/', function (req, res, next) {
  console.log(req);
  return;
})

module.exports = router;
