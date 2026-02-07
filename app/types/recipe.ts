export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  costPerServing: number;
  macros: Macros;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  mealType: MealType;
}
