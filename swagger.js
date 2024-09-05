// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EMS API",
      version: "1.0.0",
      description: "API for hospital management system",
    },
    servers: [
      {
        url: process.env.CLIENT_URL || "http://localhost:5005", // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const PORT = process.env.PORT || 5005;
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, client_url) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at ${client_url}/api-docs`);
}

module.exports = swaggerDocs;
