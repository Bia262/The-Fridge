import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw error(401, 'Unauthorized');
    }

    // Get all recipes
    const recipes = await db.select().from(table.recipe);

    // Get all ingredients
    const ingredients = await db.select().from(table.ingredient);

    // Get recipe ingredients
    const recipeIngredients = await db.select().from(table.recipeIngredient);

    // Combine recipes with their ingredients
    const recipesWithIngredients = recipes.map(recipe => ({
        ...recipe,
        ingredients: recipeIngredients
            .filter(ri => ri.recipeId === recipe.id)
            .map(ri => {
                const ingredient = ingredients.find(i => i.id === ri.ingredientId);
                return ingredient ? {
                    id: ingredient.id,
                    name: ingredient.name,
                    amount: ri.amount,
                    unit: ri.unit
                } : null;
            })
            .filter(Boolean)
    }));

    return {
        recipes: recipesWithIngredients,
        ingredients
    };
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        if (!locals.user) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const instructions = formData.get('instructions') as string;
        const servings = parseInt(formData.get('servings') as string);
        const prepTime = parseInt(formData.get('prepTime') as string);
        const cookTime = parseInt(formData.get('cookTime') as string);
        const difficulty = formData.get('difficulty') as 'easy' | 'medium' | 'hard';
        const ingredients = JSON.parse(formData.get('ingredients') as string);

        if (!name || !instructions || !servings || !prepTime || !cookTime || !difficulty) {
            return fail(400, { error: 'Missing required fields' });
        }

        try {
            // Insert recipe
            const [recipe] = await db.insert(table.recipe).values({
                name,
                description,
                instructions,
                servings,
                prepTime,
                cookTime,
                difficulty,
                createdBy: locals.user.id
            }).returning();

            // Insert recipe ingredients
            if (ingredients && ingredients.length > 0) {
                await db.insert(table.recipeIngredient).values(
                    ingredients.map((ing: any) => ({
                        recipeId: recipe.id,
                        ingredientId: ing.id,
                        amount: ing.amount,
                        unit: ing.unit
                    }))
                );
            }

            return { success: true, recipe };
        } catch (err) {
            console.error('Error creating recipe:', err);
            return fail(500, { error: 'Failed to create recipe' });
        }
    },

    delete: async ({ request, locals }) => {
        if (!locals.user) {
            throw error(401, 'Unauthorized');
        }

        const formData = await request.formData();
        const recipeId = formData.get('recipeId') as string;

        if (!recipeId) {
            return fail(400, { error: 'Missing recipe ID' });
        }

        try {
            // Delete recipe ingredients first
            await db.delete(table.recipeIngredient).where(eq(table.recipeIngredient.recipeId, recipeId));

            // Delete recipe
            await db.delete(table.recipe).where(eq(table.recipe.id, recipeId));

            return { success: true };
        } catch (err) {
            console.error('Error deleting recipe:', err);
            return fail(500, { error: 'Failed to delete recipe' });
        }
    }
}; 