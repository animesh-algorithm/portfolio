import About from "@/components/landing-page/about/about";
import Blog from "@/components/landing-page/blog/blog";
import Contact from "@/components/landing-page/contact/contact";
import Projects from "@/components/landing-page/projects/projects";
import Skills from "@/components/landing-page/skills/skills";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <TabsContent value="about" className="space-y-4">
        <About />
      </TabsContent>
      <TabsContent value="skills" className="space-y-4">
        <Skills />
      </TabsContent>
      <TabsContent value="projects" className="space-y-4">
        <Projects />
      </TabsContent>
      <TabsContent value="blog" className="space-y-4">
        <Blog />
      </TabsContent>
      <TabsContent value="contact" className="space-y-4">
        <Contact />
      </TabsContent>
    </div>
  );
};

export default LandingPage;
