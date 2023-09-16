const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.get("/", (req, res) => {
  res.send("Welcome to Notes API");
});

// Folder routes
const folderRoutes = require("./src/routes/folder.routes");
app.use("/api/folders", folderRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
