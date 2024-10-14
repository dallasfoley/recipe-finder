import Image from "next/image";
import parse from "html-react-parser";

const RecipeResult = async ({ params }: { params: { id: string } }) => {
  const fetchRecipe = async () => {
    const apiUrl = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.API_KEY}`;
    const res = await fetch(apiUrl);
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to fetch recipe");
    }
    const data: RecipeInstructions = await res.json();
    console.log("data: ", data);
    return data;
  };

  const recipe = await fetchRecipe();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-3xl text-center font-semibold m-8 md:m-12">
        {recipe?.title}
      </h2>
      <Image
        src={recipe.image}
        alt="No picture provided"
        height={300}
        width={300}
      />
      <div className="flex items-center gap-16 m-12">
        <h5 className="text-lg md:text-2xl">
          Ready in {recipe.readyInMinutes} minutes
        </h5>
        <h5 className="text-lg md:text-2xl">
          Makes {recipe.servings} servings
        </h5>
      </div>
      <h3 className="text-lg md:text-2xl text-center font-semibold">
        Instructions
      </h3>
      <p className="text-center p-4 md:mx-24">{parse(recipe.instructions)}</p>
    </div>
  );
};

export default RecipeResult;
