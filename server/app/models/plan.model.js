module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan", {
        data: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    });

    return Plan;
};