"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.replace("/search/chatbot");
  };

  return (
    <button
      onClick={handleClick}
      className="text-lg font-semibold w-16 h-16 rounded-xl m-8 bg-blue-500 text-center transition-transform hover:bg-blue-900 transform hover:scale-105"
    >
      Back
    </button>
  );
};

export default BackButton;
