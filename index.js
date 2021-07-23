//var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var BASE_API_PATH = "/api/v1"; 
//var BASE_API = "https://sos2021-sep-mcc.herokuapp.com/";
var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));

app.get("/", (req,res) => {
    //response.send(cool());
    res.send("Hello from this tiny server");
   console.log("New request has d");
});

/*app.get("/info/psychology_stats", (request,response)=>{

    response.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>psychology_stats</title>
            <style>
                table, tr, td , th{
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                tr, td {
                    padding: 5px;
                    text-align: center;    
                }
            </style>
        </head>
        <body>
            <h3>Psicología - Datos en las comunidades autónomas de España</h3>
             </br>
             <table class="default" style="width:100%">
            <tr>
                <th>country</th>
                <th>year</th>
                <th>psy_women</th>
                <th>psy_men</th>
                <th>psy_population</th>
            </tr>
            <tr>
                <td>Spain_Andalucia</td>
                <td>2017</td>
                <td>6,06</td>
                <td>4,86</td>
                <td>5,47</td>
		


            </tr>
            <tr>
                <td>Spain_Aragón</td>
                <td>2017</td>
                <td>6,94</td>
                <td>3,46</td>
                <td>5,22</td>
            </tr>
            <tr>
                <td>Spain-Asturias</td>
                <td>2017</td>
                <td>8,36</td>
                <td>4,98</td>
                <td>6,74</td>
            </tr>
    
            <tr>
                <td>Spain-Baleares</td>
                <td>2017</td>
                <td>4,29</td>
                <td>3,59</td>
                <td>3,94</td>
            </tr>
            <tr>
                <td>Spain-Canarias</td>
                <td>2017</td>	
                <td>3,71</td>
                <td>3,28</td>
                <td>3,5</td>
            </tr>
            <tr>
                <td>Spain-Cantabria</td>
                <td>2017</td>
                <td>3,26</td>
                <td>2,73</td>
                <td>3</td>
            </tr>
            </table>
        </body>
        </html>`
        );

});	*/
app.get(BASE_API_PATH + "/psychology-stats/loadInitialData", (request, res) => {
    var psychology_stats_data = [
        {
            "country": 'Spain_Andalucia',
            "year": 2017,
            "psychology_women": 6.06,
            "psychology_men": 4.86,
            "psychology_population": 5.47
        },
        {
            "country": 'Spain_Aragon',
            "year": 2017,
            "psychology_women": 6.94,
            "psychology_men": 3.46,
            "psychology_population": 5.22
        },
        {
            "country": 'Spain_Asturias',
            "year": 2017,
            "psychology_women": 8.36,
            "psychology_men": 4.98,
            "psychology_population": 6.74
        },
        {
            "country": 'Spain_Baleares',
            "year": 2017,
            "psychology_women": 4.29,
            "psychology_men": 3.59,
            "psychology_population": 3.94
        },
        {
            "country": 'Spain_Canarias',
            "year": 2017,
            "psychology_women": 3.71,
            "psychology_men": 3.28,
            "psychology_population": 3.5
        },
        {
            "country": 'Spain_Cantabria',
            "year": 2017,
            "psychology_women": 3.26,
            "psychology_men": 2.73,
            "psychology_population": 3
        }
    ];

    console.log(`Loaded Initial Data: <${JSON.stringify(psychology_stats_data, null, 2)}>`);
    return res.sendStatus(200);
})


app.get(BASE_API_PATH + "/psychology_stats", (request,response)=>{


});	
app.post("/", (req,res) => {
  
    res.send("Hello from this tiny server");
  
});

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});
//console.log(cool());