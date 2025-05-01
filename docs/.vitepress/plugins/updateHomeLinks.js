import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLatestPosts } from '../../src/utils/getLatestPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  return {
    name: 'update-home-links',
    async buildStart() {
      const basePath = path.join(__dirname, '../../src');
      const latestPosts = getLatestPosts(basePath);
      
      // 读取首页内容
      const indexPath = path.join(basePath, 'index.md');
      let content = fs.readFileSync(indexPath, 'utf-8');
      
      // 更新链接
      content = content.replace(
        /link: \/blog\/.*?\n/g,
        `link: ${latestPosts.blog}\n`
      );
      content = content.replace(
        /link: \/diary\/.*?\n/g,
        `link: ${latestPosts.diary}\n`
      );
      content = content.replace(
        /link: \/photo\/.*?\n/g,
        `link: ${latestPosts.photo}\n`
      );
      
      // 写回文件
      fs.writeFileSync(indexPath, content);
    }
  };
}; 