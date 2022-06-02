module.exports = app => {
    const plan = require("../controllers/plan.controllers.js");
    var router = require("express").Router();
    router.post("/", plan.create);
    router.get("/", plan.findAll);
    router.put("/:id", plan.update);
    app.use('/api/plan', router);
};