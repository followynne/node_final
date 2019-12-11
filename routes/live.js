var express = require('express');
var router = express.Router();
var unirest = require("unirest");

router.get('/', function (req, res, next) {

    let offset = 0;
    let locations = {};
    //let chuck = [];
    let request = () => {
        var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/property=live/limit=50," + offset);
        req.query({
            "lang": "en",
            "show": "webcams:location"
        });
        req.headers({
            "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
            "x-rapidapi-key": "56d819242bmsh4b3f8126e930fc8p1e2a16jsn3766d82d1118"
        });
        req.end( (result) => {
            if (result.error) throw new Error(result.error);
            let ref = result.body.result.webcams;
            // push to array = 7s, object manipulation + add to Obj = 10s
            //chuck.push(ref);
            
            Object.keys(ref).forEach((key) => {
                let tempobj = { [ref[key].id] : [
                                    {"title":ref[key].title,
                                     "region":ref[key].location.region,
                                     "country":ref[key].location.country,
                                     "continent":ref[key].location.continent
                                    }
                                ]
                              };
                Object.assign(locations, tempobj)
            })
            offset+=50;
            result.body.result.total > result.body.result.offset ? request() : res.send(locations);
        });
    };
    request();
});

module.exports = router;