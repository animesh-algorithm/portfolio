"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";
import AIChatBox from "./ai-chat-box";

const AiChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(!chatBoxOpen)}>
        <Bot size={24} />
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
};

export default AiChatButton;
