import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function updateHomeLinks(): Plugin {
  return {
    name: 'update-home-links',
    buildStart() {
      try {
        // 使用 path.join 来确保跨平台路径兼容性
        const blogDir = path.join(__dirname, '..', 'src', 'blog')
        console.log('Blog directory:', blogDir)
        
        if (!fs.existsSync(blogDir)) {
          console.error('Blog directory not found:', blogDir)
          return
        }

        const blogYears = fs.readdirSync(blogDir)
        console.log('Blog years:', blogYears)
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
                  // 使用 path.posix.join 确保生成正斜杠的 URL 路径
                  latestBlog = path.posix.join('/blog', year, post.replace('.md', ''))
                }
              }
            }
          }
        }

        // 获取最新的记录
        const recordDir = path.join(__dirname, '..', 'src', 'record')
        console.log('Record directory:', recordDir)
        
        if (!fs.existsSync(recordDir)) {
          console.error('Record directory not found:', recordDir)
          return
        }

        const records = fs.readdirSync(recordDir)
        console.log('Records:', records)
        let latestRecord = ''
        let latestRecordDate = ''

        for (const record of records) {
          if (record.endsWith('.md')) {
            const recordPath = path.join(recordDir, record)
            const stats = fs.statSync(recordPath)
            if (!latestRecordDate || stats.mtime > new Date(latestRecordDate)) {
              latestRecordDate = stats.mtime.toISOString()
              // 使用 path.posix.join 确保生成正斜杠的 URL 路径
              latestRecord = path.posix.join('/record', record.replace('.md', ''))
            }
          }
        }

        // 更新首页文件
        const indexPath = path.join(__dirname, '..', 'src', 'index.md')
        console.log('Index file path:', indexPath)
        
        if (!fs.existsSync(indexPath)) {
          console.error('Index file not found:', indexPath)
          return
        }

        const content = fs.readFileSync(indexPath, 'utf-8')
        console.log('Original content:', content)

        // 更新博客链接
        const updatedContent = content
          .replace(/link: \/blog\/.*/, `link: ${latestBlog}`)
          .replace(/link: \/record\/.*/, `link: ${latestRecord}`)

        console.log('Updated content:', updatedContent)
        fs.writeFileSync(indexPath, updatedContent)

        console.log('Updated latest links in index.md:')
        console.log('Latest blog:', latestBlog)
        console.log('Latest record:', latestRecord)
      } catch (error) {
        console.error('Error updating home links:', error)
      }
    }
  }
} 