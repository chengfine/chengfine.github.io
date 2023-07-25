#!/bin/bash

# 进入项目根目录
cd /Users/cheng/project/blog

git add .

git commit -m "commit $(date +"%Y-%m-%d %H:%M:%S")"

git push -u origin main

