"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ScreenShare } from "lucide-react";
import React from "react";

const ProjectCardContent = ({
  source,
  demo,
}: {
  source: string;
  demo: string;
}) => {
  return (
    <CardContent className="grid grid-cols-2 gap-6 mt-auto">
      <Button
        variant="outline"
        className="dark:bg-gradient-to-r
          dark:from-brand-primaryBlue
          dark:to-brand-primaryPurple"
        onClick={() => window.open(source, "_blank")}
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Source
      </Button>
      <Button
        variant="outline"
        className="dark:bg-gradient-to-r
          dark:from-brand-primaryBlue
          dark:to-brand-primaryPurple"
        onClick={() => window.open(demo, "_blank")}
      >
        <ScreenShare className="mr-2 h-4 w-4" />
        Live
      </Button>
    </CardContent>
  );
};

export default ProjectCardContent;
