<script lang='ts'>
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { Card, Button, Input, Label, Alert } from 'flowbite-svelte';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	
	let { form }: { form: ActionData } = $props();
	let isRegistering = $state(false);
	let isSuccess = $state(false);
	let isLoading = $state(false);
	let successMessage = $state('');
	
	// Toggle between login and register modes
	function toggleRegisterMode() {
		isRegistering = true;
	}
	
	// Custom form submission logic
	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		isSuccess = false;
		
		return async ({ result, update }) => {
			isLoading = false;
			
			if (result.type === 'success') {
				// Check if result.data exists and has success property
				const data = result.data as { success?: boolean; message?: string; redirectTo?: string } | undefined;
				
				if (data?.success) {
					isSuccess = true;
					successMessage = data.message || 'Operation completed successfully!';
					
					// Update the form data
					await update();
					
					// Redirect after a short delay
					if (data.redirectTo) {
						setTimeout(() => {
							goto(data.redirectTo as string);
						}, 2000);
					}
				}
			} else {
				// Let Svelte handle the error display
				await update();
			}
		};
	};
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-50">
	<Card class="w-full max-w-md border-2 border-pink-100 shadow-xl rounded-2xl p-8">
		<div class="text-center mb-6">
			<h1 class="text-2xl font-bold flex items-center justify-center gap-2">
				<span class="text-pink-600">Welcome to The Fridge</span>
				<span class="text-pink-400">🧊</span>
			</h1>
		</div>
		
		{#if isSuccess}
			<Alert color="green" class="mb-4 rounded-xl">
				<span class="font-medium">Success!</span> {successMessage}
			</Alert>
		{/if}
		
		<form method='post' action={isRegistering ? '?/register' : '?/login'} use:enhance={handleSubmit} class="space-y-5">
			<div>
				<Label for="email" class="mb-2 text-gray-700">Email</Label>
				<Input id="email" name="email" type="email" placeholder="your@email.com" 
					class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
					required />
			</div>
			
			{#if isRegistering}
				<div>
					<Label for="name" class="mb-2 text-gray-700">What can we call you?</Label>
					<Input id="name" name="name" type="text" placeholder="Your name" 
						class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
						required />
				</div>
			{/if}
			
			<div>
				<Label for="password" class="mb-2 text-gray-700">Password</Label>
				<Input id="password" name="password" type="password" placeholder="Your password" 
					class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
					required />
			</div>
			
			{#if isRegistering}
				<div>
					<Label for="passwordConfirm" class="mb-2 text-gray-700">Confirm Password</Label>
					<Input id="passwordConfirm" name="passwordConfirm" type="password" 
						class="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
						required />
				</div>
			{/if}
			
			<div class="flex gap-4 pt-2">
				{#if isRegistering}
					<Button type="submit" 
						class="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200"
						disabled={isLoading}>
						{#if isLoading}Creating Account...{:else}Create Account{/if}
					</Button>
					<Button type="button" on:click={() => isRegistering = false}
						class="w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200"
						disabled={isLoading}>
						Back to Login
					</Button>
				{:else}
					<Button type="submit" 
						class="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200"
						disabled={isLoading}>
						{#if isLoading}Logging in...{:else}Login{/if}
					</Button>
					<Button type="button" on:click={toggleRegisterMode}
						class="w-full bg-gradient-to-r from-pink-100 to-pink-200 text-gray-800 py-3 px-6 rounded-full hover:shadow-lg transition-all duration-200"
						disabled={isLoading}>
						Register
					</Button>
				{/if}
			</div>
			
			{#if form?.message && !isSuccess}
				<Alert color="red" class="mt-4 rounded-xl">
					<span class="font-medium">Oops!</span> {form.message}
				</Alert>
			{/if}
		</form>
	</Card>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
