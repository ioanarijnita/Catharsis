module.exports = app => {
    const users = require("../controllers/users.controllers.js");
    var router = require("express").Router();
    router.post("/", users.create);
    router.post("/users", users.login);
    router.get("/", users.findAll);
    app.use('/api/users', router);
};