<script>
    import {supabase} from '$lib/supabase';

    let promise = supabase.from('countries').select();
</script>


{#await promise}
<center><span class="loading loading-spinner loading-lg"></span></center>
{:then result}
<center><h1>Country List</h1></center>
    <ul>
        {#each result.data as country}
            <li>{country.name}</li>
        {/each}
    </ul>
{/await}