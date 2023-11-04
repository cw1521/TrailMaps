var trailController = require("../models/TrailModel");
const path = require("path");
const TRAIL_XML_PATH = path.join(__dirname, "../", "website","assets", "xml", "trails.xml");
const fs = require("fs");



trailController.getAll = (req, res, next) => {
        res.status(200);
        res.set("Content-Type", "application/xml");
        fs.readFile(TRAIL_XML_PATH, (err, data) => {
                res.send(data);
        });
}



module.exports = trailController;