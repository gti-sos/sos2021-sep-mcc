<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
    let psychology = [];
    let newPsychology = {
        country: "",
        year: "",
        psychology_men: 0.0,
        psychology_women: 0.0,
        psychology_population: 0.0,
    };


    let countries = [];
    let years = [];

    let actualCountry = "";
    let actualYear = "";
    // Paginación
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

    let okMsg = false;
    let errorMsg = false;

    onMount(getpsychologyCountryYear);
    onMount(getpsychology);

    async function getpsychologyCountryYear() {
        const res = await fetch("/api/v2/psychology-stats");
        if (res.ok) {
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));

            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }
    async function getpsychology() {
        console.log("Fetching psychology_stats...");
        const res = await fetch(
            "/api/v2/psychology-stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v2/psychology-stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            psychology = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }

    async function insertpsychology() {
        console.log(
            "Insertando psychology_stats..." + JSON.stringify(newPsychology)
        );
        if (
            isNaN(newPsychology.year) ||
            isNaN(newPsychology.psychology_men) ||
            isNaN(newPsychology.psychology_women) ||
            isNaN(newPsychology.psychology_population) ||
            newPsychology.country === "" ||
            newPsychology.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v2/psychology-stats", {
                method: "POST",
                body: JSON.stringify(newPsychology),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getpsychology();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                } else {
                    okMsg = false;
                    errorMsg =
                        "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
        }
    }

    async function deletepsychology(country, year) {
        const res = await fetch(
            "/api/v2/psychology-stats/" + country + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getpsychology();
            getpsychologyCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }
    async function deletepsychologyData() {
        const res = await fetch("/api/v2/psychology-stats", {
            method: "DELETE",
        }).then(function (res) {
            getpsychology();
            getpsychologyCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }

    async function loadInitialDatapsychology() {
        const res = await fetch(
            "/api/v2/psychology-stats/loadInitialData"
        ).then(function (res) {
            getpsychology();
        });
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }
    // Búsqueda
    async function searchpsychology(country, year) {
        var url = "/api/v2/psychology-stats";
        if (country != "" && year != "") {
            url = url + "?year=" + year + "&country=" + country;
        } else if (country != "" && year == "") {
            url = url + "?country=" + country;
        } else if (country == "" && year != "") {
            url = url + "?year=" + year;
        }
        const res = await fetch(url);
        if (res.ok) {
            const json = await res.json();
            psychology = json;
            if (psychology.length > 0) {
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            } else {
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } else {
            console.log("ERROR");
        }
    }
    async function addOffSet(inc) {
        offset += inc;
        actualPage += inc;
        getpsychology();
    }
</script>

<main>
    {#await psychology}
        Loading psychology stats...
    {:then psychology}
        <div class="col">
            <div class="row justify-content-evenly">
                <div class="col-4">
                    <FormGroup>
                        <Label for="selectCountry"
                            ><b>Búsqueda por país </b></Label
                        >
                        <Input
                            name="selectCountry"
                            id="selectCountry"
                            bind:value={actualCountry}
                        >
                            {#each countries as country}
                                <option>{country}</option>
                            {/each}
                            <option>-</option>
                        </Input>
                    </FormGroup>
                </div>
                <div class="col-4">
                    <FormGroup>
                        <Label for="selectYear"><b>Búsqueda por año</b></Label>
                        <Input
                            name="selectYear"
                            id="selectYear"
                            bind:value={actualYear}
                        >
                            {#each years as year}
                                <option>{year}</option>
                            {/each}
                            <option>-</option>
                        </Input>
                    </FormGroup>
                </div>
                <div style="text-align:center; width:100px; ">
                    <Button
                        outline
                        style="font-size: 16px;border-radius: 4px;background-color: primary; height:50px;"
                        color="primary"
                        on:click={searchpsychology(actualCountry, actualYear)}
                        class="button-search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                            />
                        </svg>
                        Buscar
                    </Button>
                </div>
            </div>
        </div>

        <Table bordered>
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
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td>
                        <Input
                            id="country"
                            type="text"
                            placeholder="Introduzca un país"
                            bind:value={newPsychology.country}
                        /></td
                    >
                    <td>
                        <Input
                            id="year"
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newPsychology.year}
                        /></td
                    >
                    <td>
                        <Input
                            id="psychology_men"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newPsychology.psychology_men}
                        />
                    </td>
                    <td>
                        <Input
                            id="psychology_women"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newPsychology.psychology_women}
                        /></td
                    >
                    <td>
                        <Input
                            id="psychology_population"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newPsychology.psychology_population}
                        /></td
                    >
                    <td>
                        <Button
                            id="addPsychology"
                            outline
                            color="btn btn-primary"
                            on:click={insertpsychology}
                        >
                            Insertar
                        </Button>
                    </td>
                </tr>
                {#each psychology as psychologyStat}
                    <tr>
                        <td>
                            <a
                                href="#/psychology-stats/{psychologyStat.country}/{psychologyStat.year}"
                            >
                                {psychologyStat.country}
                            </a>
                        </td>
                        <td> {psychologyStat.year} </td>
                        <td> {psychologyStat.psychology_men} </td>
                        <td> {psychologyStat.psychology_women} </td>
                        <td> {psychologyStat.psychology_population} </td>
                        <td>
                            <Button
                                outline
                                color="danger"
                                on:click={deletepsychology(
                                    psychologyStat.country,
                                    psychologyStat.year
                                )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/psychology-stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/psychology-stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/psychology-stats"
                >{actualPage}</PaginationLink
            >
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink
                    href="#/psychology-stats"
                    on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/psychology-stats"
                on:click={() => addOffSet(1)}
            />
        </PaginationItem>
    </Pagination>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">ÉXITO: {okMsg}</p>
    {/if}

    <Button
        style="font-size: 16px;border-radius: 4px;background-color:info;"
        outline
        color="btn btn-info"
        on:click={pop}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-return-left"
            viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
        </svg>
        Atrás
    </Button>

    <Button
        style="font-size: 16px;border-radius: 4px;background-color: #8C17BD;"
        outline
        color="btn btn-primary"
        on:click={loadInitialDatapsychology}>Cargar datos iniciales</Button
    >
    <Button
        style="font-size: 16px;border-radius: 4px;background-color: danger;"
        outline
        on:click={deletepsychologyData}
        color="btn btn-danger"
    >
        Borrar todo

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash2-fill"
            viewBox="0 0 16 16"
        >
            <path
                d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"
            />
        </svg>
    </Button>
</main>
