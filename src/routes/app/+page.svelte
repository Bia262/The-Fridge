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
			name: 'Pancake Breakfast Tacos',
			description: 'Fluffy pancakes filled with crispy bacon, scrambled eggs, and cheddar cheese.',
			instructions: '1. Heat the oven to 200C/180C fan/gas 6 and arrange the bacon in a single layer on a baking tray.\n2. Bake for 12-14 mins until crisp. Meanwhile, combine the flour, baking powder, and sugar in a bowl.\n3. Whisk the butter, vanilla, milk, and egg together in a jug.\n4. Make a well in the centre of the dry ingredients and pour in the wet mixture, whisking to combine.\n5. Heat a little of the oil in a non-stick pan over medium heat.\n6. Spoon in 2 tbsp batter and spread out into a 12cm circle. Cook for 2-3 mins until the edge is set and golden.\n7. Flip and cook for 1-2 mins more until set. Repeat to make four pancakes, keeping finished pancakes warm in a low oven.\n8. Whisk eggs with a pinch of salt, then cook in butter over medium heat until set, light, and fluffy.\n9. Fill pancakes with bacon, scrambled eggs, and cheddar cheese.',
			servings: 2,
			prepTime: 10,
			cookTime: 20,
			images: ['/images/tacos1.jpg', '/images/tacos2.jpg' ],
			createdBy: 'admin'
		},
		{
			id: '2',
			name: 'Easy Egg Muffins',
			description: 'Savory egg muffins with broccoli, red pepper, cheese, and smoked paprika.',
			instructions: '1. Heat the oven to 200C/180C fan/gas 4. Brush half the oil in an 8-hole muffin tin.\n2. Heat the remaining oil in a frying pan and add the broccoli, pepper, and spring onions. Fry for 5 mins.\n3. Whisk the eggs with milk, smoked paprika, and half the cheese in a bowl.\n4. Add the cooked veg. Pour the egg mixture into the muffin holes and top with the remaining cheese and chives.\n5. Bake for 15-17 mins or until golden brown and cooked through.',
			servings: 8,
			prepTime: 10,
			cookTime: 30,
			images: ['/images/eggmuffin1.jpg', '/images/eggmuffin2.jpg'],
			createdBy: 'admin'
		},
		{
			id: '3',
			name: 'Smokey Beans and Baked Eggs',
			description: 'A hearty dish of smoky beans with baked eggs, perfect for breakfast or brunch.',
			instructions: '1. Heat the oil in a wide, shallow pan and cook the onion for 8-10 mins until softened.\n2. Add the pepper and cook for another 5 mins, stirring regularly, until softened.\n3. Stir in the garlic, paprika, and ketchup, then add the tomatoes. Cover and simmer for 10 mins.\n4. Remove the lid, cook for a few more minutes to thicken, then add the beans.\n5. Use a spoon to make 4-6 spaces in the mixture for the eggs.\n6. Crack the eggs into each hole, cover the pan, and reduce the heat to low.\n7. Cook for 3-5 mins until the egg whites are set but yolks are still runny.\n8. Scatter over the coriander to serve.',
			servings: 3,
			prepTime: 10,
			cookTime: 35,
			images: ['/images/smokey1.jpg', '/images/smokey2.jpg'],
			createdBy: 'admin'
		},
		{
			id: '4',
			name: 'Creamy Chicken Pasta',
			description: 'A rich and creamy pasta dish with shredded chicken, soft cheese, and spinach.',
			instructions: '1. Cook the pasta following pack instructions. Reserve 100ml of the water and drain.\n2. Heat oil in a frying pan on medium heat and fry the garlic and spinach for 3 mins until wilted.\n3. Add the soft cheese and heat until melted. Stir in most of the parmesan, then add the chicken, peas, and pasta water.\n4. Bring to the boil and bubble for 2-3 mins until heated through.\n5. Add the pasta and stir until combined.\n6. Add more pasta water to loosen the sauce if needed.\n7. Remove from heat, sprinkle over the remaining parmesan and herbs to serve.',
			servings: 4,
			prepTime: 10,
			cookTime: 15,
			images: ['/images/c1.jpg', '/images/c2.jpg'],
			createdBy: 'admin'
		},
		{
			id: '5',
			name: 'Spiced Carrot & Lentil Soup',
			description: 'A warming and nutritious soup with carrots, lentils, and aromatic spices.',
			instructions: '1. Heat a large saucepan and dry-fry the cumin seeds and chilli flakes for 1 min until aromatic.\n2. Scoop out half and set aside.\n3. Add olive oil, grated carrots, lentils, stock, and milk to the pan and bring to the boil.\n4. Simmer for 15 mins until lentils are soft.\n5. Blend the soup until smooth (or leave chunky if preferred).\n6. Season to taste and finish with yogurt and reserved toasted spices.\n7. Serve with warmed naan bread.',
			servings: 4,
			prepTime: 10,
			cookTime: 15,
			images: ['/images/l1.jpg', '/images/l2.jpg'],
			createdBy: 'admin'
		},
		{
			id: '6',
			name: 'Easiest Ever Seafood Rice',
			description: 'A simple and delicious seafood rice dish with chorizo and turmeric.',
			instructions: '1. Heat oil in a deep frying pan, then soften the leek for 5 mins.\n2. Add the chorizo and fry until it releases its oils.\n3. Stir in the turmeric and rice until coated, then pour in the stock.\n4. Bring to the boil, then simmer for 15 mins, stirring occasionally.\n5. Add the peas and cook for 5 mins.\n6. Stir in the seafood and cook for 1-2 mins until rice is cooked.\n7. Check for seasoning and serve immediately with lemon wedges.',
			servings: 4,
			prepTime: 10,
			cookTime: 20,
			images: ['/images/s1.jpg', '/images/s2.jpg'],
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

	let itemList = ["Eggs"];

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
