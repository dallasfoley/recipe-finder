import prisma from "./db";

export async function fetchUserRecipes(id: string) {
  const recipes = await prisma.recipe.findMany({
    where: {
      userId: id,
    },
    include: {
      extendedIngredients: true,
    },
  });
  return recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    instructions: recipe.instructions,
    readyInMinutes: Number(recipe.readyInMinutes),
    servings: Number(recipe.servings),
    extendedIngredients: recipe.extendedIngredients.map((ingredient) => ({
      name: ingredient.name,
      amount: Number(ingredient.amount),
      unit: ingredient.unit,
    })),
  }));
}

export async function fetchRecipe(id: string) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: id,
    },
    include: {
      extendedIngredients: true,
    },
  });
  if (!recipe) throw new Error("no recipe for that id");
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    instructions: recipe.instructions,
    readyInMinutes: Number(recipe.readyInMinutes),
    servings: Number(recipe.servings),
    extendedIngredients: recipe.extendedIngredients.map((ingredient) => ({
      name: ingredient.name,
      amount: Number(ingredient.amount),
      unit: ingredient.unit,
    })),
  };
}
