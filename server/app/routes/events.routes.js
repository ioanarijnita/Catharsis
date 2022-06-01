module.exports = app => {
    const events = require("../controllers/events.controllers.js");
    var router = require("express").Router();
    router.post("/", events.create);
    router.get("/", events.findAll);
    router.put("/:id", events.update);
    app.use('/api/events', router);
};