<script lang="ts">
  import { Button, Modal, Carousel } from 'flowbite-svelte';

  // Props
  export let show = false;
  export let recipe: {
    id: string;
    name: string;
    description: string;
    instructions: string;
    ingredients: string[];
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
    return hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
  }

  function parseInstructions(instructions: string) {
    if (!instructions) return [];
    let steps = instructions.split(/\n+/);
    if (steps.length === 1) {
      steps = instructions.split(/\d+\.\s+/);
      if (steps[0].trim() === '') steps.shift();
    }
    return steps.filter(step => step.trim() !== '');
  }

  $: instructionSteps = parseInstructions(recipe.instructions);

  function handleClose() {
    show = false;
  }
</script>

<Modal bind:open={show} size="xl" autoclose class="w-full">
  <div class="p-0 rounded-lg overflow-hidden bg-yellow-50/20">
    <!-- Carousel or Header -->
    {#if recipe.images?.length}
      <div class="h-64 mb-4">
        <Carousel
          images={carouselImages}
          loop={true}
          duration={3000}
          class="h-full rounded-t-lg"
        />
      </div>
    {:else}
      <div class="bg-gradient-to-r from-pink-400 to-yellow-300 h-48 rounded-t-lg flex items-end p-6">
        <h1 class="text-3xl font-bold text-white">{recipe.name}</h1>
      </div>
    {/if}

    <!-- Content -->
    <div class="p-6 bg-white rounded-b-lg">
      {#if recipe.images?.length}
        <h1 class="text-2xl font-bold text-yellow-800 mb-4">{recipe.name}</h1>
      {/if}

      {#if recipe.description}
        <p class="text-gray-700 mb-6 bg-yellow-100/50 p-4 rounded-lg border border-yellow-200">{recipe.description}</p>
      {/if}

      <!-- Time + Servings Info -->
      <div class="flex gap-8 mb-6 justify-center text-center border-y border-yellow-200 py-4 bg-yellow-100/30 rounded-lg">
        <div class="flex flex-col items-center">
          <span class="text-sm text-yellow-600 font-medium">Prep Time</span>
          <span class="font-medium text-yellow-800">{formatTime(recipe.prepTime)}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm text-yellow-600 font-medium">Cook Time</span>
          <span class="font-medium text-yellow-800">{formatTime(recipe.cookTime)}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm text-yellow-600 font-medium">Total Time</span>
          <span class="font-medium text-yellow-800">{formatTime(recipe.prepTime + recipe.cookTime)}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-sm text-yellow-600 font-medium">Servings</span>
          <span class="font-medium text-yellow-800">{recipe.servings}</span>
        </div>
      </div>

      <!-- Ingredients Section -->
      {#if recipe.ingredients && recipe.ingredients.length > 0}
        <div class="mb-6">
          <h2 class="text-xl font-bold text-pink-700 mb-3 flex items-center">
            <span class="bg-yellow-200 text-yellow-700 p-1 rounded-full mr-2">🧂</span> Ingredients
          </h2>
          <ul class="space-y-2 list-disc list-inside text-pink-900 bg-pink-50/50 p-4 rounded-lg border border-pink-200">
            {#each recipe.ingredients as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Instructions -->
      {#if instructionSteps.length > 0}
        <div class="mb-6">
          <h2 class="text-xl font-bold text-pink-700 mb-3 flex items-center">
            <span class="bg-yellow-200 text-yellow-700 p-1 rounded-full mr-2">🍳</span> Instructions
          </h2>
          <ol class="space-y-3">
            {#each instructionSteps as step, i}
              <li class="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-200 shadow-sm">
                <div class="flex items-start gap-3">
                  <div class="bg-gradient-to-r from-pink-400 to-yellow-300 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    {i + 1}
                  </div>
                  <p class="text-yellow-900">{step}</p>
                </div>
              </li>
            {/each}
          </ol>
        </div>
      {/if}

      <!-- Action Buttons -->
      <div class="flex justify-between mt-8">
        <Button
          color="light"
          class="border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-100 font-medium"
        >
          💾 Save Recipe
        </Button>

        <Button
          class="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 shadow-md"
          on:click={handleClose}
        >
          Close
        </Button>
      </div>
    </div>
  </div>
</Modal>
