<script lang="ts">
	import RecipePopup from '$lib/components/RecipePopup.svelte';
	import { recipes, type Recipe } from '$lib/data/recipes';

	let showRecipePopup = false;
	type RecipeWithNullableDescription = Omit<Recipe, 'description'> & { description: string | null };
	let selectedRecipe: RecipeWithNullableDescription = recipes[0] as RecipeWithNullableDescription;

	function parseQuantity(quantity: string): number {
		const match = quantity.match(/[\d\.]+/);
		if (!match) {
			return 0;
		}
		return parseFloat(match[0]);
	}

	function normalizeName(name: string): string {
		return name.toLowerCase().replace(/s$/, '');
	}

	$: filteredRecipes = recipes.filter(recipe => {
		if (!Array.isArray(recipe.ingredients)) return false;
		return recipe.ingredients.every(ingredientObj => {
			if (!ingredientObj || typeof ingredientObj.name !== 'string') return false;
			if (ingredientObj.required === false) return true;
			const ingredientName = normalizeName(ingredientObj.name);
			const requiredQuantity = parseQuantity(ingredientObj.quantity);
			const fridgeItem = itemList.find(item => normalizeName(item.name) === ingredientName);
			if (!fridgeItem) return false;
			if (requiredQuantity === 0) return fridgeItem.quantity > 0;
			return fridgeItem.quantity >= requiredQuantity;
		});
	});

	function openRecipe(recipe: RecipeWithNullableDescription): void {
		selectedRecipe = recipe;
		showRecipePopup = true;
	}

	type Item = { name: string; quantity: number };

	let itemList: Item[] = [
		{ name: "Egg", quantity: 12 },
		{ name: "Bread slice", quantity: 20 },
		{ name: "Milk", quantity: 6 },
		{ name: "Butter", quantity: 300 },
		{ name: "Mushroom", quantity: 400 },
		{ name: "Cucumber", quantity: 2 },
		{ name: "Tomato", quantity: 4 },
		{ name: "Parmesan cheese", quantity: 200 },
		{ name: "Cheese", quantity: 300 },
		{ name: "Onion", quantity: 5 },
		{ name: "Avocado", quantity: 2 },
		{ name: "Spaghetti", quantity: 800 },
		{ name: "Pancetta", quantity: 200 },
		{ name: "Red onion", quantity: 3 },
		{ name: "Feta cheese", quantity: 200 },
		{ name: "Black olive", quantity: 130 },
		{ name: "Prosciutto", quantity: 200 },
		{ name: "Puff pastry", quantity: 750 },
		{ name: "Beef tenderloin", quantity: 1000 },
		{ name: "Dark chocolate", quantity: 500 },
		{ name: "Sugar", quantity: 300 },
		{ name: "Chicken breast", quantity: 500 },
		{ name: "Garlic cloves", quantity: 7 },
		{ name: "Coconut milk", quantity: 2 }
	];

	let allowedItems = ["Egg", "Milk", "Bread slice", "Butter", "Cheese", "Spaghetti", "Mushroom", "Lemon juice", "Cucumber", "Tomato", "Parmesan cheese", "Avocado", "Pancetta", "Red onion", "Feta cheese", "Black olive", "Prosciutto", "Puff pastry", "Beef tenderloin", "Dark chocolate", "Sugar", "Chicken breast", "Garlic cloves", "Coconut milk"];

	let showAddModal = false;
	let newItemName = "";
	let newItemQuantity = 1;

	let showRemoveModal = false;
	let removeItemName = "";
	let removeItemQuantity = 1;

	let searchQuery = "";

	$: filteredItemList = itemList.filter(item =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function deleteItem(itemName: string) {
		removeItemName = itemName;
		removeItemQuantity = 1;
		showRemoveModal = true;
	}

	function confirmRemoveItem() {
		const item = itemList.find(i => i.name == removeItemName);
		if (item) {
			if (removeItemQuantity >= item.quantity) {
				itemList = itemList.filter(i => i.name !== removeItemName);
			} else {
				item.quantity -= removeItemQuantity;
				itemList = [...itemList];
			}
		}
		showRemoveModal = false;
	}

	function closeRemoveModal() {
		showRemoveModal = false;
	}

	function openAddModal() {
		newItemName = "";
		newItemQuantity = 1;
		showAddModal = true;
	}

	function closeAddModal() {
		showAddModal = false;
	}

	function addItem() {
		if (allowedItems.includes(newItemName) && newItemQuantity > 0) {
			const existingItem = itemList.find(item => item.name == newItemName);
			if (existingItem) {
				existingItem.quantity += newItemQuantity;
				itemList = [...itemList];
			} else {
				itemList = [...itemList, { name: newItemName, quantity: newItemQuantity }];
			}
			closeAddModal();
		}
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
					bind:value={searchQuery}
					class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400"
				>
				<svg class="w-5 h-5 absolute right-4 top-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
				</svg>
			</div>

			<!-- Items List -->
			<div class="h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50">
				<div class="space-y-3">
					{#each filteredItemList as item}
						<div class="bg-white p-4 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200">
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
										<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
										</svg>
									</div>
									<div>
						<p class="font-medium text-gray-800">
							{#if item.name == 'Milk' || item.name == 'Lemon juice' || item.name == 'Coconut milk'}
								{item.name} - {item.quantity} l
							{:else if item.name == 'Sugar' || item.name == 'Flour' || item.name == 'Spaghetti' || item.name == 'Cheese' || item.name == 'Butter' || item.name == 'Mushroom' || item.name == 'Parmesan cheese' || item.name == 'Pancetta' || item.name == 'Feta cheese' || item.name == 'Black olive' || item.name == 'Prosciutto' || item.name == 'Puff pastry' || item.name == 'Beef tenderloin' || item.name == 'Dark chocolate' || item.name == 'Chicken breast'}
								{item.name} - {item.quantity} g
							{:else}
								{item.name} - {item.quantity}
							{/if}
						</p>
									</div>
								</div>
								<span class="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full"><button on:click={() => {deleteItem(item.name)}}><img src="/assets/deletebutton.png" alt="Delete" class="w-6 h-6" /></button></span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<button class="mt-6 w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium" on:click={openAddModal}>
				<svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
				</svg>
				<span>Add Item</span>
			</button>

			{#if showRemoveModal}
				<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div class="bg-white rounded-lg p-6 w-80">
						<h3 class="text-lg font-semibold mb-4">Remove Item</h3>
						<p class="mb-4">How many <strong>{removeItemName}</strong> would you like to remove?</p>
						<input type="number" min="1" max={itemList.find(i => i.name === removeItemName)?.quantity ?? 1} bind:value={removeItemQuantity} class="w-full mb-4 px-3 py-2 border border-gray-300 rounded" />
						<div class="flex justify-end space-x-4">
							<button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" on:click={closeRemoveModal}>Cancel</button>
							<button class="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500" on:click={confirmRemoveItem} disabled={removeItemQuantity < 1}>Remove</button>
						</div>
					</div>
				</div>
			{/if}

			{#if showAddModal}
				<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div class="bg-white rounded-lg p-6 w-80">
						<h3 class="text-lg font-semibold mb-4">Add Item</h3>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block mb-2 font-medium text-gray-700">Item</label>
						<select bind:value={newItemName} class="w-full mb-4 px-3 py-2 border border-gray-300 rounded">
							<option value="" disabled selected>Select an item</option>
							{#each allowedItems as allowedItem}
								<option value={allowedItem}>{allowedItem}</option>
							{/each}
						</select>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block mb-2 font-medium text-gray-700">Quantity</label>
						<input type="number" min="1" bind:value={newItemQuantity} class="w-full mb-4 px-3 py-2 border border-gray-300 rounded" />
						<div class="flex justify-end space-x-4">
							<button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" on:click={closeAddModal}>Cancel</button>
							<button class="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500" on:click={addItem} disabled={!newItemName || newItemQuantity < 1}>Add</button>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Right Column - Recipes -->
		<div class="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100">
			<h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
				<span>Possible Recipes</span>
				<span class="text-pink-400">🍳</span>
			</h2>
			<div class="space-y-4 h-[550px] overflow-y-auto">
			{#each filteredRecipes as recipe}
				<div 
					class="bg-white p-5 rounded-xl border-2 border-pink-100 hover:border-pink-200 hover:shadow-md transition-all duration-200 cursor-pointer"
					on:click={() => openRecipe(recipe)}
					role="button"
					tabindex="0"
					on:keydown={(e) => e.key === 'Enter' && openRecipe(recipe)}
				>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-4">
			<div class="w-20 h-20 rounded-xl overflow-hidden">
				<img src={recipe.images ? recipe.images[0] : ''} alt={recipe.name} class="w-full h-full object-cover" />
			</div>
			<div>
				<h3 class="font-medium text-gray-800">{recipe.name}</h3>
				<p class="text-sm text-pink-400">{recipe.cookTime + recipe.prepTime} mins • {recipe.servings} servings</p>
				<div class="flex space-x-2 mt-2">
					<span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">{recipe.difficulty}</span>
					<span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">Healthy</span>
				</div>
			</div>
						</div>
						<div class="text-pink-400">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
						</div>
					</div>
				</div>
			{/each}
			</div>
		</div>
	</div>
</div>

<!-- Recipe Popup -->
<RecipePopup bind:show={showRecipePopup} recipe={selectedRecipe} />
