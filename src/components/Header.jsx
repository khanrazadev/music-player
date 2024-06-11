import profilePic from "../../public/profile-picture.png";
import Logo from "../assets/logo.svg";

function Header() {
  return (
    <div className="hidden sm:block col-span-2">
      <div className="flex h-full flex-col justify-between">
        <img className="h-10 w-36" src={Logo} alt="Logo" />
        <img className="w-12 h-12" src={profilePic} alt="Profile" />
      </div>
    </div>
  );
}

export default Header;
