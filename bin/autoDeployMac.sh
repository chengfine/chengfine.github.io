#!/bin/bash

# 进入项目根目录
cd /Users/cheng/project/blog

# 进入静态文件目录
cd docs/.vitepress/dist

# 初始化 Git 仓库并提交生成的静态文件
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# 推送静态文件到 GitHub 个人博客仓库的 main 分支
git push -f https://github.com/chengfine/chengfine.github.io.git main:gh-pages

# 返回到项目根目录
cd ../../