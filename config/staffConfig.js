
const { Sequelize } = require('sequelize');
require('dotenv').config();
// Define the configuration object
const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log,  // Show SQL queries in the console
    define: {
      timestamps: false, 
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_prod',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
};

// Determine the environment (default to development)
const env = process.env.NODE_ENV ;

// Select the configuration for the current environment
const currentConfig = config[env];

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, {
  host: currentConfig.host,
  dialect: currentConfig.dialect,
  logging: currentConfig.logging,
  define: currentConfig.define,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database & tables:', err);
  });

// Export the initialized Sequelize instance
module.exports = sequelize;
