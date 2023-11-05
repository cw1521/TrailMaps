const fs = require("fs").promises;
const http = require("https");
const path = require("path")
const xml2js = require("xml2js");

function log(oStr) {
    console.log(oStr);
}



class SearchController {
    constructor(query) {
        this.query = query;
        this.trail_key_path = path.join(__dirname, "..", "api_keys", "trailkey.xml");
        this.options = {
            method: 'GET',
            hostname: 'trailapi-trailapi.p.rapidapi.com',
            port: null,
            path: '/trails/explore/?',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
            }
        };
        this.setApiPath();
        this.setApiKey();
    }


    setApiPath() {
        this.options.path += `lat=${this.query["lat"]}&lon=${this.query["long"]}`;
    }

    setApiKey() {
        fs.readFile(this.trail_key_path)
        .then(file => {
            xml2js.parseString(file, (err, result) => {
                this.key = result["apikey"]["key"];
                this.options.headers["X-RapidAPI-Key"] = this.key;
                this.request(log)
            });
        });
    }

    
    request(callback) {
        const req = http.request(this.options, function (res) {
            const chunks = [];
        
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
        
            res.on('end', function () {
                const body = Buffer.concat(chunks);
                callback(body.toString());
            });
        });
        
        req.end();
    }
}

module.exports = SearchController;
