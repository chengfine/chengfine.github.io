import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLatestPost(category: string) {
  try {
    const categoryPath = path.join(__dirname, `../src/${category}`);

    // 检查目录是否存在
    if (!fs.existsSync(categoryPath)) {
      return `/${category}/`;
    }

    const entries = fs.readdirSync(categoryPath, { withFileTypes: true });

    // 处理其他目录（record, photo 等）
    const posts = entries
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"))
      .map((dirent) => dirent.name)
      .sort((a, b) => b.localeCompare(a));

    if (posts.length === 0) return `/${category}/`;
    const latestPost = posts[0].replace(".md", "");
    return path.posix.join("/", category, latestPost);
  } catch (error) {
    console.error(`Error getting latest post for ${category}:`, error);
    return `/${category}/`;
  }
}

export const nav = [
  {
    text: "Blog",
    link: getLatestPost("blog"),
    activeMatch: "^/blog/",
  },
  {
    text: "Record",
    link: getLatestPost("record"),
    activeMatch: "^/record/",
  },
  {
    text: "Fitness",
    link: getLatestPost("fitness"),
    activeMatch: "^/fitness/",
  },
  // {
  //   text: '相册',
  //   link: getLatestPost('photo'),
  //   activeMatch: '^/photo/'
  // }
];
