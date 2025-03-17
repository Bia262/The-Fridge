<script lang="ts">
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
  };
  
  let selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all';
  let searchQuery = '';
  let showCreateModal = false;
  
  // Example recipes data
  let recipes: Recipe[] = [
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
      instructions: 'Cook pasta, mix with egg and cheese mixture, add pancetta',
      servings: 4,
      prepTime: 15,
      cookTime: 20,
      images: null,
      difficulty: 'medium',
      createdBy: 'user1'
    },
    {
      id: '2',
      name: 'Avocado Toast',
      description: 'Simple and nutritious breakfast option',
      instructions: 'Toast bread, mash avocado, spread on toast, add toppings',
      servings: 2,
      prepTime: 5,
      cookTime: 5,
      images: null,
      difficulty: 'easy',
      createdBy: 'user1'
    },
    {
      id: '3',
      name: 'Beef Wellington',
      description: 'Elegant dish of beef tenderloin wrapped in puff pastry',
      instructions: 'Sear beef, wrap in mushroom duxelles and puff pastry, bake',
      servings: 6,
      prepTime: 60,
      cookTime: 45,
      images: null,
      difficulty: 'hard',
      createdBy: 'user2'
    },
    {
      id: '4',
      name: 'Greek Salad',
      description: 'Fresh Mediterranean salad with feta cheese and olives',
      instructions: 'Chop vegetables, mix with olive oil and lemon dressing',
      servings: 4,
      prepTime: 15,
      cookTime: 0,
      images: null,
      difficulty: 'easy',
      createdBy: 'user3'
    },
    {
      id: '5',
      name: 'Chicken Curry',
      description: 'Aromatic and spicy Indian-inspired dish',
      instructions: 'Cook chicken with curry paste, add coconut milk and simmer',
      servings: 4,
      prepTime: 20,
      cookTime: 30,
      images: null,
      difficulty: 'medium',
      createdBy: 'user2'
    },
    {
      id: '6',
      name: 'Chocolate Soufflé',
      description: 'Decadent French dessert that rises in the oven',
      instructions: 'Prepare chocolate base, fold in egg whites, bake carefully',
      servings: 4,
      prepTime: 30,
      cookTime: 15,
      images: null,
      difficulty: 'hard',
      createdBy: 'user1'
    }
  ];
  
  $: filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });
  
  function openCreateModal() {
    showCreateModal = true;
  }
  
  function closeCreateModal() {
    showCreateModal = false;
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
        <form class="space-y-6">
          <!-- Basic Info -->
          <div class="space-y-4">
            <div>
              <label for="recipe-name" class="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
              <input 
                type="text" 
                id="recipe-name" 
                placeholder="Enter recipe name" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                id="recipe-description" 
                placeholder="Brief description of your recipe" 
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              ></textarea>
            </div>
          </div>
          
          <!-- Recipe Details -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="recipe-servings" class="block text-sm font-medium text-gray-700 mb-1">Servings</label>
              <input 
                type="number" 
                id="recipe-servings" 
                min="1"
                placeholder="4" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-prep-time" class="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
              <input 
                type="number" 
                id="recipe-prep-time" 
                min="0"
                placeholder="15" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
            
            <div>
              <label for="recipe-cook-time" class="block text-sm font-medium text-gray-700 mb-1">Cook Time (min)</label>
              <input 
                type="number" 
                id="recipe-cook-time" 
                min="0"
                placeholder="30" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              >
            </div>
          </div>
          
          <div>
            <label for="recipe-difficulty" class="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select 
              id="recipe-difficulty" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <!-- Instructions -->
          <div>
            <label for="recipe-instructions" class="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea 
              id="recipe-instructions" 
              placeholder="Step-by-step instructions for your recipe" 
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
            ></textarea>
          </div>
          
          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="mt-1 text-sm text-gray-500">Drag and drop an image, or click to select</p>
              <input type="file" class="hidden">
              <button class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Upload Image
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
        <button 
          on:click={closeCreateModal}
          class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button 
          class="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Create Recipe
        </button>
      </div>
    </div>
  </div>
{/if} 