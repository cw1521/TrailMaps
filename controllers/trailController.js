const path = require("path");
const TRAIL_XML_PATH = path.join(__dirname, "../", "xml", "trails.xml");
const fs = require("fs");
const SearchController = require("./SearchController");

class TrailController {
    constructor() {
        this.trails = null;
        this.searchController = null;
    }
}


TrailController.get = (req, res, next) => {
    if (req.query) {
        // console.log(req.query);
        this.searchController = new SearchController(req.query, res);
    }
    else {
        res.status(200);
        res.set("Content-Type", "application/xml");
        fs.readFile(TRAIL_XML_PATH, (err, data) => {
            res.send(data);
        });
    }
}



module.exports = TrailController;