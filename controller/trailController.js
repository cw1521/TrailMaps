var trailController = require("../models/TrailModel");


trailController.getAll = (req, res, next) => {
    console.log(req.body)
    res.status(200);
    res.json({
        reqBody: req.body
    });
}



module.exports = trailController;