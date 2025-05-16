---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  # 主标题
  name: "CHENG的博客"

  # 副标题
  # text: "这里是CHENG的个人博客，是一名前端工程师"

  # 内容介绍
  tagline: 一个前端开发，偶尔记录

  image:
    src: /images/image.png

  # actions:
  #   - theme: brand
  #     text: Blog
  #     link: /blog/2025/7最终测试版
  #   - theme: alt
  #     text: Record
  #     link: /record/20250508测试
# features:
#   - title: 博客
#     details: 博客
#   - title: 关于我
#     details: 关于我
---

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useData } from 'vitepress'

const { theme } = useData()
const router = useRouter()
onMounted(() => {
  // theme.value.nav 包含了导航配置
  const latestPost = theme.value.nav[0].link
  router.go(latestPost)
})
</script>

<!-- 本站总访问量 <span id="busuanzi_value_site_pv" /> 次
本站访客数 <span id="busuanzi_value_site_uv" /> 人次 -->
