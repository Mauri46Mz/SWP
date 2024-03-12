<script lang="js">
  import { supabase } from '$lib/supabase'
  import { session } from '$lib/store'
  
            
            let loading = false
            let email = ''
            let showAlert =false;
            
            const handleLogin = async () => {
                try {
                    loading = true
                    const { error } = await supabase.auth.signInWithOtp({ email })
                    if (error) throw error
                    showAlert = true
                    
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

    .form-container {
        max-width: 400px; 
        margin: 0 auto;
    }

    .alert {
        width: 80%;
        max-width: 400px; 
        margin: 0 auto; 
        padding: 20px;
        border-radius: 10px; 
        text-align: center; 
        background-color: #D1FAE5; 
        border: 1px solid #10B981;
    }

    .alert svg {
        vertical-align: middle;
        margin-right: 10px;
    }
</style>

{#if showAlert = true}
<div role="alert" class="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Check your e-mail for a login link!</span>
</div>
{/if}

<div class="flex justify-center items-center h-screen">
    <div class="form-container bg-white p-8 rounded-lg shadow-md">
    
        
        <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">Supabase + Svelte</h1>
            <p class="text-gray-600 mb-6">Sign in via magic link with your email below</p>
        </div>
        
        <form on:submit|preventDefault="{handleLogin}">
            <div class="mb-4">
                <label for="email" class="block text-gray-700">What is your e-mail?</label>
                <input id="email" type="email" class="inputField mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Type here" bind:value="{email}" />
            </div>
            <div class="text-center">
                <button type="submit" class="button px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" disabled="{loading}">
                    <span>{loading ? 'Loading' : 'Send magic link'}</span>
                </button>
            </div>
        </form>
    </div>
</div>


