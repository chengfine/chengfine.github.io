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
        const basePath = path.join(__dirname, "../../src");
        const latestPosts = getLatestPosts(basePath);

        // 读取首页内容
        const indexPath = path.join(basePath, "index.md");
        if (!fs.existsSync(indexPath)) {
          console.error('Index file not found:', indexPath);
          return;
        }

        let content = fs.readFileSync(indexPath, "utf-8");

        // 更新链接
        content = content.replace(
          /link: \/blog\/.*?\n/g,
          `link: ${latestPosts.blog}\n`
        );
        content = content.replace(
          /link: \/record\/.*?\n/g,
          `link: ${latestPosts.record}\n`
        );

        // 写回文件
        fs.writeFileSync(indexPath, content);
      } catch (error) {
        console.error('Error updating home links:', error);
      }
    },
  };
};
