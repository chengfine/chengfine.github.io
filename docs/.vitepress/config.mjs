import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";
import updateHomeLinks from "./plugins/updateHomeLinks";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //fav图标
  head: [["link", { rel: "icon", href: "/images/logo-light.svg" }]],
  base: "/",
  title: "CHENG的博客",
  description: "cheng-github-blog",
  cleanUrls: true,
  srcDir: "./src",
  // 是否显示更新时间
  // lastUpdated: true,
  // 是否显示行号
  markdown: {
    // theme: 'material-theme-palenight',
    lineNumbers: true,
  },

  themeConfig: {
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/chengfine" }],
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    // siteTitle: 'Hello World',
    // siteTitle: false, //标题隐藏
    logo: "/images/logo-light.svg",
    //开启本地搜索
    search: {
      provider: "local",
    },
    // 修改文档页脚的文字
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present CHENG",
    },
  },

  vite: {
    plugins: [
      AutoImport({
        imports: [
          "vue",
          // {
          //   "naive-ui": [
          //     "useDialog",
          //     "useMessage",
          //     "useNotification",
          //     "useLoadingBar",
          //   ],
          // },
        ],
        dts: true, // 生成类型声明文件
        include: [/\.md$/, /\.vue$/],
      }),
      updateHomeLinks(),
    ],
    server: {
      port: 3000, // 设置端口为3000
      open: false, // 自动打开浏览器
    },
  },
});
