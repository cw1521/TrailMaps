const trailController = require("../controller/trailController");





const express = require("express");
let router = express.Router();


function notSupportedHandler(req, res, next) {    
    res.status(403);
    res.json({
        message: "Not Supported."
    });
}



router.route("/trails")
.get(trailController.getAll)
.post(notSupportedHandler)
.put(notSupportedHandler)
.delete(notSupportedHandler);


module.exports = router;