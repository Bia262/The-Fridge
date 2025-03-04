<script lang="ts">
	import RecipePopup from '$lib/components/RecipePopup.svelte';
	
	// Define recipe type
	interface Recipe {
		id: string;
		name: string;
		description: string;
		instructions: string;
		servings: number;
		prepTime: number;
		cookTime: number;
		images: string[];
		createdBy: string;
	}
	
	// Sample recipes data
	const recipes: Recipe[] = [
		{
			id: '1',
			name: 'Creamy Garlic Pasta',
			description: 'A rich and creamy pasta dish with a garlic infused sauce. Perfect for a quick weeknight dinner!',
			instructions: '1. Cook pasta according to package directions.\n2. In a large skillet, melt butter over medium heat. Add minced garlic and cook for 1 minute.\n3. Add heavy cream and bring to a simmer.\n4. Stir in parmesan cheese until melted and sauce is smooth.\n5. Add cooked pasta to the sauce and toss to coat.\n6. Season with salt and pepper. Garnish with parsley.',
			servings: 4,
			prepTime: 10,
			cookTime: 15,
			images: [
				'https://source.unsplash.com/random/900x700/?pasta',
				'https://source.unsplash.com/random/900x700/?garlic'
			],
			createdBy: 'admin'
		},
		{
			id: '2',
			name: 'Vegetable Stir-Fry',
			description: 'A colorful and nutritious stir-fry loaded with fresh vegetables and a savory sauce.',
			instructions: '1. Prepare all vegetables by cutting them into bite-sized pieces.\n2. Mix soy sauce, cornstarch, and sesame oil to make the sauce.\n3. Heat vegetable oil in a wok or large skillet over high heat.\n4. Add harder vegetables first (carrots, broccoli) and cook for 2 minutes.\n5. Add remaining vegetables and cook until crisp-tender.\n6. Pour sauce over vegetables and cook until thickened.\n7. Serve over rice or noodles.',
			servings: 3,
			prepTime: 15,
			cookTime: 10,
			images: [
				'https://source.unsplash.com/random/900x700/?stirfry',
				'https://source.unsplash.com/random/900x700/?vegetables'
			],
			createdBy: 'admin'
		},
		{
			id: '3',
			name: 'Avocado Toast',
			description: 'Simple yet delicious avocado toast with optional toppings. A perfect healthy breakfast or snack!',
			instructions: '1. Toast bread until golden and firm.\n2. Remove pits from avocados and scoop the flesh into a bowl.\n3. Add lemon juice, salt, and pepper to taste. Mash with a fork to desired consistency.\n4. Spread avocado mixture on toast.\n5. Add desired toppings like sliced tomatoes, red pepper flakes, or a poached egg.',
			servings: 2,
			prepTime: 5,
			cookTime: 5,
			images: [
				'https://source.unsplash.com/random/900x700/?avocadotoast',
				'https://source.unsplash.com/random/900x700/?avocado'
			],
			createdBy: 'admin'
		},
		{
			id: '4',
			name: 'Berry Smoothie Bowl',
			description: 'A refreshing and nutritious smoothie bowl packed with berries and topped with granola and fresh fruit.',
			instructions: '1. Add frozen berries, banana, and milk to a blender.\n2. Blend until smooth, adding more liquid if needed.\n3. Pour into a bowl.\n4. Top with granola, fresh berries, sliced banana, and a drizzle of honey.',
			servings: 1,
			prepTime: 5,
			cookTime: 0,
			images: [
				'https://source.unsplash.com/random/900x700/?smoothiebowl',
				'https://source.unsplash.com/random/900x700/?berries'
			],
			createdBy: 'admin'
		}
	];
	
	// State to control which recipe is shown in the popup
	let showRecipePopup = false;
	let selectedRecipe: Recipe = recipes[0];
	
	// Open recipe popup with the selected recipe
	function openRecipe(recipe: Recipe): void {
		selectedRecipe = recipe;
		showRecipePopup = true;
	}

	let itemList = ["banán"];

	function deleteItem(itemName:string) {
		itemList = itemList.filter(item => item !== itemName);
    }

	function addItem(){
		let itemName:any = document.getElementById("addItemName")
		if(itemName){
			itemList = [...itemList, itemName.value]
		}
		itemName.value="";
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
					{#each itemList as item}
				
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
								<span class="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full"><button on:click={() => {deleteItem(item)}}><img src="/assets/deletebutton.png" alt="Delete" class="w-6 h-6" /></button></span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<input type="text" id="addItemName" class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-400">
			<button class="mt-6 w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium" on:click={() => {addItem()}}>
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
						on:click={() => openRecipe(recipe)}
						role="button"
						tabindex="0"
						on:keydown={(e) => e.key === 'Enter' && openRecipe(recipe)}
					>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<div class="w-20 h-20 rounded-xl overflow-hidden">
									<img src={recipe.images[0]} alt={recipe.name} class="w-full h-full object-cover" />
								</div>
								<div>
									<h3 class="font-medium text-gray-800">{recipe.name}</h3>
									<p class="text-sm text-pink-400">{recipe.cookTime + recipe.prepTime} mins • {recipe.servings} servings</p>
									<div class="flex space-x-2 mt-2">
										<span class="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">Easy</span>
										<span class="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">Healthy</span>
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
<RecipePopup bind:show={showRecipePopup} recipe={selectedRecipe} />
