const TrailModel = require("../models/TrailModel");
const path = require("path");
const TRAIL_XML_PATH = path.join(__dirname, "../", "xml", "trails.xml");
const fs = require("fs");

class TrailController {
        constructor() {
                this.trails = null;
        }
}

TrailController.getAll = (req, res, next) => {
        res.status(200);
        res.set("Content-Type", "application/xml");
        fs.readFile(TRAIL_XML_PATH, (err, data) => {
                res.send(data);
        });
}



module.exports = TrailController;