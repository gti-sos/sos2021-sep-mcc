<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    const API_PSYCHOLOGY_STATS = "/api/v2/psychology-stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};
    let psychologyStat = {};
    let updatedCountry = "";
    let updatedYear = 0;
    let updatedPsychologyMen = 0.0;
    let updatedPsychologyWomen = 0.0;
    let updatedPsychologyPopulation = 0.0;
    let errorMsg = "";
    let correctMsg = "";
    onMount(getpsychologyStat);
    async function getpsychologyStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_PSYCHOLOGY_STATS + "/" + params.country + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            psychologyStat = json;
            updatedCountry = psychologyStat.country;
            updatedYear = psychologyStat.year;
            updatedPsychologyMen = psychologyStat["psychology_men"];
            updatedPsychologyWomen = psychologyStat["psychology_women"];
            updatedPsychologyPopulation =
                psychologyStat["psychology_population"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
    async function updatepsychologyStat() {
        console.log("Updating data..." + params.country + " " + params.year);
        const res = await fetch(
            API_PSYCHOLOGY_STATS + "/" + params.country + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    country: params.country,
                    year: parseInt(params.year),
                    psychology_men: updatedPsychologyMen,
                    psychology_women: updatedPsychologyWomen,
                    psychology_population: updatedPsychologyPopulation,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato con país: ${params.country} y año: ${params.year} ha sido actualizado correctamente.`;
                getpsychologyStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
    }
</script>

<main>
    <h2>Editar dato</h2>
    <div id="update">
        <Table bordered style="text-align: center;">
            <thead
                style="background:linear-gradient(90deg, rgba(233,233,246,1) 0%, rgba(56,216,217,1) 40%, rgba(0,61,255,1) 100%);"
            >
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Media de Hombres que acuden al Psicólogo</th>
                    <th>Media de Mujeres que acuden al Psicólogo</th>
                    <th>Media de Población que acuden al Psicólogo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedPsychologyMen}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedPsychologyWomen}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            bind:value={updatedPsychologyPopulation}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updatepsychologyStat()}
                        >
                            Actualizar
                        </Button></td
                    >
                </tr>
            </tbody>
        </Table>
        <Button color="info" on:click={pop}>Volver</Button>
    </div>

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
    h2 {
        text-align: center;
        margin-top: 2%;
    }
    div {
        margin-top: 5%;
        margin-left: 50px;
        margin-right: 50px;
    }
</style>
