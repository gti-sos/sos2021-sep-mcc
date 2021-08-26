<script>
    import { onMount } from "svelte";
  
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  
    const BASE_CONTACT_API_PATH = "/api/v2";
  
    let psychologyData = [];
    let psychologyChartData = [];
  
  let psychologyChartCountry = [];
  let psychologyChartMen = [];
  let psychologyChartWomen = [];
  let psychologyChartPopulation = [];
  
  
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
  
    async function loadChart() {
      console.log("Fetching data...");
  
      const res = await fetch(BASE_CONTACT_API_PATH + "/psychology-stats");
      psychologyData = await res.json();
  
      if (res.ok) {
        psychologyData.forEach(stat => {
        psychologyChartCountry.push(stat.country);
        psychologyChartMen.push(stat["psychology_men"]);
        psychologyChartWomen.push(stat["psychology_women"]);
        psychologyChartPopulation.push(stat["psychology_population"]);
       
        });
      }
      
      console.log("psychology Chart DaTa: " + psychologyChartData);
  
      Highcharts.chart("container", {
        title: {
          text: "psychology-stats",
        },
        yAxis: {
          title: {
            text: "Media",
          },
        },
        xAxis: {
          title: {
            text: "Comunidad Autónoma",
          },
          categories: psychologyChartCountry,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        annotations: [
          {
            labels: [
              {
                point: "date",
                text: "",
              },
              {
                point: "min",
                text: "Min",
                backgroundColor: "white",
              },
            ],
          },
        ],
        series: [
          {
            name: "Media de Hombres que acuden al Psicólogo",
            data: psychologyChartMen,
          },
          {
            name: "Media de Mujeres que acuden al Psicólogo",
            data: psychologyChartWomen,
          },
          {
            name: "Media de la Población que acuden al Psicólogo",
            data: psychologyChartPopulation,
          },
          
          
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadChart}></script>
  </svelte:head>
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/psychology-stats">Interfaz</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>
        Analíticas
      </h2>
    </div>
  
  
    <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfica de líneas de psychology-stats
        </p>
      </figure>
    </div>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div{
      margin-bottom: 15px;
    }
    p {
      display: inline;
    }
    .msgRed {
      padding: 8px;
  
      background-color: #f8d7da;
    }
    .msgGreen {
      padding: 8px;
  
      background-color: #d4edda;
    }
    .highcharts-figure,
    .highcharts-data-table table {
      min-width: 360px;
      max-width: 800px;
      margin: 1em auto;
    }
  
    .highcharts-data-table table {
      font-family: Verdana, sans-serif;
      border-collapse: collapse;
      border: 1px solid #ebebeb;
      margin: 10px auto;
      text-align: center;
      width: 100%;
      max-width: 500px;
    }
    .highcharts-data-table caption {
      padding: 1em 0;
      font-size: 1.2em;
      color: #555;
    }
    .highcharts-data-table th {
      font-weight: 600;
      padding: 0.5em;
    }
    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
      padding: 0.5em;
    }
    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
      background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
      background: #f1f7ff;
    }
  </style>