"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { searchByTitle } from "@/app/lib/actions";
import { useState } from "react";

const TitleForm = () => {
  const [query, setQuery] = useState("");
  const [numOfRecipes, setNumOfRecipes] = useState(1);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form name: ", query);
    router.push(
      `/recipes/searchByName?query=${query}&numOfRecipes=${numOfRecipes}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-8 text-black"
    >
      <input
        type="text"
        name="name"
        placeholder="Chicken alfredo"
        className="w-72 md:w-96 h-12 rounded-xl p-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <input
        type="number"
        name="numOfRecipes"
        min={1}
        max={10}
        defaultValue={1}
        onChange={(e) => setNumOfRecipes(Number(e.target.value))}
        className="h-12 w-20 rounded-xl p-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
      />
      <button
        className="h-12 w-12 rounded-xl text-slate-900 bg-white border-2 border-gray-300 flex justify-center items-center
        transition duration-300 ease-in-out hover:scale-110 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500"
        type="submit"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} height={24} width={24} />
      </button>
    </form>
  );
};

export default TitleForm;
