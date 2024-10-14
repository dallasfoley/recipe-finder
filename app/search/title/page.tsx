import TitleForm from "@/app/ui/search/titleForm";

const SearchByTitle = () => {
  return (
    <section className="flex flex-col mt-12 md:mt-24 lg:mt-36 items-center min-h-screen">
      <h1 className="text-center text-2xl md:text-4xl font-semibold m-16">
        What dish would you like a recipe for?
      </h1>
      <TitleForm />
    </section>
  );
};

export default SearchByTitle;
