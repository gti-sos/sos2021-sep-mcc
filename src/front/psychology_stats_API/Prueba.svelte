<script>
    
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-sep-mcc.herokuapp.com/api/v2/psychology-stats";
    var API2 = "https://sos2021-27.herokuapp.com/api/v2/azar-games-and-bet-activities";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let pais=[];
        let psicologia_hombre = [];
        let psicologia_mujer = [];


        let pais2 = [];
        let bingo = [];
        let loteria =[];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
        myData = await resData.json();
        dataG2 = await resDataG2.json();
        pais = myData.map((myData)=> (myData.country));
        psicologia_hombre = myData.map((myData)=> parseFloat(myData.psychology_men));
        psicologia_mujer = myData.map((myData)=> parseFloat(myData.psychology_women));
        
        pais2 = dataG2.map((dataG2)=> dataG2.province);
        bingo = dataG2.map((dataG2)=> dataG2.catering_bingo_machine.toString());
        loteria = dataG2.map((dataG2)=> dataG2.lottery_engagement.toString());
        
        dataG2.forEach((e) => {

          
        pais2.push(e.province);
        bingo.push(e.catering_bingo_machine);
        loteria.push(e.lottery_engagement);
        });

        myData.forEach((f) => {

          
    pais.push(f.country);
    psicologia_mujer.push(f.psychology_women);
    psicologia_hombre.push(f.psychology_men);
});
        
    
        console.log(pais);
        console.log(pais2);
        console.log(psicologia_mujer);
        console.log(psicologia_hombre);
        console.log(bingo);
        console.log(loteria);

        var trace1 = {
        
        x: pais2,
        y: bingo,
        mode: 'markers',
        type: 'scatter',
        name: 'Datos de psicología ',
        text: pais2,
        marker: { size: 12 }
        };
        var trace2 = {
        x: pais2,
        y: loteria,
        mode: 'markers',
        type: 'scatter',
        name: 'Datos de juegos de azar',
        text: pais2,
        marker: { size: 12 }
        };
        var data = [ trace1, trace2];
        var layout = {
        xaxis: {
            range: bingo
        },
        yaxis: {
            range: [0, 100]
        },
        title:''
        };
        Plotly.newPlot('myDiv', data, layout);
}
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.2.min.js' on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Integración 4 Juegos de azar</h3>

    <div id="myDiv"></div>
    <Nav>
        <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="https://sos2021-sep-mcc.herokuapp.com/#/psychology-stats">Cargar Datos Iniciales Míos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://sos2021-27.herokuapp.com/#/azar-games-and-bet-activities">Cargar Datos Iniciales Compañero</NavLink>
                </NavItem>
        </Nav> 
    
</main>
