"use client";
import React from "react";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";

const DownloadResumeButton = () => {
  const downloadResume = (e: any) => {
    e.preventDefault();
    window.open("/Resume — Animesh-Sharma.pdf", "_blank");
  };

  return (
    <aside className="flex gap-2 justify-end w-full">
      <Button
        variant="btn-primary"
        className="whitespace-nowrap"
        onClick={downloadResume}
      >
        <div
          className="text-washed-blue-50 flex items-center gap-1"
          style={{ fontSize: "1rem" }}
        >
          <FileDown />
          Resume
        </div>
      </Button>
    </aside>
  );
};

export default DownloadResumeButton;
