<script>
    import { supabase } from '$lib/supabase';

    let promise = supabase.from('countries').select();
    let names = supabase.from('rabbits').select();

    let name ="";

    async function sendName() {
        const response = fetch("api/sendName", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });

        const data = await (await response).text();
        console.log(data);
        name="";
        names = supabase.from('rabbits').select();
    }
</script>

<div>
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">APIs</h1>
    </div>
    
    <div>
        <ul class="list-inside" style="list-style-type: disc; padding-left: 1em;">
            <li><a href="/api/hello?name=Mauri" class="underline hover:no-underline">Link zu API mit Query-Parameter</a></li>
            <li><a href="/api/hello/Mauri" class="underline hover:no-underline">Link zu API mit Route-Parameter</a></li>
        </ul>
    </div>
</div>

<br><hr><br>

 <form>
     <div class="text-left">
          <h2 class="text-2xl font-bold mb-4">All my rabbits</h2>
      </div>
      <input type="text" bind:value={name} /><br /><button class="btn" on:click={sendName}>Add rabbit!</button>
</form>

<br>

<h2 class="text-2xl font-bold mb-4">Rabbit names</h2>
{#await names}
    <div class="flex justify-center items-center h-screen">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
{:then result}
    <ul class="list-inside" style="list-style-type: disc; padding-left: 1em;">
        {#each result.data as rabbit (rabbit.id)}
            <li>{rabbit.name}</li>
        {/each}
    </ul>
{/await}

<br><hr><br>

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
