<script>
    import {supabase} from '$lib/supabase';

    let promise = supabase.from('countries').select();
</script>

<h1>Aufgaben</h1>
<ul>
    <li>anstatt eines Js-Objekts, das auf der Seite dargestellt wird, möchte ich eine Liste aller Länder</li>
    <li>integriere einen loading spinner oÄ von daisyUI </li>
    <li>gib die Vercel URL zu deinem Projekt via Aufgabe in Teams ab</li>
</ul>

{#await promise}
    <div>Loading...</div> 
{:then result} 
    <div>{JSON.stringify(result)}</div>
{/await}