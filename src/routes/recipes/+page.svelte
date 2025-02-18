<div class="min-h-screen bg-[#fdfbe5] p-8">
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">My Recipes</h1>
    
    <!-- Search and Filter Bar -->
    <div class="flex gap-4 mb-6">
      <input 
        type="text" 
        placeholder="Search recipes..." 
        class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
      >
      <select class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200">
        <option>All Categories</option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>
    </div>

    <!-- Recipe Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-4">
            <h3 class="font-bold text-gray-800 mb-2">Recipe {i + 1}</h3>
            <p class="text-sm text-gray-500 mb-3">A delicious recipe that's easy to make.</p>
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Easy</span>
                <span class="text-xs bg-[#fee9f0] text-gray-800 px-2 py-1 rounded">20 min</span>
              </div>
              <button class="text-gray-600 hover:text-gray-800" aria-label="View recipe details">
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