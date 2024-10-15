import { fetchRecipe } from "@/app/lib/data";
import { editRecipe } from "@/app/lib/actions";

const EditRecipe = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipe(params.id);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-bold mt-8">Edit Recipe</h1>
      <form action={editRecipe} className="w-full max-w-lg p-8 space-y-8">
        <input type="hidden" name="recipeId" value={recipe.id} />

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={recipe.title}
            placeholder="Recipe Title"
            className="p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="readyInMinutes">
            Ready in Minutes
          </label>
          <input
            id="readyInMinutes"
            type="number"
            name="readyInMinutes"
            defaultValue={recipe.readyInMinutes.toString()}
            placeholder="Ready in minutes"
            className="p-2 text-black  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="servings">
            Servings
          </label>
          <input
            id="servings"
            type="number"
            name="servings"
            defaultValue={recipe.servings.toString()}
            placeholder="Servings"
            className="p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium" htmlFor="instructions">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            defaultValue={recipe.instructions}
            placeholder="Instructions"
            className="p-2 text-black border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <h3 className="text-xl font-semibold mt-8">Ingredients</h3>
        <div className="space-y-6">
          {recipe.extendedIngredients.map((ingredient, index) => (
            <div
              key={ingredient.name}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-medium">Ingredient Name</label>
                <input
                  type="text"
                  name={`recipeIngredients[${index}].name`}
                  defaultValue={ingredient.name}
                  placeholder="Ingredient Name"
                  className="p-2 text-black  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-medium">Amount</label>
                <input
                  type="number"
                  name={`recipeIngredients[${index}].amount`}
                  defaultValue={ingredient.amount.toString()}
                  placeholder="Amount"
                  className="p-2 border text-black  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-medium">Unit</label>
                <input
                  type="text"
                  name={`recipeIngredients[${index}].unit`}
                  defaultValue={ingredient.unit}
                  placeholder="Unit"
                  className="p-2 border text-black  border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-8 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
