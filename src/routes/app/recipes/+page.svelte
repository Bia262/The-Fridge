<script lang="ts">
  import type { PageData as BasePageData } from './$types';
  
  interface PageData extends BasePageData {
    recipes: Recipe[];
    ingredients: Ingredient[];
  }
  
  export let data: PageData;
  
  // Define Recipe type locally based on the schema
  type Recipe = {
    id: string;
    name: string;
    description: string | null;
    instructions: string | null;
    servings: number;
    prepTime: number;
    cookTime: number;
    images: string[] | null;
    difficulty: 'easy' | 'medium' | 'hard';
    createdBy: string;
    ingredients: Array<{
      id: string;
      name: string;
      amount: string | null;
      unit: string | null;
    } | null>;
  };

  // Define ingredient type
  type Ingredient = {
    id: string;
    name: string;
    description: string | null;
  };
  
  let selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all';
  let searchQuery = '';
  let showCreateModal = false;
  
  // Form data for new recipe
  let newRecipe = {
    name: '',
    description: '',
    instructions: '',
    servings: 2,
    prepTime: 15,
    cookTime: 30,
    images: [] as string[],
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    ingredients: [] as {id: string, name: string, amount: string, unit: string}[]
  };
  
  // For ingredient management
  let ingredientInput = '';
  let ingredientAmount = '';
  let ingredientUnit = '';
  let availableIngredients: Ingredient[] = data.ingredients;
  let filteredIngredients: Ingredient[] = [];

  // Recipes from server
  let recipes: Recipe[] = data.recipes;
  
  $: filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });
  
  function filterIngredients() {
    if (ingredientInput.trim() === '') {
      filteredIngredients = [];
    } else {
      filteredIngredients = availableIngredients.filter(
        ing => ing.name.toLowerCase().includes(ingredientInput.toLowerCase())
      ).slice(0, 5);
    }
  }

  function addIngredientToRecipe() {
    // Find ingredient in available ingredients
    const ingredient = availableIngredients.find(
      ing => ing.name.toLowerCase() === ingredientInput.toLowerCase()
    );
    
    if (ingredient && !newRecipe.ingredients.some(i => i.id === ingredient.id)) {
      newRecipe.ingredients = [
        ...newRecipe.ingredients, 
        {
          id: ingredient.id,
          name: ingredient.name,
          amount: ingredientAmount,
          unit: ingredientUnit
        }
      ];
      
      // Reset the input fields
      ingredientInput = '';
      ingredientAmount = '';
      ingredientUnit = '';
      filteredIngredients = [];
    }
  }

  function removeIngredient(ingredientId: string) {
    newRecipe.ingredients = newRecipe.ingredients.filter(i => i.id !== ingredientId);
  }
  
  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    
    const fileList = Array.from(input.files);
    
    // Convert files to base64 for preview (in real app, you'd upload to server)
    fileList.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          newRecipe.images = [...(newRecipe.images || []), result];
        }
      };
      reader.readAsDataURL(file);
    });
  }
  
  function removeImage(index: number) {
    newRecipe.images = newRecipe.images.filter((_, i) => i !== index);
  }
  
  async function submitRecipe() {
    const formData = new FormData();
    formData.append('name', newRecipe.name);
    formData.append('description', newRecipe.description);
    formData.append('instructions', newRecipe.instructions);
    formData.append('servings', newRecipe.servings.toString());
    formData.append('prepTime', newRecipe.prepTime.toString());
    formData.append('cookTime', newRecipe.cookTime.toString());
    formData.append('difficulty', newRecipe.difficulty);
    formData.append('ingredients', JSON.stringify(newRecipe.ingredients));
    
    const response = await fetch('?/create', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Failed to create recipe');
      return;
    }
    
    const result = await response.json();
    
    // Add new recipe to the list
    recipes = [result.recipe, ...recipes];
    
    // Reset form
    newRecipe = {
      name: '',
      description: '',
      instructions: '',
      servings: 2,
      prepTime: 15,
      cookTime: 30,
      images: [],
      difficulty: 'medium',
      ingredients: []
    };
    
    closeCreateModal();
  }
  
  async function deleteRecipe(recipeId: string) {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    
    const formData = new FormData();
    formData.append('recipeId', recipeId);
    
    const response = await fetch('?/delete', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Failed to delete recipe');
      return;
    }
    
    // Remove recipe from the list
    recipes = recipes.filter(r => r.id !== recipeId);
  }
  
  function openCreateModal() {
    showCreateModal = true;
  }
  
  function closeCreateModal() {
    showCreateModal = false;
    
    // Reset form state
    newRecipe = {
      name: '',
      description: '',
      instructions: '',
      servings: 2,
      prepTime: 15,
      cookTime: 30,
      images: [],
      difficulty: 'medium',
      ingredients: []
    };
    ingredientInput = '';
    ingredientAmount = '';
    ingredientUnit = '';
    filteredIngredients = [];
  }
</script>

