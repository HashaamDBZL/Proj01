const elasticClient = require("./elasticsearch");

async function testConnection() {
  try {
    const health = await elasticClient.cluster.health();
    console.log("Elasticsearch Cluster Health:", health);
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
}

testConnection();
