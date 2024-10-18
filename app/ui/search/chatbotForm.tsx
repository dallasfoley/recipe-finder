"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ChatbotForm = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form name: ", query);
    router.push(`/recipes/searchByChatbot?text=${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-8 text-black"
    >
      <input
        type="text"
        name="name"
        placeholder="Pasta recipes..."
        className="w-72 md:w-96 h-12 rounded-xl p-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
        onChange={(e) => setQuery(e.target.value)}
        required
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

export default ChatbotForm;
