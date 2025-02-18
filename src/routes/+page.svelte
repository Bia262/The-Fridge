<div class="container mx-auto mt-8 px-4">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<!-- Left Column - Fridge -->
		<div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100">
			<h2 class="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
				<span>My Fridge</span>
				<span class="text-pink-400">🧊</span>
			</h2>
			
			<!-- Search Bar -->
			<div class="relative mb-4">
				<input 
					type="text" 
					placeholder="Search items..." 
					class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400"
				>
				<svg class="w-5 h-5 absolute right-4 top-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
			</div>

			<!-- Items List -->
			<div class="h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50">
				<div class="space-y-3">
					{#each Array(12) as _, i}
						<div class="bg-white p-4 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
										<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
										</svg>
									</div>
									<div>
										<p class="font-medium text-gray-800">Item {i + 1}</p>
									</div>
								</div>
								<span class="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full">2 units</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<button class="mt-6 w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium">
				<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
				</svg>
				<span>Add Item</span>
			</button>
		</div>

		<!-- Right Column - Recipes -->
		<div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100">
			<h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
				<span>Possible Recipes</span>
				<span class="text-pink-400">🍳</span>
			</h2>
			<div class="space-y-4">
				{#each Array(4) as _, i}
					<div class="bg-white p-5 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200">
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<div class="w-20 h-20 bg-pink-100 rounded-xl"></div>
								<div>
									<h3 class="font-medium text-gray-800">Recipe {i + 1}</h3>
									<p class="text-sm text-pink-400">20 mins • 4 servings</p>
									<div class="flex space-x-2 mt-2">
										<span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">Easy</span>
										<span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">Healthy</span>
									</div>
								</div>
							</div>
							<button class="text-pink-400 hover:text-pink-600 transition-colors" aria-label="View recipe details">
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
