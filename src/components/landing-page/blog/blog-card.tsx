import {
  Card,
  CardDescription,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const BlogCard = ({ article }: any) => {
  return (
    <Card className="bg-background cursor-pointer">
      <CardImage className="rounded-t-lg">
        <Image
          src={`/blog/${article.slug}.png`}
          className="
              rounded-t-lg aspect-video
              "
          alt={article.title}
          width={1920}
          height={1080}
        />
      </CardImage>
      <CardHeader>
        <CardTitle className="text-washed-purple-300">
          {article.title}
        </CardTitle>
      </CardHeader>
      <div className="text-washed-purple-300 flex gap-2 justify-start items-left flex-wrap pl-6 pr-6 pb-4">
        {article.tags &&
          article.tags.map((tag: string) => (
            <div
              key={tag}
              className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple"
            >
              <div className="rounded-full px-3 py-1 dark:bg-black">{tag}</div>
            </div>
          ))}
      </div>
      <CardDescription className="text-washed-purple-300 text-justify">
        {article.description.slice(0, 200)}
        <span className="text-washed-purple-300 text-justify dark:text-washed-purple-600">
          ...Read More
        </span>
      </CardDescription>
    </Card>
  );
};

export default BlogCard;
