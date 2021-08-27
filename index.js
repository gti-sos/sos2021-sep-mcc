var express = require("express");

var bodyParser = require("body-parser");

//  Versión V1    var psychology_stats_api = require("./src/back/psychology-stats");


var port = (process.env.PORT || 10000);


var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_v2 = "/api/v2";

var app = express();
var cors = require("cors");
app.use(bodyParser.json());
var request = require("request");
app.use(express.json());
app.use(cors());

// Versión de v1, v2 e integration

var psychology_stats_api = require("./src/back/psychology-stats/v2");
var psychology_stats_api_v1 = require("./src/back/psychology-stats/v1");
var psychology_stats_api_INT = require("./src/back/psychology-stats/integration");



psychology_stats_api.register(app, BASE_API_PATH_v2);
psychology_stats_api_v1.register(app, BASE_API_PATH);
psychology_stats_api_INT.register(app, "/api/integration");

var path = require("path");



app.use("/", express.static(path.join(__dirname, "public")));



app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});