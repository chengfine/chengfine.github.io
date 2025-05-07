import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', __dirname);
console.log('Current working directory:', process.cwd());

// 获取最新的博客文章
const blogDir = path.resolve(__dirname, "../docs/src/blog");
console.log("Blog directory:", blogDir);
console.log("Blog directory exists:", fs.existsSync(blogDir));

const blogYears = fs.readdirSync(blogDir);
console.log("Blog years:", blogYears);
let latestBlog = "";
let latestBlogDate = "";

for (const year of blogYears) {
  const yearDir = path.join(blogDir, year);
  console.log("Processing year directory:", yearDir);
  if (fs.statSync(yearDir).isDirectory()) {
    const posts = fs.readdirSync(yearDir);
    console.log(`Posts in ${year}:`, posts);
    for (const post of posts) {
      if (post.endsWith(".md")) {
        const postPath = path.join(yearDir, post);
        const stats = fs.statSync(postPath);
        if (!latestBlogDate || stats.mtime > new Date(latestBlogDate)) {
          latestBlogDate = stats.mtime.toISOString();
          latestBlog = `/blog/${year}/${post.replace(".md", "")}`;
          console.log("Found newer blog post:", latestBlog);
        }
      }
    }
  }
}

// 获取最新的记录
const recordDir = path.resolve(__dirname, "../docs/src/record");
console.log("Record directory:", recordDir);
console.log("Record directory exists:", fs.existsSync(recordDir));

const records = fs.readdirSync(recordDir);
console.log("Records:", records);
let latestRecord = "";
let latestRecordDate = "";

for (const record of records) {
  if (record.endsWith(".md")) {
    const recordPath = path.join(recordDir, record);
    const stats = fs.statSync(recordPath);
    if (!latestRecordDate || stats.mtime > new Date(latestRecordDate)) {
      latestRecordDate = stats.mtime.toISOString();
      latestRecord = `/record/${record.replace(".md", "")}`;
      console.log("Found newer record:", latestRecord);
    }
  }
}

// 更新首页文件
const indexPath = path.resolve(__dirname, "../docs/src/index.md");
console.log("Index file path:", indexPath);
console.log("Index file exists:", fs.existsSync(indexPath));

let content = fs.readFileSync(indexPath, "utf-8");
console.log("Original content:", content);

// 更新博客链接
content = content.replace(/link: \/blog\/.*/, `link: ${latestBlog}`);

// 更新记录链接
content = content.replace(/link: \/record\/.*/, `link: ${latestRecord}`);

console.log("Updated content:", content);
fs.writeFileSync(indexPath, content);

console.log("Updated latest links in index.md:");
console.log("Latest blog:", latestBlog);
console.log("Latest record:", latestRecord);
