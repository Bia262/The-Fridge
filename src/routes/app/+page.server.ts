import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/auth');
  }

  try {
    // Get all recipes with their ingredients
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
      recipes: recipesWithIngredients
    };
  } catch (err) {
    console.error('Error loading recipes:', err);
    throw error(500, 'Failed to load recipes');
  }
}; 