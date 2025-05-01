import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 获取指定目录下的最新文件
 * @param {string} dirPath 目录路径
 * @returns {string} 最新文件的路径
 */
function getLatestFile(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    if (files.length === 0) return null;
    
    // 获取所有文件的完整路径和创建时间
    const filesWithTime = files.map(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      return {
        path: file,
        ctime: stats.ctime
      };
    });

    // 按创建时间排序，最新的在前
    filesWithTime.sort((a, b) => b.ctime - a.ctime);
    
    return filesWithTime[0].path;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return null;
  }
}

/**
 * 获取所有分类的最新文章
 * @param {string} basePath 基础路径
 * @returns {Object} 包含各分类最新文章的对象
 */
export function getLatestPosts(basePath) {
  const blogPath = path.join(basePath, 'blog');
  const diaryPath = path.join(basePath, 'diary');
  const photoPath = path.join(basePath, 'photo');

  // 获取博客最新年份
  const blogYears = fs.readdirSync(blogPath);
  const latestBlogYear = blogYears.sort().reverse()[0];
  const blogPathInYear = path.join(blogPath, latestBlogYear);
  const latestBlog = getLatestFile(blogPathInYear);

  return {
    blog: latestBlog ? `/blog/${latestBlogYear}/${latestBlog.replace('.md', '')}` : '/blog/',
    diary: `/diary/${getLatestFile(diaryPath)?.replace('.md', '') || ''}`,
    photo: `/photo/${getLatestFile(photoPath)?.replace('.md', '') || ''}`
  };
} 