var express = require('express');
var router = express.Router();
var unirest = require("unirest");
var fs = require('fs');

router.get('/', function (req, res, next) {  
    path = 'public/cache.json';
    if (fs.existsSync(path)){
        const birthtime = fs.statSync(path).mtimeMs;
        if ((Date.now() - birthtime) < 3600000){
            let content = fs.readFileSync('public/cache.json', 'UTF-8');
            res.send(content);
        } else {
            retrieve();
        }
    } else {
        retrieve();
    }

    function retrieve () { 
        let offset = 0;
        let chunk = [];
        let request = () => {
            var req = unirest("GET", "https://webcamstravel.p.rapidapi.com/webcams/list/property=live/limit=50," + offset);
            req.query({
                "lang": "en",
                "show": "webcams:location"
            });
            req.headers({
                "x-rapidapi-host": "webcamstravel.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPIDAPI
            });
            req.end( (result) => {
                if (result.error) throw new Error(result.error);
                let ref = result.body.result.webcams;
                chunk.push(ref);
                offset+=50;
                if (result.body.result.total > result.body.result.offset) return request();
                fs.writeFileSync('public/cache.json', JSON.stringify(chunk), 'UTF-8');
                res.send(chunk);
            });
        };
        request();
    }
});

module.exports = router;