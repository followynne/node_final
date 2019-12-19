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
        let x = rese.body.result.countries;
        x.sort((a, b) => (a.name > b.name) ? 1 : -1)
        return res.render('partials/countries', {countries: x});
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
        let x = rese.body.result.regions;
        x.sort((a, b) => (a.name > b.name) ? 1 : -1)
        return res.render('partials/countries', {regions: x});        
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
          locations[0].sort((a, b) => (a.title > b.title) ? 1 : -1);
          rese.body.result.total>rese.body.result.offset ? request() : res.render('partials/countries', {locations: locations});
      });
    }
    request();

});

module.exports = router;
