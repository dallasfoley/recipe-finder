import Image from "next/image";
import parse from "html-react-parser";
import { saveRecipe } from "@/app/lib/actions";
import { Recipe } from "@/app/lib/definitions";

const RecipeResult = async ({ params }: { params: { id: string } }) => {
  const fetchRecipe = async () => {
    const apiUrl = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.API_KEY}`;
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch recipe");
    }
    const data: Recipe = await res.json();
    return data;
  };

  const recipe = await fetchRecipe();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
      <h2 className="text-3xl md:text-4xl font-bold text-center my-8">
        {recipe?.title}
      </h2>
      <div className="relative w-full h-96">
        <Image
          src={recipe.image}
          alt="Recipe Image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 my-8">
        <h5 className="text-lg md:text-2xl">
          Ready in{" "}
          <span className="font-semibold">{recipe.readyInMinutes}</span> minutes
        </h5>
        <h5 className="text-lg md:text-2xl">
          Servings: <span className="font-semibold">{recipe.servings}</span>
        </h5>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Ingredients</h3>
        <ul className="space-y-2">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
            >
              <span>{ingredient.name}</span>
              <span className="font-semibold">
                {ingredient.amount} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-center">Instructions</h3>
        <p className="text-center md:mx-24 p-4">
          {recipe.instructions
            ? parse(recipe.instructions)
            : "No instructions available."}
        </p>
      </div>
      <form action={saveRecipe} className="text-center">
        <input type="hidden" name="recipeId" value={recipe.id} />
        <input type="hidden" name="recipeName" value={recipe.title} />
        <input type="hidden" name="recipeImage" value={recipe.image} />
        <input type="hidden" name="recipeServings" value={recipe.servings} />
        <input
          type="hidden"
          name="recipeReadyInMinutes"
          value={recipe.readyInMinutes}
        />
        <input
          type="hidden"
          name="ingredientsCount"
          value={recipe.extendedIngredients.length}
        />
        <input
          type="hidden"
          name="recipeInstructions"
          value={recipe.instructions}
        />
        {recipe.extendedIngredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="hidden"
              name={`ingredientName${index}`}
              value={ingredient.name}
            />
            <input
              type="hidden"
              name={`ingredientAmount${index}`}
              value={ingredient.amount}
            />
            <input
              type="hidden"
              name={`ingredientUnit${index}`}
              value={ingredient.unit}
            />
          </div>
        ))}
        <button
          type="submit"
          className="h-12 w-36 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-900 m-8"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeResult;
