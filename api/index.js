const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const swaggerConfig = require("./swagger");
const app = express();

// Initialize express-session
app.use(
  session({
    secret: "notes-api-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

swaggerConfig(app); // Integrate Swagger middleware

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.get("/", (req, res) => {
  res.send("Welcome to Notes API");
});

// User routes
const userRoutes = require("./src/routes/user.routes");
app.use("/api/users", userRoutes);

// Folder routes
const folderRoutes = require("./src/routes/folder.routes");
app.use("/api/folders", folderRoutes);

// Note routes
const noteRoutes = require("./src/routes/note.routes");
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
