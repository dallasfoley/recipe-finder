import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUtensils } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center bg-slate-800">
      <h2 className="text-2xl font-semibold m-8">Recipe Finder</h2>
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className="m-8 transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faHouse} height={36} width={36} />
        </Link>
        <Link
          href="/recipes"
          className="m-8 transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faUtensils} height={36} width={36} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
