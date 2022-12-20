import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-5 space-x-2 font-bold">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            src="/logo.jpeg"
            width={50}
            height={50}
            alt=""
          />
        </Link>
        <h1>The Blog Post</h1>
      </div>
      <div>
        <Link
          href="/"
          className="px-5 py-3 text-sm bg-black text-[#f7ab0a] flex items-center rounded-full 
          md:text-base"
        >
          Email: umituysal@hotmail.com
        </Link>
      </div>
    </header>
  );
}

export default Header;
