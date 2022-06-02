const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

require("./app/routes/users.routes")(app);
require("./app/routes/events.routes")(app);
require("./app/routes/plan.routes")(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Catharsis." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});