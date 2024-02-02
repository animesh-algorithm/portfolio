import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import DownloadResumeButton from "./download-resume";

const routes = [
  { title: "About", id: "about", href: "#about" },
  { title: "Skills", id: "skills", href: "#skills" },
  { title: "Projects", id: "projects", href: "#projects" },
  { title: "Blogs", id: "blogs", href: "#blogs" },
  { title: "Contact", id: "contact", href: "#contact" },
];

const Header = () => {
  return (
    <header className="p-4 flex justify-center items-center">
      <Link href={"/"} className="flex gap-2 items-center w-full justify-start">
        <Image src="/icon.jpeg" alt="Cypress Logo" width={25} height={25} />
        <span className="font-semibold dark:text-white">Animesh.</span>
      </Link>
      <TabsList className="hidden md:flex items-center justify-center">
        {routes.map((route) => (
          <TabsTrigger
            key={route.title}
            value={route.id}
            className="text-white/70"
          >
            {route.title}
          </TabsTrigger>
        ))}
      </TabsList>

      <DownloadResumeButton />
    </header>
  );
};

export default Header;
