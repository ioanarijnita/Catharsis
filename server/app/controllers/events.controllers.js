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
        image: req.body.image,
        id: req.body.id,
        location: req.body.location,
        date: req.body.date,
        additionalInformation: req.body.additionalInformation,
        runningTime: req.body.runningTime,
        venueInformation: req.body.venueInformation,
        reviews: req.body.reviews,
        rating: req.body.rating
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

exports.update = (req, res) => {
    const id = req.params.id;

    Event.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Women was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Women with id=${id}.Req body is : ${req.params.revies} Maybe Women was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Women with id=" + id + " . Error is: " + err.message
            });
        });
};