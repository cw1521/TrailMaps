const path = require("path");
const TRAIL_XML_PATH = path.join(__dirname, "../", "xml", "trails.xml");
const fs = require("fs");

class TrailController {
constructor() {
    this.trails = null;
}
}

TrailController.get = (req, res, next) => {
    if (req.query) {
        console.log(req.query);
    }
    else {
        console.log(req.query);
        res.status(200);
        res.set("Content-Type", "application/xml");
        fs.readFile(TRAIL_XML_PATH, (err, data) => {
            res.send(data);
        });
    }
}



module.exports = TrailController;