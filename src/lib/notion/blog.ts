import { Client } from "@notionhq/client";
// const { NotionToMarkdown } = require("notion-to-md");
export const notion = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
  baseUrl: "https://api.notion.com",
});

// const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
    database_id: process.env.NEXT_PUBLIC_BLOG_DATABASE_ID!,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "createdAt",
        direction: "descending",
      },
    ],
  });
  const allPosts = posts.results;
  return allPosts?.map((post: any) => {
    return getPageMetaData(post);
  });
};

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
    date: getToday(post.properties.createdAt.created_time),
    slug: post.properties.slug.rich_text[0].plain_text,
    thumbnail: post.properties.thumbnail.files[0].file.url,
  };
};

export function getToday(datestring: any) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today;
}

export const getSinglePost = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_DATABASE_ID!,
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  //   const mdblocks = await n2m.pageToMarkdown(page.id);
  //   const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    // markdown: mdString,
  };
};
