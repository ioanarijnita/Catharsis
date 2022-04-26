const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.login = async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const existingUser = await User.findByPk(req.body.userId);
    if (!existingUser) {
        res.status(500).send({
            msg: `No account with this email found`
        })
        return;
    }
    const doesPasswordMatch = bcrypt.compareSync(req.body.password, existingUser.password);
    if (!doesPasswordMatch) {
        res.status(500).send({
            msg: "Passwords do not match"
        })
        return;
    }
    res.json(existingUser);
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};
