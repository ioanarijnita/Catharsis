module.exports = {
  HOST: "eu-cdbr-west-02.cleardb.net",
  USER: "b921ce9dbaf738",
  PASSWORD: "5286107e",
  DB: "heroku_1ccfee457fd604a",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};