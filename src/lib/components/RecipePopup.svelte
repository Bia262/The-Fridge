<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { Button, Modal, Carousel } from 'flowbite-svelte';
  
  // Props - aligned with schema.ts
  export let show = false;
  export let recipe: {
    id: string;
    name: string;
    description: string;
    instructions: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    images: string[];
    createdBy: string;
  };
  
  // Prepare images for carousel
  $: carouselImages = recipe.images.map(url => ({
    src: url,
    alt: recipe.name
  }));

  function formatTime(minutes: number) {
    if (!minutes) return 'N/A';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
    } else {
      return `${mins}m`;
    }
  }
  
  // Parse instructions as steps (assuming they're separated by newlines or numbers)
  function parseInstructions(instructions: string) {
    if (!instructions) return [];
    
    // Split by newlines first
    let steps = instructions.split(/\n+/);
    
    // If only one long string, try to split by numbered steps
    if (steps.length === 1) {
      steps = instructions.split(/\d+\.\s+/);
      // Remove empty first item if it exists
      if (steps[0].trim() === '') steps.shift();
    }
    
    return steps.filter((step: string) => step.trim() !== '');
  }
  
  $: instructionSteps = parseInstructions(recipe.instructions);
  
  // Handle closing the modal
  function handleClose() {
    show = false;
  }
</script>

<!-- Use Flowbite Modal component -->
<Modal
  bind:open={show}
  size="xl"
  autoclose
  class="w-full"
>
  <div class="p-0 rounded-lg overflow-hidden bg-pink-50/30">
    <!-- Recipe Images Carousel -->
    {#if recipe.images && recipe.images.length > 0}
      <div class="h-64 mb-4">
        <Carousel
          images={carouselImages}
          loop={true}
          duration={3000}
          class="h-full rounded-t-lg"
        />
      </div>
    {:else}
      <div class="bg-gradient-to-r from-pink-400 to-purple-500 h-48 rounded-t-lg flex items-end p-6">
        <h1 class="text-3xl font-bold text-white">{recipe.name}</h1>
      </div>
    {/if}
    
    <!-- Recipe Content -->
    <div class="p-6 bg-white rounded-b-lg">
      <!-- Recipe Title (if has images) -->
      {#if recipe.images && recipe.images.length > 0}
        <h1 class="text-2xl font-bold text-gray-900 mb-4 text-pink-700">{recipe.name}</h1>
      {/if}
      
      <!-- Recipe Description -->
      {#if recipe.description}
        <p class="text-gray-700 mb-6 bg-pink-50/50 p-4 rounded-lg border border-pink-100">{recipe.description}</p>
      {/if}
      
      <!-- Recipe Info -->
      <div class="flex gap-8 mb-6 justify-center text-center border-y border-pink-200 py-4 bg-pink-100/30 rounded-lg">
        <div class="flex flex-col items-center">
          <span class="text-sm text-pink-600 font-medium">Prep Time</span>
          <span class="font-medium text-pink-800">{formatTime(recipe.prepTime)}</span>
        </div>
        
        <div class="flex flex-col items-center">
          <span class="text-sm text-pink-600 font-medium">Cook Time</span>
          <span class="font-medium text-pink-800">{formatTime(recipe.cookTime)}</span>
        </div>
        
        <div class="flex flex-col items-center">
          <span class="text-sm text-pink-600 font-medium">Total Time</span>
          <span class="font-medium text-pink-800">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
        </div>
        
        <div class="flex flex-col items-center">
          <span class="text-sm text-pink-600 font-medium">Servings</span>
          <span class="font-medium text-pink-800">{recipe.servings}</span>
        </div>
      </div>
      
      <!-- Recipe Instructions -->
      {#if instructionSteps.length > 0}
        <div class="mb-6">
          <h2 class="text-xl font-bold text-pink-700 mb-3 flex items-center">
            <span class="bg-pink-200 text-pink-700 p-1 rounded-full mr-2">🍳</span> Instructions
          </h2>
          <ol class="space-y-3">
            {#each instructionSteps as step, i}
              <li class="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 hover:border-pink-300 transition-all duration-200 shadow-sm">
                <div class="flex items-start gap-3">
                  <div class="bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    {i + 1}
                  </div>
                  <p class="text-pink-900">{step}</p>
                </div>
              </li>
            {/each}
          </ol>
        </div>
      {/if}
      
      <!-- Actions Buttons -->
      <div class="flex justify-between mt-8">
        <Button
          color="light"
          class="border-2 border-pink-300 text-pink-700 hover:bg-pink-100 font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          Save Recipe
        </Button>
        
        <Button
          class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md"
          on:click={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  </div>
</Modal>
