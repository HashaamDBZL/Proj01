const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const userSkillRoutes = require("./routes/userSkillRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", skillRoutes);
app.use("/api", userSkillRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
