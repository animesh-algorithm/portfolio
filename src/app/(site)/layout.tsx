import About from "@/components/landing-page/about/about";
import Blog from "@/components/landing-page/blog/blog";
import Blogs from "@/components/landing-page/blog/blog";
import Contact from "@/components/landing-page/contact/contact";
import Footer from "@/components/landing-page/footer/footer";
import Header from "@/components/landing-page/header/header";
import MobileHeader from "@/components/landing-page/header/mobile-header";
import Projects from "@/components/landing-page/projects/projects";
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
        <Projects />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default HomePageLayout;
