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
          <h1 class="text-2xl font-bold text-gray-800">John Doe ✨</h1>
          <p class="text-pink-400">Member since 2024</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white border-2 border-pink-100 p-4 rounded-xl text-center hover:border-pink-200 transition-all duration-200">
          <div class="text-2xl font-bold text-gray-800">12</div>
          <div class="text-sm text-pink-400">Recipes</div>
        </div>
        <div class="bg-white border-2 border-pink-100 p-4 rounded-xl text-center hover:border-pink-200 transition-all duration-200">
          <div class="text-2xl font-bold text-gray-800">34</div>
          <div class="text-sm text-pink-400">Saved</div>
        </div>
        <div class="bg-white border-2 border-pink-100 p-4 rounded-xl text-center hover:border-pink-200 transition-all duration-200">
          <div class="text-2xl font-bold text-gray-800">156</div>
          <div class="text-sm text-pink-400">Items</div>
        </div>
      </div>

      <!-- Settings -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          Settings <span class="text-pink-400">⚙️</span>
        </h2>
        <div class="flex justify-between items-center p-4 bg-white border-2 border-pink-100 rounded-xl hover:border-pink-200 transition-all duration-200">
          <span class="text-gray-800">Notifications</span>
          <button 
            class="w-12 h-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full"
            aria-label="Toggle notifications"
          ></button>
        </div>
        <div class="flex justify-between items-center p-4 bg-white border-2 border-pink-100 rounded-xl hover:border-pink-200 transition-all duration-200">
          <span class="text-gray-800">Dark Mode</span>
          <button 
            class="w-12 h-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full"
            aria-label="Toggle dark mode"
          ></button>
        </div>
        <button class="w-full mt-6 bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 font-medium">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</div> 