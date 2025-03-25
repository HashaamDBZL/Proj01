require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");

const ELASTICSEARCH_URL = `http://localhost:${process.env.ES_LOCAL_PORT}`;
const ELASTICSEARCH_USERNAME = "elastic"; // Default superuser
const ELASTICSEARCH_PASSWORD = process.env.ES_LOCAL_PASSWORD;

const elasticClient = new Client({
  node: ELASTICSEARCH_URL,
  auth: {
    username: ELASTICSEARCH_USERNAME,
    password: ELASTICSEARCH_PASSWORD,
  },
});

module.exports = elasticClient;
