<script lang="ts">
  import { Button, Modal, Carousel } from 'flowbite-svelte';

<!-- Recipe Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredRecipes as recipe}
        <div 
          on:click={() => openRecipeModal(recipe)}
          class="bg-white rounded-2xl shadow-xl border-2 border-pink-100 overflow-hidden hover:border-pink-200 transition-all duration-200 cursor-pointer"
        >
          {#if recipe.images && recipe.images[0]}
            <img src={recipe.images[0]} alt={recipe.name} class="w-full h-48 object-cover" />
          {:else}
            <div class="h-48 bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center">
              <span class="text-pink-400">No image available</span>
            </div>
          {/if}
          <div class="p-6">
            <h3 class="font-bold text-gray-800 mb-2">{recipe.name}</h3>
            <p class="text-sm text-pink-400 mb-3">{recipe.description}</p>
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium capitalize">{recipe.difficulty}</span>
                <span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">{recipe.prepTime + recipe.cookTime} min</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Recipe Details Modal -->
{#if showRecipeModal && selectedRecipe}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
    on:click|self={closeRecipeModal}
  >
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">{selectedRecipe.name}</h2>
          <button on:click={closeRecipeModal} class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Image -->
        {#if selectedRecipe.images && selectedRecipe.images[0]}
          <img src={selectedRecipe.images[0]} alt={selectedRecipe.name} class="w-full h-64 object-cover rounded-lg" />
        {:else}
          <div class="h-64 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
            <span class="text-pink-400">No image available</span>
          </div>
        {/if}

        <!-- Description -->
        <p class="text-gray-700">{selectedRecipe.description}</p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-pink-50 rounded-lg p-3">
            <p class="text-sm text-pink-500">Prep Time</p>
            <p class="font-bold">{selectedRecipe.prepTime} min</p>
          </div>
          <div class="bg-pink-50 rounded-lg p-3">
            <p class="text-sm text-pink-500">Cook Time</p>
            <p class="font-bold">{selectedRecipe.cookTime} min</p>
          </div>
          <div class="bg-pink-50 rounded-lg p-3">
            <p class="text-sm text-pink-500">Servings</p>
            <p class="font-bold">{selectedRecipe.servings}</p>
          </div>
        </div>

        <!-- Ingredients -->
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Ingredients</h3>
          <ul class="space-y-2">
            {#if selectedRecipe.ingredients}
              {#each selectedRecipe.ingredients as ingredient}
                <li class="flex items-start">
                  <span class="inline-block w-2 h-2 mt-2 mr-2 bg-pink-400 rounded-full"></span>
                  <span class="text-gray-700">{ingredient.quantity} {ingredient.name}</span>
                </li>
              {/each}
            {:else}
              <li class="text-gray-500">No ingredients listed</li>
            {/if}
          </ul>
        </div>

        <!-- Instructions -->
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Instructions</h3>
          {#if selectedRecipe.instructions}
            <div class="prose max-w-none text-gray-700 whitespace-pre-line">
              {selectedRecipe.instructions}
            </div>
          {:else}
            <p class="text-gray-500">No instructions provided</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
