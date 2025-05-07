import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

    // 获取所有文件的完整路径和修改时间
    const filesWithTime = files.map((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      return {
        path: file,
        mtime: stats.mtime.getTime(), // 使用时间戳进行比较
      };
    });

    // 按修改时间排序，最新的在前
    filesWithTime.sort((a, b) => b.mtime - a.mtime);

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
  try {
    const blogPath = path.join(basePath, "blog");
    const recordPath = path.join(basePath, "record");

    // 检查目录是否存在
    if (!fs.existsSync(blogPath) || !fs.existsSync(recordPath)) {
      return {
        blog: '/blog/',
        record: '/record/'
      };
    }

    // 获取博客最新年份
    const blogYears = fs.readdirSync(blogPath)
      .filter(year => fs.statSync(path.join(blogPath, year)).isDirectory())
      .sort((a, b) => b.localeCompare(a));

    if (blogYears.length === 0) {
      return {
        blog: '/blog/',
        record: '/record/'
      };
    }

    const latestBlogYear = blogYears[0];
    const blogPathInYear = path.join(blogPath, latestBlogYear);
    const latestBlog = getLatestFile(blogPathInYear);
    const latestRecord = getLatestFile(recordPath);

    return {
      blog: latestBlog
        ? path.posix.join('/blog', latestBlogYear, latestBlog.replace('.md', ''))
        : '/blog/',
      record: latestRecord
        ? path.posix.join('/record', latestRecord.replace('.md', ''))
        : '/record/'
    };
  } catch (error) {
    console.error('Error getting latest posts:', error);
    return {
      blog: '/blog/',
      record: '/record/'
    };
  }
}
