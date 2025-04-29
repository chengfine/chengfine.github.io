import { defineConfig } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
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
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [{ icon: "github", link: "https://github.com/chengfine" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present CHENG",
    },
  },
});
