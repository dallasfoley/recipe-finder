"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Ingredient } from "./definitions";

export async function saveRecipe(formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/login");

  const userInfo = await getUser();
  if (!userInfo || !userInfo.email) {
    throw new Error("User information is not available.");
  }
  const userEmail = userInfo.email;

  // Get recipe info from formData
  const recipeId = formData.get("recipeId") as string;
  const recipeName = formData.get("recipeName") as string;
  const recipeImage = formData.get("recipeImage") as string;
  const recipeServings = formData.get("recipeServings") as string;
  const recipeReadyInMinutes = formData.get("recipeReadyInMinutes") as string;
  const recipeInstructions = formData.get("recipeInstructions") as string;
  const ingredientsCount = formData.get("ingredientsCount") as string;

  const ingredientNames: string[] = [];
  const ingredientAmounts: string[] = [];
  const ingredientUnits: string[] = [];
  for (let i = 0; i < Number(ingredientsCount); i++) {
    ingredientNames.push(`ingredientName${i}`);
  }
  for (let i = 0; i < Number(ingredientsCount); i++) {
    ingredientAmounts.push(`ingredientAmount${i}`);
  }
  for (let i = 0; i < Number(ingredientsCount); i++) {
    ingredientUnits.push(`ingredientUnit${i}`);
  }
  console.log("ingredientNames: ", ingredientNames);
  console.log("ingredientAmounts: ", ingredientAmounts);
  console.log("ingredientUnits: ", ingredientUnits);
  const ingredients: Ingredient[] = [];
  for (let i = 0; i < Number(ingredientsCount); i++) {
    if (ingredientNames[i] && ingredientAmounts[i] && ingredientUnits[i]) {
      ingredients.push({
        name: formData.get(ingredientNames[i]) as string,
        amount: Number(formData.get(ingredientAmounts[i])),
        unit: formData.get(ingredientUnits[i]) as string,
      });
    }
  }
  console.log("ingredients: ", ingredients);

  let user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: userEmail,
      },
    });
  }

  await prisma.recipe.create({
    data: {
      id: recipeId,
      title: recipeName,
      servings: Number(recipeServings),
      image: recipeImage,
      readyInMinutes: Number(recipeReadyInMinutes),
      instructions: recipeInstructions,
      user: {
        connect: {
          id: user.id,
        },
      },
      extendedIngredients: {
        create: ingredients.map((ingredient) => ({
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        })),
      },
    },
  });

  revalidatePath("/recipes/saved");
  redirect("/recipes/saved");
}

export async function deleteRecipe(formData: FormData) {
  const recipeId = formData.get("recipeId") as string;
  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });
  revalidatePath("/recipes/saved");
}

export async function editRecipe(formData: FormData) {
  const recipeId = formData.get("recipeId") as string;
  const recipeTitle = formData.get("title") as string;
  const readyInMinutes = formData.get("readyInMinutes") as string;
  const servings = formData.get("servings") as string;
  const instructions = formData.get("instructions") as string;

  // Ingredients
  const ingredients: Ingredient[] = [];
  const ingredientCount = formData.getAll("recipeIngredients").length / 3; // 3 fields per ingredient

  for (let i = 0; i < ingredientCount; i++) {
    ingredients.push({
      name: formData.get(`recipeIngredients[${i}].name`) as string,
      amount: Number(formData.get(`recipeIngredients[${i}].amount`)), // Convert to number
      unit: formData.get(`recipeIngredients[${i}].unit`) as string,
    });
  }

  // Update the main recipe details
  await prisma.recipe.update({
    where: { id: recipeId },
    data: {
      title: recipeTitle,
      readyInMinutes: parseFloat(readyInMinutes),
      servings: parseFloat(servings),
      instructions: instructions,
    },
  });

  // Clear existing ingredients and recreate them
  await prisma.ingredient.deleteMany({
    where: { recipeId },
  });

  await prisma.ingredient.createMany({
    data: ingredients.map((ingredient) => ({
      ...ingredient,
      recipeId,
    })),
  });

  // Revalidate the page and redirect
  revalidatePath(`/recipes/edit/${recipeId}`);
  redirect(`/recipes/saved`);
}
