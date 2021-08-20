<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    
    const API_PSYCHOLOGY_STATS = "/api/v1/psychology-stats"; //tiene que llamar a la API para tratar los datos
    let chargedData = false;
    let psychologyStats = [];
    let errorMsg = "";
    let correctMsg = "";
    let newData = {
        country: "",
        year: "",
        psychology_men: "",
        psychology_women: "",
        psychology_population: "",
    };
    onMount(getpsychologyStats);
    async function loadpsychologyStats() {
        console.log("Loading data...");
        const res = await fetch(API_PSYCHOLOGY_STATS + "/loadInitialData");
        chargedData = true;
        if (res.ok) {
            console.log("Ok.");
            getpsychologyStats();
            errorMsg = "";
            correctMsg = "Los datos se han cargado correctamente.";
        } else {
            console.log("Error loading data.");
        }
    }
    async function getpsychologyStats() {
        console.log("Fetching psychology stats...");
        const res = await fetch(API_PSYCHOLOGY_STATS);
        if (res.ok) {
            chargedData = true;
            console.log("Ok. Obtaining data...");
            const json = await res.json();
            psychologyStats = json;
            console.log(`Received ${psychologyStats.length} psychology stats.`);
        } else if (res.status == 500) {
            errorMsg = "No se ha podido acceder la base de datos.";
            console.log(errorMsg);
        } else if (res.status == 404) {
            errorMsg = "No se encuentran datos. Tiene que cargarlos.";
            console.log("Error. " + errorMsg);
        } else {
            //este realmente no va a ser otro caso que el status = 500
            errorMsg = res.status + ": " + res.statusText;
            console.log(errorMsg);
        }
    }
    async function insertpsychologyStats() {
        console.log("Inserting data" + JSON.stringify(newData) + "...");
        if (
            !newData.country ||
            !newData.year ||
            !newData["psychology_men"] ||
            !newData["psychology_women"] ||
            !newData["psychology_population"]
        ) {
            alert("Todos los campos son obligatorios.");
        } else {
            const res = await fetch(API_PSYCHOLOGY_STATS, {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    console.log("OK");
                    getpsychologyStats();
                    errorMsg = "";
                    correctMsg = "Se ha insertado correctamente.";
                } else if (res.status == 409) {
                    errorMsg = "Ya existe un recurso con el mismo país y año.";
                    console.log("ERROR. " + errorMsg);
                } else {
                    //status == 500
                    errorMsg = "No se ha podido acceder la base de datos.";
                    console.log("Error inserting data in DB");
                }
            });
        }
    }
    async function deletepsychologyStats() {
        console.log("Deleting psychology stats...");
        chargedData = false;
        const res = await fetch(API_PSYCHOLOGY_STATS, {
            method: "DELETE",
        }).then(function (res) {
            if (res.ok) {
                console.log("Ok. " + correctMsg);
                psychologyStats = [];
                errorMsg = "";
                correctMsg = "Se han eliminado todo los datos correctamente.";
            } else if (res.status == 404) {
                //no data found
                errorMsg = "No hay datos para borrar.";
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
    async function deletepsychologyStatsPerYear(country, year) {
        //borra un recurso concreto
        console.log(`Deleting the resource with ${country} and year ${year}`);
        const res = await fetch(
            API_PSYCHOLOGY_STATS + "/" + country + "/" + year,
            { method: "DELETE" }
        ).then(function (res) {
            if (res.ok) {
                correctMsg = `El dato con país: ${country} y año: ${year} se ha eliminado correctamente.`;
                errorMsg = "";
                console.log("Ok. " + correctMsg);
                getpsychologyStats(); /*para que el usuario no tenga que recargar la página */
            } else if (res.status == 404) {
                //no data found
                errorMsg = `No se encuentra el dato con país:  ${country} y año: ${year}.`;
                console.log("ERROR. " + errorMsg);
            } else {
                //status == 500
                errorMsg = "No se ha podido acceder a la base de datos.";
                console.log("ERROR. " + errorMsg);
            }
        });
    }
</script>

<main>
    <div>
        {#if chargedData}
            <Button style="background-color: #8C17BD;" disabled>
                Cargar datos iniciales
            </Button>
        {:else}
            <Button style="background-color: #8C17BD;" on:click={loadpsychologyStats}>
                Cargar datos iniciales</Button
            >
        {/if}
        <Button style="background-color: red" on:click={deletepsychologyStats}>
            Eliminar datos</Button
        >
    </div>

    {#if psychologyStats.length != 0}
        <br />
        <Table bordered style="text-align: center;" bgcolor="cyan">
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Media de Hombres que acuden al Psicólogo</th>
                    <th>Media de Mujeres que acuden al Psicólogo </th>
                    <th>Media de Población que acuden al Psicólogo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        ><input
                            placeholder="Por Ej: Spain_Andalucia"
                            bind:value={newData.country}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Por Ej: 2021"
                            bind:value={newData.year}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Por Ej: 16.08"
                            min="0"
                            bind:value={newData["psychology_men"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Por Ej: 20.19"
                            min="0"
                            bind:value={newData["psychology_women"]}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="Por Ej: 2.00"
                            min="0"
                            bind:value={newData["psychology_population"]}
                        /></td
                    >
                    <td
                        ><Button
                            outline
                            color="primary"
                            on:click={insertpsychologyStats}
                        >
                            Insertar</Button
                        ></td
                    >
                </tr>
                {#each psychologyStats as stat}
                    <tr>
                        <td>{stat.country}</td>
                        <td>{stat.year}</td>
                        <td>{stat["psychology_men"]}</td>
                        <td>{stat["psychology_women"]}</td>
                        <td>{stat["psychology_population"]}</td>
                        <td>
                            <a href="#/psychology-stats/{stat.country}/{stat.year}">
                                <Button style="background-color: green;">
                                    Editar
                                </Button>
                            </a>
                            <Button 
                                outline
                                style= "background-color: red; margin-right: 10px;"
                                color="red"



                                
                                on:click={() =>
                                    deletepsychologyStatsPerYear(stat.country, stat.year)}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <Button style="background-color:blue " on:click={pop}>
            Volver
        </Button>
    {:else}
        <br />
        <p style="text-align: center; background-color: antiquewhite;">
            Pulse el botón para ver las estadísticas de Psicología.
        </p>

        <Button style="background-color:blue" on:click={pop}>Volver</Button>
    {/if}

    {#if errorMsg}
        <p style="color: red; text-align:center; font-size: 20px;">
            ERROR: {errorMsg}
        </p>
    {/if}

    {#if correctMsg}
        <p style="color: green; text-align:center; font-size: 20px;">
            {correctMsg}
        </p>
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
