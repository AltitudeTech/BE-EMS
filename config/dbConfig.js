const Sequelize = require("sequelize");
require("dotenv").config();

const CONFIG = {
  DB_name: process.env.DB_name,
  DB_username: process.env.DB_username,
  DB_password: process.env.DB_password,
  DB_dialect: process.env.DB_dialect,
  DB_host: process.env.DB_host,
  DB_port: process.env.DB_port,
};

const db = new Sequelize(
  CONFIG.DB_name,
  CONFIG.DB_username,
  CONFIG.DB_password,
  {
    host: CONFIG.DB_host,
    dialect: CONFIG.DB_dialect,
    port: CONFIG.DB_port,
    logging: false, // Optionally disable logging
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds
    },
  }
);

// Check for errors
(async () => {
  try {
    await db.authenticate();
    await db.sync({ force: false });
    console.log("Connection to database successful and synced successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
