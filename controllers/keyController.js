const KeyModel = require("../models/KeyModel");
const path = require("path");
const fs = require("fs");

const MAP_API_KEY_PATH = path.join(
    __dirname,"../", "api_keys", "map_api_key.json");


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
                temp_data = JSON.parse(data);
                id = temp_data["id"]
                name = temp_data["name"];
                api_key = temp_data["api_key"];
                map_key = new KeyModel(id, name, api_key);
                this.map_key = this.map_key;
                res.json(map_key);
        });
    }

}

module.exports = KeyController;