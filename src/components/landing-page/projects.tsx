import React from "react";

const Projects = () => {
  return (
    <div id="projects" className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Projects</h1>
      <ul className="flex flex-col gap-2">
        <li>
          <a
            href="https://example.com"
            className="text-white/40"
            target="_blank"
          >
            Project 1
          </a>
        </li>
        <li>
          <a
            href="https://example.com"
            className="text-white/40"
            target="_blank"
          >
            Project 2
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Projects;
