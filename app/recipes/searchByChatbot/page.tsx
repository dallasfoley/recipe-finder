import BackButton from "@/app/ui/backButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipe Results",
};

type Props = {
  searchParams: {
    text: string;
  };
};

type ChatbotResponse = {
  answerText: string;
  media: MediaType[];
};

type MediaType = {
  title: string;
  image: string;
  link: string;
};

export default async function ResultsPage({ searchParams }: Props) {
  const { text } = searchParams;

  const fetchResponse = async () => {
    const fullQuery = `${text}`.replace(/ /g, "+");
    const apiUrl = `https://api.spoonacular.com/food/converse?text=${fullQuery}&apiKey=${process.env.API_KEY}`;
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await res.json();
      console.log(data);
      return data as ChatbotResponse;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  };

  const response = await fetchResponse();

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-8 flex flex-col items-center">
      {response ? (
        <>
          <h1 className="text-3xl md:text-5xl font-bold my-10 text-center">
            {response.answerText}
          </h1>
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {response.media.map((element, id) => (
              <li key={id} className="flex flex-col items-center">
                <Image
                  src={element.image}
                  alt={element.title}
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <Link href={element.link}>
                  <h4 className="text-lg font-semibold text-center transition-transform hover:text-blue-600 transform hover:scale-105">
                    {element.title}
                  </h4>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-red-500 text-lg font-semibold">
          No recipes found or an error occurred while fetching data.
        </p>
      )}
      <BackButton />
    </div>
  );
}
