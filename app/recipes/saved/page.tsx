import { fetchUserRecipes } from "@/app/lib/data";
import prisma from "@/app/lib/db";
import { Recipe } from "@/app/lib/definitions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteRecipe } from "@/app/lib/actions";

const SavedRecipes = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/login");
  const userInfo = await getUser();
  if (!userInfo || !userInfo.email) {
    throw new Error("User information is not available.");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: userInfo.email,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const recipes: Recipe[] = await fetchUserRecipes(user.id);

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-2xl md:text-4xl font-semibold m-8">Saved Recipes</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 p-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex flex-col rounded-2xl items-center border border-white p-8"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={300}
              height={300}
              className="m-8"
            />
            <Link href={`/recipes/searchByIngredients/${recipe.id}`}>
              <h3 className="text-xl text-center font-semibold transition duration-300 ease-in-out hover:text-red-500 hover:scale-105">
                {recipe.title}
              </h3>
            </Link>
            <div className="flex items-center gap-24 md:gap-36 mt-8">
              <Link href={`/recipes/edit/${recipe.id}`} title="Edit Recipe">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-4xl transition duration-300 ease-in-out hover:scale-110 hover:text-red-500"
                />
              </Link>
              <form action={deleteRecipe}>
                <input type="hidden" value={recipe.id} name="recipeId" />
                <button type="submit" title="Delete Recipe">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-4xl transition duration-300 ease-in-out hover:scale-110 hover:text-red-500"
                  />
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SavedRecipes;
