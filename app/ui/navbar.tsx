import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUtensils,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const NavBar = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = (await isAuthenticated()) ? true : false;

  return (
    <div className="flex justify-between items-center bg-zinc-800">
      <h2 className="text-2xl font-semibold m-8">Recipe Finder</h2>
      <div className="flex items-center justify-around m-8 gap-8">
        {authenticated ? (
          <LogoutLink
            title="Sign-Out"
            className="transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-2xl md:text-4xl"
            />
          </LogoutLink>
        ) : (
          <LoginLink
            title="Sign-In"
            className="transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-2xl md:text-4xl"
            />
          </LoginLink>
        )}

        <Link
          href="/"
          title="Home"
          className="transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faHouse} className="text-2xl md:text-4xl" />
        </Link>
        <Link
          href="/recipes/saved"
          className="transition duration-300 ease-in-out hover:-translate-y-2 hover:text-red-500"
          title="Saved Recipes"
        >
          <FontAwesomeIcon icon={faUtensils} className="text-2xl md:text-4xl" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
