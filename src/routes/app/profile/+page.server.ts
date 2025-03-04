import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {

    if (!locals.user) {
        return {
            user: null
        };
    }

    const savedRecipesCount = await db.select({ count: count() }).from(table.savedRecipe).where(eq(table.savedRecipe.userId, locals.user.id));
    const recipesUploadedCount = await db.select({ count: count() }).from(table.recipe).where(eq(table.recipe.createdBy, locals.user.id));
    const itemsInFridgeCount = await db.select({ count: count() }).from(table.fridgeItem).where(eq(table.fridgeItem.userId, locals.user.id));

    return {
        user: locals.user,
        savedRecipesCount: savedRecipesCount[0]?.count || 0,
        recipesUploadedCount: recipesUploadedCount[0]?.count || 0,
        itemsInFridgeCount: itemsInFridgeCount[0]?.count || 0
    };
};
