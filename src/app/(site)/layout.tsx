import About from "@/components/landing-page/about";
import Blogs from "@/components/landing-page/blogs";
import Contact from "@/components/landing-page/contact";
import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import MobileHeader from "@/components/landing-page/mobile-header";
import Projects from "@/components/landing-page/projects";
import Skills from "@/components/landing-page/skills";
import { Tabs } from "@/components/ui/tabs";
import React from "react";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Tabs defaultValue="about" className="space-y-4 hidden md:block">
        <Header />
        {children}
      </Tabs>
      <div className="sm:flex md:hidden">
        <MobileHeader />
        <About />
        {/* <Skills />
        <Projects />
        <Blogs />
        <Contact /> */}
        <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default HomePageLayout;
