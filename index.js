//var cool = require("cool-ascii-faces");
var express = require("express");
var path = require("path");
var app = express();

var port = (process.env.PORT || 10000);

app.use("/", express.static(path.join(__dirname,"public")));

app.get("/", (req,res) => {
    //response.send(cool());
    res.send("Hello from this tiny server");
   console.log("New request has d");
});

app.get("/info/psychology_stats", (request,response)=>{

    response.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>psychology_stats</title>
            <style>
                table, tr, td {
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
                <td>country</td>
                <td>year</td>
                <td>psy_women</td>
                <td>psy_men</td>
                <td>psy_population</td>
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

});	


app.post("/", (req,res) => {
  
    res.send("Hello from this tiny server");
  
});

app.listen(port, () => {
    console.log(`Server ready listening on ${port}`);
});
//console.log(cool());