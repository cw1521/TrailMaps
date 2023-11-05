const TrailController = require("../controllers/TrailController");
const KeyController = require("../controllers/KeyController");
const express = require("express");



function notSupportedHandler(req, res, next) {    
    res.status(403);
    res.json({
        message: "Not Supported."
    });
}
function indexRouteHandler(req, res) {
    res.render("index.html");
};





let router = express.Router();


router.route("")
.get(indexRouteHandler)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);



router.route("/trails")
.get(TrailController.get)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);



router.route("/apikey/:key")
.get(KeyController.get)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);







module.exports = router;