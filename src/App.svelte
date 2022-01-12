<script lang="ts">
	import { onMount } from 'svelte';
	import { MatterManager } from './Matter';
	import { InitializePixi } from './PixiApp'

	onMount(() => {
		console.log('mount');
		InitializePixi()
		MatterManager.start();
		MatterManager.startDebugRender();
	});
</script>

<div id="canvas-container">
	<main id="main">
		<!-- <h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
	</main>
	<div id="matter">
	</div>
</div>

<style>
	#canvas-container {
		display: flex;
	}
	main, #matter {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>