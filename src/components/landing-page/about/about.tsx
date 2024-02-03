import React from "react";
import AboutSVG from "./about-svg";
import TitleSection from "../../global/title-section";
import { Button } from "../../ui/button";
import { TabsTrigger } from "../../ui/tabs";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="grid lg:grid-cols-2 gap-4">
      <div className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          title="Engineer • Developer • Data Scientist"
          subheading="Get to know more about Animesh"
          pill="✨ This is Animesh Sharma"
        />
        <br className="sm:flex md:hidden" />

        <p className="text-md dark:text-washed-purple-600 text-justify">
          As a software engineer and data scientist, I excel in coding and
          problem-solving. Known for quick learning and teamwork, I thrive in
          collaborative environments. Specializing in web, mobile, and AI
          development, I integrate vision with technical skills for innovative
          solutions. With a strong background, I deliver comprehensive business
          solutions, utilizing technologies like Next.js and React. Committed to
          continual growth, I maintain a positive demeanor, actively seeking
          opportunities to enhance my developer skills.
        </p>
        {/* <p className="text-md dark:text-washed-purple-600">
          I specialize in web and mobile development, as well as AI. I am
          enthusiastic about integrating your vision with my technical skills to
          develop innovative solutions that align with your objectives.
        </p>

        <p className="text-md dark:text-washed-purple-600">
          With a substantial background, I have successfully delivered
          comprehensive business solutions and translated concepts into tangible
          products. My expertise spans research, establishing product
          frameworks, and utilizing technologies such as Next.js and React.
        </p>

        <p className="text-md dark:text-washed-purple-600">
          Maintaining a positive demeanor and a commitment to continual growth,
          I actively seek opportunities to enhance my knowledge and skills as a
          developer.
        </p> */}
        <br className="sm:flex md:hidden" />

        <div className="flex flex-row items-center justify-center w-full space-x-1">
          <SocialIcon
            url="https://www.linkedin.com/in/animesh-algorithm/"
            bgColor="#030014"
            fgColor="#ffffff"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            url="https://www.github.com/animesh-algorithm/"
            bgColor="#030014"
            fgColor="#ffffff"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            url="https://www.youtube.com/@animesh.algorithm"
            bgColor="#030014"
            fgColor="#ffffff"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            url="https://www.instagram.com/animesh.algorithm"
            bgColor="#030014"
            fgColor="#ffffff"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            url="https://www.twitter.com/animesh_algo"
            bgColor="#030014"
            fgColor="#ffffff"
            style={{ height: 40, width: 40 }}
          />
        </div>
        <br className="sm:flex md:hidden" />

        <Button
          // variant="default"
          className="w-full rounded-[10px] p-6 text-2xl"
        >
          <Link href="#contact">Interested? Let's talk!</Link>
        </Button>
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <AboutSVG />
        <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-1/2 right-0 absolute z-10"></div>
      </div>
    </div>
  );
};

export default About;
