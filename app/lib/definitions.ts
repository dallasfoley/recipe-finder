type RecipeInstructions = {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  extendedIngredients: Ingredient[];
};

type Ingredient = {
  name: string;
  amount: number;
  unit: string;
  original: string;
};

type Recipe = {
  id: number;
  title: string;
  image: string;
};
