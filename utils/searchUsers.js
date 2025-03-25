const client = require("../config/elasticsearch");

async function searchUsers(query) {
  try {
    const response = await client.search({
      index: "users",
      body: {
        query: {
          multi_match: {
            query,
            fields: ["name", "email", "skills"],
          },
        },
      },
    });

    if (!response.hits) {
      throw new Error("Elasticsearch response does not contain hits");
    }

    return response.hits.hits.map((hit) => hit._source);
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error(error.message || "Elasticsearch search failed");
  }
}

module.exports = { searchUsers };
