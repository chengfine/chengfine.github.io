import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取最新的博客文章
const blogDir = path.resolve(__dirname, '../docs/src/blog')
const blogYears = fs.readdirSync(blogDir)
let latestBlog = ''
let latestBlogDate = ''

for (const year of blogYears) {
  const yearDir = path.join(blogDir, year)
  if (fs.statSync(yearDir).isDirectory()) {
    const posts = fs.readdirSync(yearDir)
    for (const post of posts) {
      if (post.endsWith('.md')) {
        const postPath = path.join(yearDir, post)
        const stats = fs.statSync(postPath)
        if (!latestBlogDate || stats.mtime > new Date(latestBlogDate)) {
          latestBlogDate = stats.mtime.toISOString()
          latestBlog = `/blog/${year}/${post.replace('.md', '')}`
        }
      }
    }
  }
}

// 获取最新的记录
const recordDir = path.resolve(__dirname, '../docs/src/record')
const records = fs.readdirSync(recordDir)
let latestRecord = ''
let latestRecordDate = ''

for (const record of records) {
  if (record.endsWith('.md')) {
    const recordPath = path.join(recordDir, record)
    const stats = fs.statSync(recordPath)
    if (!latestRecordDate || stats.mtime > new Date(latestRecordDate)) {
      latestRecordDate = stats.mtime.toISOString()
      latestRecord = `/record/${record.replace('.md', '')}`
    }
  }
}

// 更新首页文件
const indexPath = path.resolve(__dirname, '../docs/src/index.md')
let content = fs.readFileSync(indexPath, 'utf-8')

// 更新博客链接
content = content.replace(
  /link: \/blog\/.*/,
  `link: ${latestBlog}`
)

// 更新记录链接
content = content.replace(
  /link: \/record\/.*/,
  `link: ${latestRecord}`
)

fs.writeFileSync(indexPath, content)

console.log('Updated latest links in index.md:')
console.log('Latest blog:', latestBlog)
console.log('Latest record:', latestRecord) 