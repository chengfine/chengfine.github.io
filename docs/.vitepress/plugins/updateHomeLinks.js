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

        // 检查基础路径是否存在
        if (!fs.existsSync(basePath)) {
          console.error('Base path not found:', basePath);
          return;
        }

        const latestPosts = getLatestPosts(basePath);

        // 读取首页内容
        const indexPath = path.join(basePath, "index.md");

        if (!fs.existsSync(indexPath)) {
          console.error('Index file not found:', indexPath);
          return;
        }

        let content = fs.readFileSync(indexPath, "utf-8");

        // 更新链接，使用 path.posix.join 确保生成正斜杠的 URL 路径
        // 使用正则表达式确保只替换匹配的行
        const updatedContent = content
          .replace(/^link: \/blog\/.*$/m, `link: ${latestPosts.blog}`)
          .replace(/^link: \/record\/.*$/m, `link: ${latestPosts.record}`);

        // 写回文件，使用 UTF-8 编码
        fs.writeFileSync(indexPath, updatedContent, 'utf-8');
      } catch (error) {
        console.error('Error updating home links:', error);
        throw error;
      }
    },
  };
};
