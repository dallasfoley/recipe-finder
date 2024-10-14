import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipe Results",
};

type Props = {
  searchParams: {
    query: string;
    numOfRecipes: string;
  };
};

export default async function ResultsPage({ searchParams }: Props) {
  const { query, numOfRecipes } = searchParams;
  console.log("name: ", query);
  const fetchRecipes = async () => {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${numOfRecipes}&apiKey=${process.env.API_KEY}`;
    console.log("apiUrl: ", apiUrl);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to fetch recipes");
      }
      const data = await res.json();
      console.log("data.results: ", data.results);
      return data.results as Recipe[];
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };

  // Call the fetch function and handle the result
  const recipes = await fetchRecipes();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-semibold my-8">
        Recipe Results
      </h1>
      <ul className="flex flex-col gap-8">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="p-4 flex flex-col items-center gap-8 border-b border-gray-300"
            >
              <Link href={`/recipes/searchByName/${recipe.id}`}>
                <h3 className="text-xl text-center font-semibold transition duration-300 ease-in-out hover:scale-110">
                  {recipe.title}
                </h3>
              </Link>

              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={300}
                className="m-8"
              />
            </li>
          ))
        ) : (
          <p className="text-center">
            No recipes found or an error occurred while fetching data.
          </p>
        )}
      </ul>
    </div>
  );
}
