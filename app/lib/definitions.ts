export type Recipe = {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  extendedIngredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};