<div class="min-h-screen bg-pink-50/30 p-8">
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        My Recipes <span class="text-pink-400">📖</span>
      </h1>
      <button 
        on:click={openCreateModal}
        class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Create Recipe
      </button>
    </div>
    
    <!-- Search and Filter Bar -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1">
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Search recipes..." 
          class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400"
        >
        <svg class="w-5 h-5 absolute right-4 top-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <select 
        bind:value={selectedDifficulty}
        class="px-6 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <!-- Recipe Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredRecipes as recipe}
        <div class="bg-white rounded-2xl shadow-xl border-2 border-pink-100 overflow-hidden hover:border-pink-200 transition-all duration-200">
          <div class="h-48 bg-gradient-to-r from-pink-100 to-pink-200"></div>
          <div class="p-6">
            <h3 class="font-bold text-gray-800 mb-2">{recipe.name}</h3>
            <p class="text-sm text-pink-400 mb-3">{recipe.description}</p>
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium capitalize">{recipe.difficulty}</span>
                <span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <button class="text-pink-400 hover:text-pink-600 transition-colors" aria-label="View recipe details">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Create Recipe Modal -->
{#if showCreateModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">Create New Recipe</h2>
          <button 
            on:click={closeCreateModal}
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <form class="space-y-6" on:submit|preventDefault={submitRecipe}>
          <!-- Basic Info -->
          <div class="space-y-4">
            <div>
              <label for="recipe-name" class="block text-sm font-medium text-gray-700 mb-1">Recipe Name <span class="text-red-500">*</span></label>
              <input 
                type="text" 
                id="recipe-name" 
                bind:value={newRecipe.name}
                required
                placeholder="Enter recipe name" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                id="recipe-description" 
                bind:value={newRecipe.description}
                placeholder="Brief description of your recipe" 
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              ></textarea>
            </div>
          </div>
          
          <!-- Recipe Details -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="recipe-servings" class="block text-sm font-medium text-gray-700 mb-1">Servings <span class="text-red-500">*</span></label>
              <input 
                type="number" 
                id="recipe-servings" 
                bind:value={newRecipe.servings}
                min="1"
                required
                placeholder="4" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-prep-time" class="block text-sm font-medium text-gray-700 mb-1">Prep Time (min) <span class="text-red-500">*</span></label>
              <input 
                type="number" 
                id="recipe-prep-time" 
                bind:value={newRecipe.prepTime}
                min="0"
                required
                placeholder="15" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-cook-time" class="block text-sm font-medium text-gray-700 mb-1">Cook Time (min) <span class="text-red-500">*</span></label>
              <input 
                type="number" 
                id="recipe-cook-time" 
                bind:value={newRecipe.cookTime}
                min="0"
                required
                placeholder="30" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
          </div>
          
          <!-- Difficulty Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Difficulty Level <span class="text-red-500">*</span></label>
            <div class="flex space-x-4">
              {#each ['easy', 'medium', 'hard'] as level}
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="difficulty" 
                    bind:group={newRecipe.difficulty} 
                    value={level}
                    class="sr-only"
                  >
                  <div class={`px-4 py-2 rounded-full border-2 ${newRecipe.difficulty === level ? 'bg-pink-100 border-pink-300 text-pink-700' : 'border-gray-200 text-gray-500'}`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </div>
                </label>
              {/each}
            </div>
          </div>
          
          <!-- Instructions -->
          <div>
            <label for="recipe-instructions" class="block text-sm font-medium text-gray-700 mb-1">Instructions <span class="text-red-500">*</span></label>
            <textarea 
              id="recipe-instructions" 
              bind:value={newRecipe.instructions}
              placeholder="Enter step by step instructions (one step per line)" 
              required
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            ></textarea>
          </div>
          
          <!-- Ingredients Section -->
          <div class="space-y-4">
            <h3 class="font-medium text-gray-800">Recipe Ingredients <span class="text-red-500">*</span></h3>
            
            <!-- Ingredients List -->
            {#if newRecipe.ingredients.length > 0}
              <div class="bg-pink-50 p-4 rounded-lg mb-4">
                <h4 class="font-medium text-pink-700 mb-2">Added Ingredients:</h4>
                <ul class="space-y-2">
                  {#each newRecipe.ingredients as ingredient}
                    <li class="flex items-center justify-between bg-white p-2 rounded-lg border border-pink-200">
                      <span>{ingredient.amount} {ingredient.unit} {ingredient.name}</span>
                      <button 
                        type="button"
                        on:click={() => removeIngredient(ingredient.id)}
                        class="text-pink-500 hover:text-pink-700"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            
            <!-- Add Ingredient Form -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div class="md:col-span-2 relative">
                <input 
                  type="text" 
                  placeholder="Search ingredient..." 
                  bind:value={ingredientInput}
                  on:input={filterIngredients}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                >
                {#if filteredIngredients.length > 0}
                  <div class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto">
                    {#each filteredIngredients as ingredient}
                      <button 
                        type="button"
                        on:click={() => {
                          ingredientInput = ingredient.name;
                          filteredIngredients = [];
                        }}
                        class="w-full px-4 py-2 text-left hover:bg-pink-50 focus:bg-pink-50 focus:outline-none"
                      >
                        {ingredient.name}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
              
              <input 
                type="text" 
                placeholder="Amount" 
                bind:value={ingredientAmount}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
              
              <input 
                type="text" 
                placeholder="Unit" 
                bind:value={ingredientUnit}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
              
              <button 
                type="button"
                on:click={addIngredientToRecipe}
                class="bg-pink-100 text-pink-700 py-2 px-4 rounded-lg hover:bg-pink-200 transition-colors mt-2 md:mt-0 md:col-span-4"
              >
                Add Ingredient
              </button>
            </div>
          </div>
          
          <!-- Image Upload (Optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recipe Images (Optional)</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex justify-center text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500">
                    <span>Upload images</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      accept="image/*"
                      multiple
                      on:change={handleFileUpload}
                      class="sr-only"
                    >
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            
            <!-- Image Previews -->
            {#if newRecipe.images && newRecipe.images.length > 0}
              <div class="mt-4 grid grid-cols-3 gap-4">
                {#each newRecipe.images as image, index}
                  <div class="relative">
                    <img src={image} alt="Recipe" class="h-24 w-full object-cover rounded-lg">
                    <button 
                      type="button"
                      on:click={() => removeImage(index)}
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
          
          <!-- Submit -->
          <div class="flex justify-end space-x-3 pt-2 border-t border-gray-200">
            <button
              type="button"
              on:click={closeCreateModal}
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if} 