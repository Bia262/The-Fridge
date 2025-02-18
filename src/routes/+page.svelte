<div class="container mx-auto mt-8 px-4">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- Left Column - Fridge -->
		<div class="bg-white rounded-lg shadow-lg p-6">
			<h2 class="text-2xl font-bold mb-4 text-gray-800">My Fridge</h2>
			
			<!-- Search Bar -->
			<div class="relative mb-4">
				<input 
					type="text" 
					placeholder="Search items..." 
					class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
				>
				<svg class="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
			</div>

			<!-- Items List -->
			<div class="h-[400px] overflow-y-auto pr-2">
				<div class="space-y-2">
					{#each Array(12) as _, i}
						<div class="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-8 h-8 bg-[#fee9f0] rounded-full flex items-center justify-center">
										<svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
										</svg>
									</div>
									<div>
										<p class="font-medium text-gray-800">Item {i + 1}</p>
									</div>
								</div>
								<span class="text-sm font-medium text-gray-600">2 units</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<button class="mt-4 w-full bg-[#fee9f0] text-gray-800 py-2 px-4 rounded-lg hover:bg-pink-200 transition-colors flex items-center justify-center space-x-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
				</svg>
				<span>Add Item</span>
			</button>
		</div>

		<!-- Right Column - Recipes -->
		<div class="bg-white rounded-lg shadow-lg p-6">
			<h2 class="text-2xl font-bold mb-6 text-gray-800">Possible Recipes</h2>
			<div class="space-y-4">
				{#each Array(4) as _, i}
					<div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
								<div>
									<h3 class="font-medium text-gray-800">Recipe {i + 1}</h3>
									<p class="text-sm text-gray-500">20 mins • 4 servings</p>
									<div class="flex space-x-2 mt-1">
										<span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Easy</span>
										<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Healthy</span>
									</div>
								</div>
							</div>
							<button class="text-gray-600 hover:text-gray-800" aria-label="View recipe details">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
