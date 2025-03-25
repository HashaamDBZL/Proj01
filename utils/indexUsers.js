const client = require("../config/elasticsearch");
const { getUsersWithSkills } = require("../models/user");

async function indexUsers() {
  const users = await getUsersWithSkills();

  for (const user of users) {
    await client.index({
      index: "users",
      id: user.id.toString(),
      body: {
        name: `${user.firstName} ${user.lastName || ""}`.trim(),
        email: user.email,
        skills: user.skills.map((skill) => skill.name),
      },
    });
  }

  console.log("Users indexed successfully!");
}

indexUsers().catch(console.error);
