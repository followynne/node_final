var express = require('express');
var router = express.Router();
var unirest = require("unirest");

router.get('/', function (req, res, next) {
    let dataSearched = req.query.search; 
    var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/webcam=" + dataSearched);
    req.query({
      "lang": "en",
      "show": "webcams:player"
    });
    req.headers({
      "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
      "x-rapidapi-key": "56d819242bmsh4b3f8126e930fc8p1e2a16jsn3766d82d1118"
    });
    req.end(function (rese) {
        if (rese.error) throw new Error(rese.error);  
        //res.send(rese.body.result.webcams)
        res.render('partials/embed', {url: rese.body.result.webcams[0]});
    });
});

module.exports = router;
