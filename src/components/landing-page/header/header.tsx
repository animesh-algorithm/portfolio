import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  TabsList,
  TabsTrigger,
  SecondaryTabsTrigger,
  SecondaryTabsList,
} from "../../ui/tabs";
import DownloadResumeButton from "./download-resume";
import AiChatButton from "@/components/ai-chat/ai-chat-button";

const routes = [
  { title: "About", id: "about", href: "#about" },
  { title: "Projects", id: "projects", href: "#projects" },
  { title: "Blog", id: "blog", href: "#blog" },
  { title: "Contact", id: "contact", href: "#contact" },
];

const Header = () => {
  return (
    <header className="p-4 flex justify-center items-center">
      <SecondaryTabsList className="flex gap-2 items-center w-full justify-start">
        <SecondaryTabsTrigger
          value="about"
          className="flex gap-2 items-center w-full justify-start"
        >
          <Image src="/icon.png" alt="Cypress Logo" width={25} height={25} />
          <span className="font-semibold dark:text-white">Animesh.</span>
        </SecondaryTabsTrigger>
      </SecondaryTabsList>

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
      <AiChatButton />
      <DownloadResumeButton />
    </header>
  );
};

export default Header;
