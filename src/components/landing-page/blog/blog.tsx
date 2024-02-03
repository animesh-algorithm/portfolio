import TitleSection from "@/components/global/title-section";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardImage, CardTitle } from "@/components/ui/card";
import { getAllPublished } from "@/lib/notion/blog";
import Image from "next/image";
import Link from "next/link";
import React, { cache } from "react";
import BlogCard from "./blog-card";

export const getBlogData = cache(async () => {
  const articles = await getAllPublished();
  return articles;
});

const Blog = async () => {
  const articles = await getBlogData();

  return (
    <div id="blog">
      <div className="md:hidden grid grid-cols-1 p-4 gap-4">
        <TitleSection
          title=""
          subheading="Read the latest articles from Animesh"
          pill="📝 Blog"
        />
        {articles.slice(0, 3).map((article) => (
          <BlogCard article={article} key={article.slug} />
        ))}
        <Link href="https://blog.animesharma3.com" target="_blank">
          <Button variant={"default"} className="rounded-lg p-2 w-full">
            Read More
          </Button>
        </Link>
      </div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {articles.map((article) => (
          <BlogCard article={article} key={article.slug} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
