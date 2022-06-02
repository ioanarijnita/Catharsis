module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        reviewsCount: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING 
        },
        location: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
        additionalInformation: {
            type: Sequelize.STRING
        },
        runningTime: {
            type: Sequelize.STRING
        },
        venueInformation: {
            type: Sequelize.STRING
        },
        reviews: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        plan: {
            type: Sequelize.STRING
        }
    });

    return Event;
};