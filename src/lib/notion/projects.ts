import { notion } from "./blog";

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags?.map((tag: any) => {
      return tag.name;
    });

    return allTags;
  };
  return {
    id: post.id,
    title: post.properties.title.title[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    description: post.properties.description.rich_text[0].plain_text,
    slug: post.properties.slug.rich_text[0].plain_text,
    thumbnail: post.properties.thumbnail.files[0].file.url,
    source: post.properties.source.url,
    demo: post.properties.demo.url,
  };
};

export const getAllFinishedProjects = async () => {
  const projects = await notion.databases.query({
    auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
    database_id: process.env.NEXT_PUBLIC_PROJECT_DATABASE_ID!,
    filter: {
      property: "finished",
      checkbox: {
        equals: true,
      },
    },
  });
  const allProjects = projects.results;
  return allProjects?.map((project: any) => {
    return getPageMetaData(project);
  });
};
