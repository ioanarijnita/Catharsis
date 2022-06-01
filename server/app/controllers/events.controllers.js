const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const event = {
        title: req.body.title,
        reviewsCount: req.body.reviewsCount,
        description: req.body.description,
        price: req.body.price,
        image: req.body.imageName,
        id: req.body.id,
        location: req.body.location,
        date: req.body.date
    };

    Event.create(event)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Event."
            });
        });
};

exports.findAll = (req, res) => {
    Event.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};
