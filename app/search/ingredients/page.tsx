import IngredientsForm from "@/app/ui/search/ingredientsForm";

const SearchByIngredients = () => {
  return (
    <section className="flex flex-col mt-12 md:mt-24 lg:mt-36 items-center min-h-screen">
      <h1 className="text-center text-2xl md:text-4xl font-semibold m-8">
        List the ingredients you&apos;d like to use and the number of recipes
        you&apos;d like to receive
      </h1>
      <h3 className="text-center text-lg md:text-2xl m-8 text-gray-600">
        (add a comma between each ingredient and caps don&apos;t matter)
      </h3>
      <IngredientsForm />
    </section>
  );
};

export default SearchByIngredients;
