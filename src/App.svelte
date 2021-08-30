<script lang="ts">
	import Router from "svelte-spa-router";
	import Home from "./Home.svelte";
	import info from "./Info.svelte";
	import psychology_stats from "./front/psychology_stats_API/Psychology.svelte";
	import edit_psychology_stats from "./front/psychology_stats_API/PsychologyEdit.svelte";
	import NotFound from "./NotFound.svelte";
	import psychology_chart from "./front/psychology_stats_API/PsychologyChart.svelte";
	import Integrations from "./Integrations.svelte";
	import about from "./About.svelte";

	// Integraciones
	import Suicide from "./front/psychology_stats_API/Suicide.svelte";
	import rentals from "./front/psychology_stats_API/Rentals.svelte";
	import obesity from "./front/psychology_stats_API/Obesity.svelte";

	const routes = {
		"/": Home,
		"/info": info,
		"/psychology-stats": psychology_stats,
		"/psychology-stats/:country/:year": edit_psychology_stats,
		"/analytics": psychology_chart,
		"/integrations": Integrations,
		"/about": about,
		"/integrations/suicide": Suicide,
		"/integrations/rentals": rentals,
		"/integrations/obesity": obesity,
		"*": NotFound,

	};
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	/*h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}*/

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
