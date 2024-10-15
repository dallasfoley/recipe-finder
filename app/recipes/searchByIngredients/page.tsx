import { Recipe } from "@/app/lib/definitions";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipe Results",
};

type Props = {
  searchParams: {
    ingredients: string;
    numOfRecipes: string;
  };
};

export default async function ResultsPage({ searchParams }: Props) {
  const { ingredients, numOfRecipes } = searchParams;

  const fetchRecipes = async () => {
    const encodedIngredients = encodeURIComponent(ingredients).replace(
      /%20/g,
      "+"
    );
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedIngredients}&number=${numOfRecipes}&apiKey=${process.env.API_KEY}`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data: Recipe[] = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };

  const recipes = await fetchRecipes();

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold my-10 text-center">
        Recipe Results
      </h1>
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="p-4 flex flex-col items-center gap-4 border border-gray-200 shadow-lg rounded-lg transition-transform transform hover:scale-105"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
              <Link href={`/recipes/searchByIngredients/${recipe.id}`}>
                <h3 className="text-lg font-semibold text-center transition-colors hover:text-blue-600">
                  {recipe.title}
                </h3>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-red-500 text-lg font-semibold">
            No recipes found or an error occurred while fetching data.
          </p>
        )}
      </ul>
    </div>
  );
}
