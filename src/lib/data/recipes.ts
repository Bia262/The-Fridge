export interface Recipe {
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
  ingredients?: { name: string; quantity: string; required?: boolean }[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    instructions: 'Cook pasta, mix with egg and cheese mixture, add pancetta',
    servings: 4,
    prepTime: 15,
    cookTime: 20,
    images: ['https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg'],
    difficulty: 'medium',
    createdBy: 'user1',
    ingredients: [
      { name: 'Spaghetti', quantity: '400g', required: true },
      { name: 'Eggs', quantity: '4', required: true },
      { name: 'Parmesan cheese', quantity: '100g', required: true },
      { name: 'Pancetta', quantity: '150g', required: true },
      { name: 'Black pepper', quantity: 'to taste', required: false },
      { name: 'Salt', quantity: 'to taste', required: false }
    ]
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Simple and nutritious breakfast option',
    instructions: 'Toast bread, mash avocado, spread on toast, add toppings',
    servings: 2,
    prepTime: 5,
    cookTime: 5,
    images: ['https://www.eatingwell.com/thmb/PM3UlLhM0VbE6dcq9ZFwCnMyWHI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EatingWell-April-Avocado-Toast-Directions-04-5b5b86524a3d4b35ac4c57863f6095dc.jpg'],
    difficulty: 'easy',
    createdBy: 'user1',
    ingredients: [
      { name: 'Bread slices', quantity: '2', required: true },
      { name: 'Avocado', quantity: '1', required: true },
      { name: 'Lemon juice', quantity: '1 tsp', required: false },
      { name: 'Salt', quantity: 'to taste', required: false },
      { name: 'Chili flakes', quantity: 'optional', required: false }
    ]
  },
  {
    id: '3',
    name: 'Beef Wellington',
    description: 'Elegant dish of beef tenderloin wrapped in puff pastry',
    instructions: 'Sear beef, wrap in mushroom duxelles and puff pastry, bake',
    servings: 6,
    prepTime: 60,
    cookTime: 45,
    images: ['https://grillmomma.com/wp-content/uploads/2020/12/IMG_1986_jpg-3-scaled-e1609300974309.jpg'],
    difficulty: 'hard',
    createdBy: 'user2',
    ingredients: [
      { name: 'Beef tenderloin', quantity: '1kg', required: true },
      { name: 'Puff pastry', quantity: '500g', required: true },
      { name: 'Mushroom', quantity: '300g', required: true },
      { name: 'Prosciutto', quantity: '200g', required: true },
      { name: 'Eggs', quantity: '1', required: true },
      { name: 'Salt and pepper', quantity: 'to taste', required: false }
    ]
  },
  {
    id: '4',
    name: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta cheese and olives',
    instructions: 'Chop vegetables, mix with olive oil and lemon dressing',
    servings: 4,
    prepTime: 15,
    cookTime: 0,
    images: ['https://www.simplyrecipes.com/thmb/0NrKQlJ691l6L9tZXpL06uOuWis=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Greek-Salad-LEAD-2-4601eff771fd4de38f9722e8cafc897a.jpg'],
    difficulty: 'easy',
    createdBy: 'user3',
    ingredients: [
      { name: 'Cucumber', quantity: '1', required: true },
      { name: 'Tomato', quantity: '3', required: true },
      { name: 'Red onion', quantity: '1', required: true },
      { name: 'Feta cheese', quantity: '150g', required: true },
      { name: 'Black olive', quantity: '100g', required: true },
      { name: 'Olive oil', quantity: '2 tbsp', required: false },
      { name: 'Lemon juice', quantity: '1 tbsp', required: false }
    ]
  },
  {
    id: '5',
    name: 'Chicken Curry',
    description: 'Aromatic and spicy Indian-inspired dish',
    instructions: 'Cook chicken with curry paste, add coconut milk and simmer',
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    images: ['https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg'],
    difficulty: 'medium',
    createdBy: 'user2',
    ingredients: [
      { name: 'Chicken breast', quantity: '500g', required: true },
      { name: 'Curry paste', quantity: '3 tbsp', required: false },
      { name: 'Coconut milk', quantity: '400ml', required: false },
      { name: 'Onion', quantity: '1', required: true },
      { name: 'Garlic cloves', quantity: '2', required: true },
      { name: 'Ginger', quantity: '1 tbsp, grated', required: false },
      { name: 'Salt', quantity: 'to taste', required: false }
    ]
  },
  {
    id: '6',
    name: 'Chocolate Soufflé',
    description: 'Decadent French dessert that rises in the oven',
    instructions: 'Prepare chocolate base, fold in egg whites, bake carefully',
    servings: 4,
    prepTime: 30,
    cookTime: 15,
    images: ['https://www.flavoursholidays.co.uk/wp-content/uploads/2022/02/Chocolate-souffle-SM.jpg'],
    difficulty: 'hard',
    createdBy: 'user1',
    ingredients: [
      { name: 'Dark chocolate', quantity: '200g', required: true },
      { name: 'Butter', quantity: '50g', required: true },
      { name: 'Eggs', quantity: '4', required: true },
      { name: 'Sugar', quantity: '50g', required: true },
      { name: 'Flour', quantity: '1 tbsp', required: false }
    ]
  }
];
