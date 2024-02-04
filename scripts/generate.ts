import dotenv from "dotenv";
dotenv.config({ path: ".env" });
// Configure dotenv before other imports
import { DocumentInterface } from "@langchain/core/documents";
import { Redis } from "@upstash/redis";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

async function generateEmbeddings() {
  await Redis.fromEnv().flushdb();

  const vectorStore = await getVectorStore();

  (await getEmbeddingsCollection()).deleteMany({});

  const loader = new DirectoryLoader(
    "public/",
    {
      ".pdf": (path) => new PDFLoader(path),
    },
    true
  );

  const docs = (await loader.load()).map((doc): DocumentInterface => {
    const url = doc.metadata.source.replace(/\\/g, "/");

    const pageContentTrimmed = doc.pageContent
      .replace(/^\s*[\r]/gm, "") // remove empty lines
      .trim();

    return {
      pageContent: pageContentTrimmed,
      metadata: { url },
    };
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 500,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();
