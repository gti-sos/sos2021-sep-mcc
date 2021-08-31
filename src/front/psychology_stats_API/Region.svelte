<script>
    import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_REGION = "https://restcountries.eu/rest/v2/region/europe"
    
    async function loadRegion() {
        console.log("Loading data...");
      
        const res = await fetch(BASE_API_REGION).then(
          function (res) {
            if (res.ok) {
              errorMsg = "";
              console.log("OK");
            } else {
              if (res.status === 500) {
                errorMsg = "No se ha podido acceder a la base de datos";
              }
              console.log("ERROR!" + errorMsg);
            }
          }
        );
      }
      
      async function getdatos() {
        console.log("Fetching data...");
        await loadRegion();
        const res = await fetch(BASE_API_REGION);
        if (res.ok) {
          const json = await res.json();
          datos = json;
      
          console.log(`We have received ${datos.length} stats.`);
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }
      async function loadChart(){
        await getdatos();
        var poblacion = [];
        var area = [] ;
		var region = [] ;
       
        datos.forEach((dato_api) => {
            poblacion.push(dato_api.population);
            area.push(dato_api.area);
			region.push(dato_api.region);
           
    
        });
        Highcharts.chart('container', {
    chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
    title: {
        text: 'API Externa de extensión de Área'
    },
    plotOptions: {
        series: {
            depth: 25,
            colorByPoint: true
        }
    },
    series: [{
        data: area,
        name: 'Área',
        showInLegend: 'Extensión de área en Europa'
    }]
});
      }

</script>
    
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/highcharts-3d.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/cylinder.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/exporting.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/export-data.js" on:load={loadChart}></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadChart}></script>

</svelte:head>
<main>
    <Nav>
      <NavItem>
      <NavLink href="/">Página Principal</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="#/integrations">Integraciones</NavLink>
      </NavItem>
      </Nav>      
  
  
        
      <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           
        </p>
    </figure>
    {#if errorMsg}
    <p>{errorMsg}</p>
    {/if}
  </main>
  
  <style>
#container {
    height: 400px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
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
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>