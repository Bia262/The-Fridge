<script lang="ts">
	import { page } from '$app/stores';
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#fdfbe5]">
	<!-- Navbar -->
	<nav class="bg-[#fee9f0] p-4 shadow-md">
		<div class="container mx-auto flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<a href="/app" class="flex flex-row items-center space-x-2">
					<img src="/assets/fridge.png" alt="The Fridge" class="w-10 h-10" />
					<span class="text-2xl font-bold text-gray-800">The Fridge</span>
				</a>
			</div>
			<div class="flex items-center space-x-6">
				<a 
					href="/app/recipes" 
					class="flex items-center p-2 rounded-lg {$page.url.pathname === '/app/recipes' ? 'bg-white' : ''}"
				>
					<img src="/assets/cookbutton.png" alt="Recipes" class="w-6 h-6 mix-blend-multiply" />
				</a>
				<a 
					href="/app/profile" 
					class="flex items-center p-2 rounded-lg {$page.url.pathname === '/app/profile' ? 'bg-white' : ''}"
				>
					<img src="/assets/profilebutton.png" alt="Profile" class="w-6 h-6" />
				</a>
			</div>
		</div>
	</nav>

	<!-- Page Content -->
	{@render children()}
</div>
