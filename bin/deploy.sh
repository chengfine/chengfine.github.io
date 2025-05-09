#!/bin/bash

# 获取当前日期
CURRENT_DATE=$(date "+%Y-%m-%d %H:%M:%S")

# 设置默认的提交信息
COMMIT_MSG="docs: update content [${CURRENT_DATE}]"

# 如果有传入参数，则使用参数作为提交信息
if [ $# -gt 0 ]; then
  COMMIT_MSG="$1 [${CURRENT_DATE}]"
fi

# 确保脚本在错误时退出
set -e

# 添加所有更改
git add .

# 提交更改
git commit -m "$COMMIT_MSG"

# 推送到远程仓库
git push origin main

# 检查推送是否成功
if [ $? -eq 0 ]; then
  echo "✅ 代码已成功推送到远程仓库"
  echo "🔄 GitHub Actions 将自动部署到 GitHub Pages"
else
  echo "❌ 推送失败，请检查错误信息"
  exit 1
fi 