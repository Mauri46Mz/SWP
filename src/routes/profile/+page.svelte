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
                alert(error.message)
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
                alert(error.message)
            }
        } finally {
            loading = false
        }
    }
</script>

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
<div class="text-center text-gray-700">Seems you are not logged in!</div>
{/if}
