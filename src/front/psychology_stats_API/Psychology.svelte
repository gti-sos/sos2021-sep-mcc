<script>
    import { Button, Table } from "sveltestrap";
    const API_PSYCHOLOGY_STATS = "/api/v1/psychology-stats"; 
    let dataCharged = false;
    let psychologystats = [];
    async function loadStats() {
        console.log("Loading data...");
        const cargaDeDatos = await fetch("/api/v1/psychology-stats/loadInitialData"
        );
        dataCharged = true;
        if (cargaDeDatos.ok) {
            console.log("Ok.");
            const res = await fetch(API_PSYCHOLOGY_STATS);
            if (res.ok) {
                console.log("Ok. Obtaining data...");
                const json = await res.json();
                psychologystats = json;
                console.log("Received ${psychologystats.length} psychology stats.");
            } else {
                console.log("Error, there is no data.");
            }
        } else {
            console.log("Error loading data.");
        }
    }
    async function deleteStats() {
        console.log("Deleting psychology_stats...");
        dataCharged = false;
        const res = await fetch(API_PSYCHOLOGY_STATS, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("Ok.");
                psychologystats = [];
            } else if (res.status == 404) {
                console.log("No data found");
            } else {
                console.log("Error deleting DB stats");
            }
        });
    }
</script>

<main>
    <div>
        {#if dataCharged}
            <Button style="background-color: #8C17BD;" disabled>
                Cargar datos base</Button
            >
        {:else}
            <Button style="background-color: #8C17BD;" on:click={loadStats}>
                Carga de datos</Button
            >
        {/if}
        <Button style="background-color: #8C929D" on:click={deleteStats}>
            Eliminar datos</Button
        >
    </div>
   

    {#if psychologystats.length != 0}
        <br />
          
        <Table bordered style="text-align: center;" bgcolor="cyan">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Media de Hombres que acuden al Psicólogo</th>
                    <th>Media de Mujeres que acuden al Psicólogo</th>
                    <th>Media de Población que acuden al Psicólogo</th>
                </tr>
            </thead>
            <tbody>
                {#each psychologystats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.year}</td>
                        <td>{stat["psychology_men"]}</td>
                        <td>{stat["psychology_women"]}</td>
                        <td>{stat["psychology_population"]}</td>
                    </tr>
                {/each}
            </tbody>
        
        </Table>
    
        <a href="/">Página Principal</a>
    {:else}
        <br />
        <p style="text-align: center">
            Si desea ver los datos únicamente presione el botón, ¡gracias!
        </p>
        <a href="/">Página Principal</a>
    {/if}
</main>

<style>
    a {
        font-size: 18px;
        background-color: rgb(74, 98, 248);
        color: white;
        border-radius: 6px;
        border: 1px solid rgb(32, 31, 31);
        padding: 4px;
    }
    a:hover {
        color: white;
    }
</style>