import fs from 'fs';
import path from 'path';

function generateSidebar() {
  const srcPath = path.join(__dirname, '../src');
  const sidebar = {};

  function processDirectory(dirPath, basePath = '') {
    const items = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // 先收集所有文件
    const files = [];
    const dirs = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        dirs.push(entry);
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        files.push(entry);
      }
    }

    // 处理文件，按文件名倒序排序（假设文件名包含日期）
    const sortedFiles = files.sort((a, b) => b.name.localeCompare(a.name));
    
    for (const entry of sortedFiles) {
      const fullPath = path.join(dirPath, entry.name);
      const content = fs.readFileSync(fullPath, 'utf8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : entry.name.replace('.md', '');

      const relativeToSrc = path.relative(srcPath, dirPath);
      const fullLinkPath = path.join(relativeToSrc, entry.name.replace('.md', '')).replace(/\\/g, '/');

      items.push({
        text: title,
        link: `/${fullLinkPath}`
      });
    }

    // 处理目录
    for (const entry of dirs) {
      const fullPath = path.join(dirPath, entry.name);
      const subItems = processDirectory(fullPath, path.join(basePath, entry.name));
      if (subItems.length > 0) {
        items.push({
          text: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
          items: subItems
        });
      }
    }

    return items;
  }

  // 处理 src 目录下的所有目录
  const directories = fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  directories.forEach(dir => {
    const dirPath = path.join(srcPath, dir);
    
    if (dir === 'blog') {
      // 特殊处理 blog 目录，按年份降序排列
      const blogSubdirs = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => ({ 
          name: dirent.name,
          path: path.join(dirPath, dirent.name)
        }))
        .sort((a, b) => b.name.localeCompare(a.name));
      
      const blogItems = [];
      
      for (const subdir of blogSubdirs) {
        const yearItems = processDirectory(subdir.path);
        if (yearItems.length > 0) {
          blogItems.push({
            text: subdir.name,
            items: yearItems
          });
        }
      }
      
      if (blogItems.length > 0) {
        sidebar[`/${dir}/`] = blogItems;
      }
    } else {
      // 处理其他目录
      const items = processDirectory(dirPath);
      if (items.length > 0) {
        sidebar[`/${dir}/`] = items;
      }
    }
  });

  return sidebar;
}

export const sidebar = generateSidebar();
