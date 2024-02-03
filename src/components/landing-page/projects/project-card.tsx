import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import { ScreenShare } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProjectCardContent from "./project-card-content";

const ProjectCard = ({ project }: any) => {
  return (
    <Card className="bg-background cursor-pointer flex flex-col h-full">
      <CardImage className="rounded-t-lg">
        <Image
          src={`/projects/${project.slug}.png`}
          className="rounded-t-lg aspect-video"
          alt={project.title}
          width={1920}
          height={1080}
        />
      </CardImage>
      <CardHeader>
        <CardTitle className="text-washed-purple-300">
          {project.title}
        </CardTitle>
      </CardHeader>
      <div className="text-washed-purple-300 flex gap-2 justify-start items-left flex-wrap pl-6 pr-6 pb-4">
        {project.tags &&
          project.tags.map((tag: string) => (
            <div
              key={tag}
              className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple"
            >
              <div className="rounded-full px-3 py-1 dark:bg-black">{tag}</div>
            </div>
          ))}
      </div>

      <CardDescription className="text-washed-purple-300 text-justify">
        {project.description.slice(0, 200)}
        <span className="text-washed-purple-300 text-justify dark:text-washed-purple-600">
          ...Read More
        </span>
      </CardDescription>
      <ProjectCardContent source={project.source} demo={project.demo} />
    </Card>
  );
};

export default ProjectCard;
