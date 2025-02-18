<div class="min-h-screen bg-pink-50/30 p-8">
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
      My Recipes <span class="text-pink-400">📖</span>
    </h1>
    
    <!-- Search and Filter Bar -->
    <div class="flex gap-4 mb-6">
      <div class="relative flex-1">
        <input 
          type="text" 
          placeholder="Search recipes..." 
          class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400"
        >
        <svg class="w-5 h-5 absolute right-4 top-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <select class="px-6 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800">
        <option>All Categories</option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>
    </div>

    <!-- Recipe Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="bg-white rounded-2xl shadow-xl border-2 border-pink-100 overflow-hidden hover:border-pink-200 transition-all duration-200">
          <div class="h-48 bg-gradient-to-r from-pink-100 to-pink-200"></div>
          <div class="p-6">
            <h3 class="font-bold text-gray-800 mb-2">Recipe {i + 1}</h3>
            <p class="text-sm text-pink-400 mb-3">A delicious recipe that's easy to make.</p>
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">Easy</span>
                <span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">20 min</span>
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