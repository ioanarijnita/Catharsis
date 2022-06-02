const db = require("../models");
const Plan = db.plan;

exports.create = (req, res) => {
    if (!req.body.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        data: req.body.data,
        id: req.body.id,
        name: req.body.name
    };

    Plan.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};


exports.findAll = (req, res) => {
    Plan.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Plan.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Women was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Women with id=${id}.Req body is : ${req.params.isReserved} or ${req.params.is} Maybe Women was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Women with id=" + id + " . Error is: " + err.message
            });
        });
};