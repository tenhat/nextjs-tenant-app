import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

const fileNames = fs.readdirSync(postDirectory);
export const allPostsData = fileNames.map((fileName) => {
  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    id, 
    ...(matterResult.data as {title: string; date: string; thumbnail: string}),
  }
})

export const paths = fileNames.map((fileName) => {
  return {
    params: {
      id: fileName.replace(/\.md$/, ""),
    }
  }
})

export async function getPostData(id: string) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHTML = processedContent.toString();
  return {
    id, 
    contentHTML,
    ...matterResult.data,
  }
}
