import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getLatestPosts } from "../docs/src/utils/getLatestPosts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "../docs/src");
const latestPosts = getLatestPosts(basePath);

// 更新首页文件
const indexPath = path.resolve(__dirname, "../docs/src/index.md");
let content = fs.readFileSync(indexPath, "utf-8");

// 更新博客链接
content = content.replace(/link: \/blog\/.*/, `link: ${latestPosts.blog}`);

// 更新记录链接
content = content.replace(/link: \/record\/.*/, `link: ${latestPosts.record}`);

fs.writeFileSync(indexPath, content);

console.log("Updated latest links in index.md:");
console.log("Latest blog:", latestPosts.blog);
console.log("Latest record:", latestPosts.record);
