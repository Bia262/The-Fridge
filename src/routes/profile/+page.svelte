<div class="min-h-screen bg-[#fdfbe5] p-8">
  <div class="container mx-auto max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Profile Header -->
      <div class="flex items-center space-x-4 mb-8">
        <div class="w-20 h-20 bg-[#fee9f0] rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">John Doe</h1>
          <p class="text-gray-500">Member since 2024</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-gray-800">12</div>
          <div class="text-sm text-gray-500">Recipes</div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-gray-800">34</div>
          <div class="text-sm text-gray-500">Saved</div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-gray-800">156</div>
          <div class="text-sm text-gray-500">Items</div>
        </div>
      </div>

      <!-- Settings -->
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Settings</h2>
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span class="text-gray-800">Notifications</span>
          <button 
            class="w-12 h-6 bg-[#fee9f0] rounded-full"
            aria-label="Toggle notifications"
          ></button>
        </div>
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <span class="text-gray-800">Dark Mode</span>
          <button 
            class="w-12 h-6 bg-[#fee9f0] rounded-full"
            aria-label="Toggle dark mode"
          ></button>
        </div>
        <button class="w-full mt-6 bg-[#fee9f0] text-gray-800 py-2 px-4 rounded-lg hover:bg-pink-200 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  </div>
</div> 