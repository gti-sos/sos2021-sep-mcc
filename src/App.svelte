<script lang="ts">
	import Router from 'svelte-spa-router';
	import Home from "./Home.svelte";
	import info from "./Info.svelte";
	import psychology_stats from "./front/psychology_stats_API/App.svelte";
	import NotFound from "./NotFound.svelte";

	const routes = {
		"/": Home,
		"/info": info,
		"/psychology-stats": psychology_stats,
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