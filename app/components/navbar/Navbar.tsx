import Link from "next/link";
import Image from "next/image";

import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { getUserId } from '@/app/lib/actions';
import AddPropertyButton from "./AddPropertyButton";

const Navbar = async () => {
  const userId = await getUserId();

  console.log('userId:', userId);
  return (
    <nav className="w-full fixed top-0 left-0 py-4 border-b bg-white z-10">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between">          
          <Link href="/">
            <Image
              src="/logo.png"
              alt="DjangoBnb logo"
              width={180}
              height={38}
              priority
              className="w-[180px] h-auto"
            />
          </Link>

          {/* Center: SearchFilters */}
          <div className="flex-1 flex justify-center px-4">
            <SearchFilters />
          </div>

          {/* Right: User navigation */}
          <div className="flex items-center space-x-6">
            <AddPropertyButton
              userId={userId}
            />
            <UserNav 
              userId={userId}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
