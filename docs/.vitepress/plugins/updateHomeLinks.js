import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getLatestPosts } from "../../src/utils/getLatestPosts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  return {
    name: "update-home-links",
    async buildStart() {
      try {
        // 使用 path.join 确保跨平台路径兼容性
        const basePath = path.join(__dirname, "../../src");
        console.log('Base path:', basePath);

        // 检查基础路径是否存在
        if (!fs.existsSync(basePath)) {
          console.error('Base path not found:', basePath);
          return;
        }

        const latestPosts = getLatestPosts(basePath);
        console.log('Latest posts:', latestPosts);

        // 读取首页内容
        const indexPath = path.join(basePath, "index.md");
        console.log('Index path:', indexPath);

        if (!fs.existsSync(indexPath)) {
          console.error('Index file not found:', indexPath);
          return;
        }

        let content = fs.readFileSync(indexPath, "utf-8");
        console.log('Original content:', content);

        // 更新链接，使用 path.posix.join 确保生成正斜杠的 URL 路径
        const updatedContent = content
          .replace(/link: \/blog\/.*?\n/g, `link: ${latestPosts.blog}\n`)
          .replace(/link: \/record\/.*?\n/g, `link: ${latestPosts.record}\n`);

        console.log('Updated content:', updatedContent);

        // 写回文件
        fs.writeFileSync(indexPath, updatedContent, 'utf-8');
        console.log('Successfully updated index.md');
      } catch (error) {
        console.error('Error updating home links:', error);
        // 重新抛出错误，让构建过程知道发生了错误
        throw error;
      }
    },
  };
};
