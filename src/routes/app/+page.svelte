<script lang="ts">
	import RecipePopup from '$lib/components/RecipePopup.svelte';
	import type { PageData as BasePageData } from './$types';
	
	interface PageData extends BasePageData {
		recipes: Recipe[];
	}
	
	export let data: PageData;
	
	// Define Recipe type
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
		ingredients?: Array<{
			id: string;
			name: string;
			amount?: string;
			unit?: string;
		}>;
	};
	
	let selectedRecipe: Recipe | null = null;
	let showRecipePopup = false;
	let fridgeItems: string[] = [];
	let suggestions: Recipe[] = [];
	
	// Get recipes from server data
	let recipes: Recipe[] = data.recipes;
	
	function getDifficultyColor(difficulty: string) {
		switch (difficulty) {
			case 'easy':
				return 'bg-green-100 text-green-800';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800';
			case 'hard':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}
	
	function openRecipePopup(recipe: Recipe) {
		selectedRecipe = recipe;
		showRecipePopup = true;
	}
	
	function closeRecipePopup() {
		selectedRecipe = null;
		showRecipePopup = false;
	}
	
	function addFridgeItem() {
		const input = document.getElementById('fridgeItem') as HTMLInputElement;
		if (input && input.value.trim()) {
			fridgeItems = [...fridgeItems, input.value.trim()];
			input.value = '';
			updateSuggestions();
		}
	}
	
	function deleteFridgeItem(index: number) {
		fridgeItems = fridgeItems.filter((_, i) => i !== index);
		updateSuggestions();
	}
	
	function updateSuggestions() {
		// Filter recipes based on available ingredients
		suggestions = recipes.filter(recipe => {
			if (!recipe.ingredients) return false;
			
			// Check if at least 70% of recipe ingredients are in fridge
			const matchingIngredients = recipe.ingredients.filter(ing => 
				fridgeItems.some(item => 
					item.toLowerCase().includes(ing.name.toLowerCase())
				)
			);
			
			return matchingIngredients.length / recipe.ingredients.length >= 0.7;
		}).slice(0, 3); // Show top 3 suggestions
	}
</script>

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
					{#each fridgeItems as item}
						<div class="bg-white p-4 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
										<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
										</svg>
									</div>
									<div>
										<p class="font-medium text-gray-800">{item}</p>
									</div>
								</div>
								<span class="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full"><button on:click={() => {deleteFridgeItem(fridgeItems.indexOf(item))}}><img src="/assets/deletebutton.png" alt="Delete" class="w-6 h-6" /></button></span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<input type="text" id="fridgeItem" class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400" on:input={updateSuggestions}>
			{#if suggestions.length > 0}
				<ul class="absolute bg-white border border-gray-300 rounded-md -mt-1 w-8/30 z-10">
					{#each suggestions as suggestion}
						<li class="p-2 hover:bg-gray-200 cursor-pointer" on:click={() => {
							const input = document.getElementById("fridgeItem") as HTMLInputElement;
							if (input) input.value = suggestion.name; 
							suggestions = [];
						}}>
							{suggestion.name}
						</li>
					{/each}
				</ul>
			{/if}
			<button class="mt-6 w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium" on:click={() => {addFridgeItem()}}>
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
				{#each recipes as recipe}
					<div 
						class="bg-white p-5 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200 cursor-pointer"
						on:click={() => openRecipePopup(recipe)}
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && openRecipePopup(recipe)}
					>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<div class="w-20 h-20 rounded-xl overflow-hidden">
									<img src={recipe.images && recipe.images.length > 0 ? recipe.images[0] : '/images/placeholder.jpg'} alt={recipe.name} class="w-full h-full object-cover" />
								</div>
								<div>
									<h3 class="font-medium text-gray-800">{recipe.name}</h3>
									<p class="text-sm text-pink-400">{recipe.cookTime + recipe.prepTime} mins • {recipe.servings} servings</p>
									<div class="flex space-x-2 mt-2">
										<span class="text-xs {getDifficultyColor(recipe.difficulty)} px-3 py-1 rounded-full font-medium capitalize">{recipe.difficulty}</span>
										{#if recipe.ingredients && recipe.ingredients.length > 0}
											<span class="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">{recipe.ingredients.length} ingredients</span>
										{/if}
									</div>
								</div>
							</div>
							<div class="text-pink-400">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
								</svg>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<!-- Recipe Popup -->
{#if selectedRecipe}
	<RecipePopup bind:show={showRecipePopup} recipe={selectedRecipe} />
{/if}
