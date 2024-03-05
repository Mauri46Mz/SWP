<script>
    import { supabase } from '$lib/supabase';

    let promise = supabase.from('countries').select();
</script>

{#await promise}
    <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
{:then result}
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Country List</h1>
    </div>
        <ul>
            {#each result.data as country}
                <li>{country.name}</li>
            {/each}
        </ul>
    
{/await}
