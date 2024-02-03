import TitleSection from "@/components/global/title-section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardImage, CardTitle } from "@/components/ui/card";
import { getAllFinishedProjects } from "@/lib/notion/projects";
import Image from "next/image";
import Link from "next/link";
import React, { cache } from "react";
import ProjectCard from "./project-card";

export const getProjectsData = cache(async () => {
  const projects = await getAllFinishedProjects();
  return projects;
});

const Projects = async () => {
  const projects = await getProjectsData();
  return (
    <div id="projects" className="flex flex-col gap-2">
      <div className="md:hidden grid grid-cols-1 p-4 gap-4">
        <TitleSection
          title=""
          subheading="Check out some of the cool projects I have worked on"
          pill="🚀 Projects"
        />
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Link href="/projects" target="_blank">
          <Button variant={"default"} className="rounded-lg p-2 w-full">
            More Cool Projects
          </Button>
        </Link>
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
