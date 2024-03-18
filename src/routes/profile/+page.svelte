<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/supabase'
    import { ALERT_TYPE, displayAlert, session } from '$lib/store'
    import Avatar from '$lib/Avatar.svelte';
	import Alert from '$lib/Alert.svelte';





    let loading = false
    let username: string | null = null
    let website: string | null = null
    let avatarUrl: string | null = null

    onMount(() => {
        getProfile()
        if($session){
        return null
    }else{
        displayAlert('You need to be logged in to access this page',ALERT_TYPE.INFO)
    }
    })

    async function getProfile(){
        try {
            loading = true
            const { user } = $session

            const { data, error, status } = await supabase
                .from('profiles')
                .select('username, website, avatar_url')
                .eq('id', user.id)
                .single()

            if (error && status !== 406) throw error

            if (data) {
                username = data.username
                website = data.website
                avatarUrl = data.avatar_url
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        } finally {
            loading = false
        }
    }

    async function updateProfile (){
        try {
            loading = true
            const { user } = $session

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        } finally {
            loading = false
        }
    }
    
    function loginAlert(){
        displayAlert('You need to be logged in to access this page', ALERT_TYPE.INFO)
    }
    
</script>

<div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Profile</h1>
</div>

{#if $session}
<form on:submit|preventDefault="{updateProfile}" class="flex flex-col max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 my-8">
  <div class="flex justify-center mb-8">
    <Avatar size={150} bind:url={avatarUrl} on:upload={updateProfile}/>
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
    <div class="text-gray-900">{ $session.user.email }</div>
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Name:</label>
    <input id="username" type="text" class="inputField" bind:value="{username}" />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="website">Website:</label>
    <input id="website" type="text" class="inputField" bind:value="{website}" />
  </div>
  <div class="mb-4">
    <button type="submit" class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed">
      {loading ? 'Saving ...' : 'Update profile'}
    </button>
  </div>
  <div>
    <button type="button" class="text-blue-500 hover:text-blue-700 underline" on:click={() => supabase.auth.signOut()} on:click={loginAlert}> Sign Out </button>
  </div>
</form>
{:else}
<div>
<Alert />
</div>
{/if}

