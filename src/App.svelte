<script lang="ts">
	export let name;
	import Router from 'svelte-spa-router';
	import NotFound from "./NotFound.svelte";
	import Home from "./Home.svelte";
	import psychology_stats from "./psychology_stats_API/App.svelte";
	const routes = {
		"/": Home,
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

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>