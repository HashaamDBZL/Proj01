const client = require("../config/elasticsearch");

async function searchUsers(query, isPartial) {
  try {
    const response = await client.search({
      index: "users",
      body: {
        query: isPartial
          ? {
              bool: {
                should: [
                  { match_phrase_prefix: { name: query } },
                  { match_phrase_prefix: { email: query } },
                  { match_phrase_prefix: { skills: query } },
                  { wildcard: { name: `*${query}*` } },
                  { wildcard: { email: `*${query}*` } },
                  { wildcard: { skills: `*${query}*` } },
                ],
                minimum_should_match: 1, // At least one condition should match
              },
            }
          : {
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
