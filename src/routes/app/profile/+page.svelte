<script lang="ts">
  // Import the data from the server
  export let data;

  import { Button } from 'flowbite-svelte';
  import { ArrowRightOutline } from 'flowbite-svelte-icons';
  
  // Extract user from data
   // Extract user from data
   const { user, savedRecipesCount, recipesUploadedCount, itemsInFridgeCount } = data;
 
</script>

<div class="min-h-screen bg-pink-50/30 p-8">
  <div class="container mx-auto max-w-2xl">
    <div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100">
      <!-- Profile Header -->
      <div class="flex items-center space-x-4 mb-8">
        <div class="w-20 h-20 bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
          <svg class="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{user?.name || 'User'} ✨</h1>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white border-2 border-white-100 p-4 rounded-xl text-center hover:border-light pink-200 transition-all duration-200">
          <div class="text-2xl font-bold text-gray-800">{recipesUploadedCount}</div>
          <div class="text-sm text-pink-400"> <Button href="/app/recipes" size="xl" class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
            Recipes
            <ArrowRightOutline class="w-5 h-5 ml-2" />
          </Button></div>
        </div>
      
        <div class="bg-white border-2 border-white-100 p-4 rounded-xl text-center hover:border-light pink-200 transition-all duration-200">
          <div class="text-2xl font-bold text-gray-800">{itemsInFridgeCount}</div>
          <div class="text-sm text-pink-400"> <Button href="/app" size="xl" class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
            Items
            <ArrowRightOutline class="w-5 h-5 ml-2" />
          </Button>
            
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="space-y-4">
       
       
        
        <button class="w-full mt-6 bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 font-medium">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</div> 
