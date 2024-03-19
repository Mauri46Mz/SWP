<script lang="js">
    import { supabase } from '$lib/supabase';
    import { ALERT_TYPE, displayAlert, session } from '$lib/store';
	  import Alert from './Alert.svelte';

    let loading = false;
    let email = '';
  
    const handleLogin = async () => {
      try {
        loading = true;
  
        const { error } = await supabase.auth.signInWithOtp({ email });
  
        if (error) throw error;
        
        displayAlert('Check your email for the login link', ALERT_TYPE.SUCCSESS)
  
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);          
          displayAlert(error.message, ALERT_TYPE.DANGER);
        }
      } finally {
        loading = false;
      }
    };
  </script>
  
  <style>
    .form-container {
      max-width: 400px;
      margin: 0 auto;
    }
  </style>

  <div class="">
    <span><Alert /></span>
</div>

  <div class="flex justify-center items-center h-screen">
    <div class="form-container bg-white p-8 rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Supabase + Svelte</h1>
        <p class="text-gray-600 mb-6">Sign in via magic link with your email below</p>
      </div>
  
      <form on:submit|preventDefault="{handleLogin}">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">What is your e-mail?</label>
          <input
            id="email"
            type="email"
            class="inputField mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Type here"
            bind:value="{email}"
          />
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="button px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled="{loading}"
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </form>
    </div>
  
   
  </div>
  