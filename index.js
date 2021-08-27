var express = require("express");

var bodyParser = require("body-parser");

//  Versión V1    var psychology_stats_api = require("./src/back/psychology-stats");


var port = (process.env.PORT || 10000);


var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_v2 = "/api/v2";

var app = express();
app.use(bodyParser.json());
app.use(express.json());

// Versión v1    

var psychology_stats_api = require("./src/back/psychology-stats/v2");
var psychology_stats_api_v1 = require("./src/back/psychology-stats/v1");

psychology_stats_api.register(app, BASE_API_PATH_v2);
psychology_stats_api_v1.register(app, BASE_API_PATH);

var path = require("path");

var cors = require("cors");

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cors());

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});