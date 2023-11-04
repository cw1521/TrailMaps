const trailController = require("../controllers/trailController");
const keyController = require("../controllers/keyController");




const express = require("express");
let router = express.Router();


function notSupportedHandler(req, res, next) {    
    res.status(403);
    res.json({
        message: "Not Supported."
    });
}


function indexRoute(req, res) {
    res.render("index.html");
};


router.route("")
.get(indexRoute)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);


router.route("/trails")
.get(trailController.getAll)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);

router.route("/apikey/:key")
.get(keyController.get)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);

module.exports = router;