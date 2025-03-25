import { pgTable, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const role = pgEnum('role', ['admin', 'user']);

export const user = pgTable('user', {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    role: role('role').default('user'),
    passwordHash: text('password_hash').notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

// Define difficulty enum type
export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);

export const recipe = pgTable("recipe", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    description: text('description'),
    instructions: text('instructions'),
    servings: integer('servings').notNull(),
    prepTime: integer('prep_time').notNull(),   
    cookTime: integer('cook_time').notNull(),
    images: text('images').array(),
    difficulty: difficultyEnum('difficulty').default('easy'),
    createdBy: text('created_by').notNull().references(() => user.id),
});

export const ingredient = pgTable("ingredient", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    name: text('name').notNull(),
    description: text('description'),
});

export const recipeIngredient = pgTable("recipe_ingredient", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    recipeId: text('recipe_id').notNull().references(() => recipe.id),
    ingredientId: text('ingredient_id').notNull().references(() => ingredient.id),
    amount: text('amount'),
    unit: text('unit')
});

export const savedRecipe = pgTable("saved_recipe", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: text('user_id').notNull().references(() => user.id),
    recipeId: text('recipe_id').notNull().references(() => recipe.id),
});

export const fridgeItem = pgTable("fridge_item", {
    id: text('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: text('user_id').notNull().references(() => user.id),
    ingredientId: text('ingredient_id').notNull().references(() => ingredient.id),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Recipe = typeof recipe.$inferSelect;
export type Ingredient = typeof ingredient.$inferSelect;
export type RecipeIngredient = typeof recipeIngredient.$inferSelect;
export type SavedRecipe = typeof savedRecipe.$inferSelect;
export type FridgeItem = typeof fridgeItem.$inferSelect;
