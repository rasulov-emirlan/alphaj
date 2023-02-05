import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="h-16 w-full bg-blue-500 text-white">
      <nav className="mx-auto flex h-full max-w-[1260px] items-center justify-between px-2">
        <Link href="/" className="text-2xl hover:text-pink-300">
          Alpha Japanese
        </Link>

        <Link href="/admin" className="hover:text-pink-300">
          admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
