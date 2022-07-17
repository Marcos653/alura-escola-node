const express = require("express");
const routes = require("./routes");
const app = express();
const port = 8080;

routes(app);

app.listen(port, () => console.log(`runing ${port}`));

module.exports = app;
