const KeyModel = require("../models/KeyModel");
const path = require("path");
const fs = require("fs");

const MAP_API_KEY_PATH = path.join(
    __dirname,"../", "api_keys", "mapkey.xml");


class KeyController {
    constructor() {
        this.map_key = null;
        this.trail_key = null;
    }
}

KeyController.get = (req, res, next) => {
    if (req.params.key == "map") {
        fs.readFile(
            MAP_API_KEY_PATH,
            (err, data) => {
                res.send(data);
            }
        );
    }

}


module.exports = KeyController;

