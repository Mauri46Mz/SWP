<script>
    import {ALERT_TYPE, alertType, alertMessage} from '$lib/store';

    $: bgClass = () => {
        if($alertType === ALERT_TYPE.BASIC) { 
            return 'bg-gray-100';
        } else if ($alertType === ALERT_TYPE.DANGER) { 
            return 'bg-red-100';
        } else if ($alertType === ALERT_TYPE.INFO) { 
            return 'bg-yellow-100';
        } else if ($alertType === ALERT_TYPE.SUCCSESS) { 
            return 'bg-green-100';
        } else  { 
            return 'bg-transparent';
        } 
    }
       
    
</script>

<div class="h-10 my-6 flex justify-center">
{#if $alertMessage}
    <span class={`text-gray-900 text-center rounded-md p-4 pb-10 ${bgClass()}`}>{$alertMessage}</span>
{/if}
</div>