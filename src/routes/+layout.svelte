<script>
	import {onMount} from 'svelte';
	import {supabase} from '$lib/supabase';
	import '../app.css';
	import  {ALERT_TYPE, displayAlert, session, theme} from "$lib/store.js"
	onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      $session = data.session
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      $session = _session
    })
  })

  function defaultAlert() {
	displayAlert("", ALERT_TYPE.NONE);
  }
</script>

<div data-theme={$theme} class="min-h-screen p-3">
	<nav class="flex items-center gap-8 m-4">
		<a href="/" class="text-center" on:click={defaultAlert}>Home</a>|
		<a href="/login" class="text-center" on:click={defaultAlert}>Login</a>|
		<a href="/profile" class="text-center" on:click={defaultAlert}>Profile</a>
	</nav>

	<select bind:value={$theme} class="fixed top-0 right-0">
		<option value="light">light</option>
		<option value="dark">dark</option>
		<option value="retro">retro</option>
		<option value="cyberpunk">cyberpunk</option>
	</select>

	<slot />
</div>
