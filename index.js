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

//INTEGRACIONES DE COMPAÑEROS
//INTEGRACIÓN 1 GRUPO 27

var pathSuicidestats = '/api/v1/suicide-records';
var apiServerHostSuicidestats = 'https://sos2021-27.herokuapp.com/';

app.use(pathSuicidestats, function (req, res) {
  var url = apiServerHostSuicidestats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//INTEGRACIÓN 2 GRUPO 07

var pathDivorcestats = '/api/v1/rentals';
var apiServerHostDivorcestats = 'https://sos2021-07.herokuapp.com/';

app.use(pathDivorcestats, function (req, res) {
  var url = apiServerHostDivorcestats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//INTEGRACIÓN 3 GRUPO 10

var pathObesitystats = '/api/v2/obesity-stats';
var apiServerHostObesitystats = 'https://sos2021-10.herokuapp.com/';

app.use(pathObesitystats, function (req, res) {
  var url = apiServerHostObesitystats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//INTEGRACIÓN EXTERNA 1 COVID

var pathCovidstats = '/v3/covid-19/jhucsse/counties';
var apiServerHostCovidstats = 'https://disease.sh/';

app.use(pathCovidstats, function (req, res) {
  var url = apiServerHostCovidstats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

//INTEGRACIÓN EXTERNA 2 REGION

var pathRegionstats = '/rest/v2/region/europe';
var apiServerHostRegionstats = 'https://restcountries.eu/rest/v2/region/europe';

app.use(pathRegionstats, function (req, res) {
  var url = apiServerHostRegionstats + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});