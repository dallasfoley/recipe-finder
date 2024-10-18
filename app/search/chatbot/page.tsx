import ChatbotForm from "@/app/ui/search/chatbotForm";
import React from "react";

const Chatbot = () => {
  return (
    <section className="flex flex-col mt-12 md:mt-24 lg:mt-36 items-center min-h-screen">
      <h1 className="text-center text-2xl md:text-4xl font-semibold m-8">
        Ask an AI-powered chatbot for inspiration for your next meal
      </h1>
      <ChatbotForm />
    </section>
  );
};

export default Chatbot;
