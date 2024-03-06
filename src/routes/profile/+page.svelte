<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/supabase'
    import { session } from '$lib/store'

    let loading = false
    let username: string | null = null
    let website: string | null = null
    let avatarUrl: string | null = null

    onMount(() => {
        getProfile()
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
                console.error(error.message)
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
</script>
<style>
      .alert {
    width: 80%;
    max-width: 400px;
    margin: 0 auto; 
    padding: 20px;
    border-radius: 10px; 
    text-align: center; 
    background-color: #fff3cd; 
    border: 1px solid #ffeeba; 
  }

  .alert svg {
    vertical-align: middle;
    margin-right: 10px; 
  }
</style>

{#if $session}
<form on:submit|preventDefault="{updateProfile}" class="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 my-8">
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
        <button type="submit" class="button primary block" disabled="{loading}">
            {loading ? 'Saving ...' : 'Update profile'}
        </button>
    </div>
    <div>
        <button type="button" class="button block" on:click={() => supabase.auth.signOut()}> Sign Out </button>
    </div>
</form>
{:else}
<div role="alert" class="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Seems like you are not logged in!</span>
  </div>
{/if}
