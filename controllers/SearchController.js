const fs = require("fs").promises;
const http = require("https");
const path = require("path")
const xml2js = require("xml2js");
const TrailModel = require("../models/TrailModel");



function log(oStr) {
    console.log(oStr);
}

function filterMin(trails, query) {
    if (query["min"]) {
        let temp = trails.filter(trail => {
            return parseFloat(query["min"]) < parseFloat(trail["length"])
        });
        return temp
    }
    else return trails;
}

function filterMax(trails, query) {
    if (query["max"]) {
        let temp = trails.filter(trail => {
            return parseFloat(query["max"]) > parseFloat(trail["length"])
        });
        return temp
    }
    else return trails;
}

function filterDifficulty(trails, query) {
    // log(query)
    let temp = [];
    if (query["d"]) {
        if (typeof query["d"] === 'string' || query["d"] instanceof String)
            query["d"] = [query["d"]];
        for (let trail of trails) {
            for (let diff of query["d"]) {
                if (trail["difficulty"].toLowerCase() == diff.toLowerCase()) {
                    temp.push(trail);
                    break;
                }
            }
        }
        return temp;    
    }
    else return trails;
}

function filterRatings(trails, query) {
    let temp = [];
    if (query["r"]) {
        if (typeof query["r"] === 'string' || query["r"] instanceof String)
            query["r"] = [query["r"]];
        for (let trail of trails) {
            for (let rating of query["r"]) {
                if (Math.floor(trail["rating"]) == rating) {
                    temp.push(trail);
                    break;
                }
            }
        }
        return temp;
    }
    else return trails;
}

function js2Xml(arr) {
    if (arr.length > 0) {
        let temp = `<trailmaps>\n`
        for (let elem of arr) {
            // log(elem)
            let model = new TrailModel(elem);
            temp += model.toString();
        }
        temp +=  `\n</trailmaps>`;
        return temp;
    }
    else return ``;
}

class SearchController {


    constructor(query, res) {
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
        this.setApiPath(query);
        this.setApiKey(query, res);
    }


    setApiPath(query) {
        this.options.path += `lat=${query["lat"]}&lon=${query["long"]}`;
    }

    setApiKey(query, res) {
        fs.readFile(this.trail_key_path)
        .then(file => {
            xml2js.parseString(file, (err, result) => {
                this.key = result["apikey"]["key"];
                this.options.headers["X-RapidAPI-Key"] = this.key;
                this.request(query, res, this.searchTrails)
            });
        });
    }


    searchTrails(trails, query, res) {
        let temp = filterMin(trails, query);
        temp = filterMax(temp, query);
        temp = filterDifficulty(temp, query);
        temp = filterRatings(temp, query);
        temp = js2Xml(temp);
        res.set("Content-Type", "application/xml");
        res.send(temp);
        log(temp);
    }
    
    
    request(query, resp, callback) {
        const req = http.request(this.options, function (res) {
            const chunks = [];
        
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
        
            res.on('end', function () {
                const body = Buffer.concat(chunks);
                callback(JSON.parse(body.toString())["data"], query, resp);
            });
        });
        
        req.end();
    }




}

module.exports = SearchController;
