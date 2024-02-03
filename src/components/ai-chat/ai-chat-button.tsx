"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bot, XCircle } from "lucide-react";
import AIChatBox from "./ai-chat-box";

const AiChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setChatBoxOpen(!chatBoxOpen)}
        className="fixed bottom-0 right-0 m-2 z-10"
      >
        {chatBoxOpen ? <XCircle size={24} /> : <Bot size={24} />}
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
};

export default AiChatButton;
