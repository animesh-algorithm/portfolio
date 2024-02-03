import Image from "next/image";
import Link from "next/link";
import React from "react";

import DownloadResumeButton from "./download-resume";
import AiChatButton from "@/components/ai-chat/ai-chat-button";

const MobileHeader = () => {
  return (
    <header className="p-4 flex justify-center items-center">
      <Link href={"/"} className="flex gap-2 items-center w-full justify-start">
        <Image src="/icon.png" alt="Cypress Logo" width={25} height={25} />
        <span className="font-semibold dark:text-white">Animesh.</span>
      </Link>
      <DownloadResumeButton />
    </header>
  );
};

export default MobileHeader;
