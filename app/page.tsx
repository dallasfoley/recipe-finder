import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-12 md:mt-24 lg:mt-40 min-h-screen">
      <h1 className="text-center text-3xl md:text-5xl font-semibold">
        Welcome to Recipe Finder
      </h1>
      <h4 className="text-center text-2xl md:text-4xl font-semibold m-16">
        You can search for a dish&apos;s recipe by the dish&apos;s name or by
        it&apos;s ingredients
      </h4>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        <Link
          href="/search/title"
          className="bg-blue-600 w-64 h-12 rounded-lg flex justify-center items-center
          transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-900"
        >
          Search for a recipe by name
        </Link>
        <Link
          href="/search/ingredients"
          className="bg-blue-600 w-64 h-12 rounded-lg flex justify-center items-center
           transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-900"
        >
          Search for a recipe by ingredients
        </Link>
      </div>
    </main>
  );
}
