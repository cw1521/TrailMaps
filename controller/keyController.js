var keyController = require("../models/KeyModel");
const path = require("path");
const fs = require("fs");

const MAP_API_KEY_PATH = path.join(
    __dirname,"../", "api_keys", "map_api_key.json");




keyController.get = (req, res, next) => {
    if (req.params.key == "map") {
        fs.readFile(
            MAP_API_KEY_PATH,
            (err, data) => {
                temp_data = JSON.parse(data);
                this.id = temp_data["id"]
                this.name = temp_data["name"];
                this.api_key = temp_data["api_key"];
                res.json(temp_data);
        });
    }

}

module.exports = keyController;