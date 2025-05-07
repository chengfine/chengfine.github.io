import fs from 'fs';
import path from 'path';

function getLatestPost(category) {
  const categoryPath = path.join(__dirname, `../src/${category}`);
  
  // 检查目录是否存在
  if (!fs.existsSync(categoryPath)) {
    return `/${category}/`;
  }

  const entries = fs.readdirSync(categoryPath, { withFileTypes: true });
  
  // 如果是 blog 目录，需要特殊处理年份
  if (category === 'blog') {
    const years = entries
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort((a, b) => b.localeCompare(a));

    if (years.length === 0) return '/blog/';

    const latestYear = years[0];
    const yearPath = path.join(categoryPath, latestYear);
    const posts = fs.readdirSync(yearPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
      .map(dirent => dirent.name)
      .sort((a, b) => {
        // 提取文件名中的数字部分进行比较
        const numA = parseInt(a.match(/^\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/^\d+/)?.[0] || '0');
        return numB - numA; // 降序排序
      });

    if (posts.length === 0) return '/blog/';

    const latestPost = posts[0].replace('.md', '');
    return `/${category}/${latestYear}/${latestPost}`;
  } else {
    // 处理其他目录（record, photo 等）
    const posts = entries
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
      .map(dirent => dirent.name)
      .sort((a, b) => b.localeCompare(a));

    if (posts.length === 0) return `/${category}/`;

    const latestPost = posts[0].replace('.md', '');
    return `/${category}/${latestPost}`;
  }
}

export const nav = [
  { 
    text: 'Blog', 
    link: getLatestPost('blog'),
    activeMatch: '^/blog/'
  },
  { 
    text: 'Record', 
    link: getLatestPost('record'),
    activeMatch: '^/record/'
  },
  // { 
  //   text: '相册', 
  //   link: getLatestPost('photo'),
  //   activeMatch: '^/photo/'
  // }
];

