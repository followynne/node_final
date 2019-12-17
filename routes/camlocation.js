var express = require('express');
var router = express.Router();
var unirest = require("unirest");

router.get('/getcontinent', function (req, res, next) {
    let dataSearched = req.query.search; 
    var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/continent=" + dataSearched);
    req.query({
      "lang": "en",
      "show": "countries"
    });
    req.headers({
      "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI
    });
    req.end(function (rese) {
        if (rese.error) throw new Error(rese.error);  
        return res.render('partials/countries', {countries: rese.body.result.countries});
    });
});

router.get('/getcountry', function (req, res, next) {
    let dataSearched = req.query.search; 
    var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/country=" + dataSearched);
    req.query({
      "lang": "en",
      "show": "regions"
    });
    req.headers({
      "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI
    });
    req.end(function (rese) {
        if (rese.error) throw new Error(rese.error);  
        return res.render('partials/countries', {regions: rese.body.result.regions});
    });
});

router.get('/getregion', function (req, res, next) {
    let dataSearched = req.query.search;
    let offset = 0;
    let locations = [];
    let request = () => {
      var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/region=" + dataSearched + '/limit=50,' + offset);
      req.query({
        "lang": "en",
        "show": "webcams:location"
      });
      req.headers({
        "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI
      });
      req.end(function (rese) {
          if (rese.error) throw new Error(rese.error);
          locations.push([...rese.body.result.webcams]);
          offset+=50;
          rese.body.result.total>rese.body.result.offset ? request() : res.render('partials/countries', {locations: locations});
      });
    }
    request();

});

module.exports = router;
