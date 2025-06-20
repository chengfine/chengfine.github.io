# Git 文件状态

### Git 文件状态表示 Git 项目中各个文件的状态

- 已修改 modified：表示文件被修改了，但是还没有保存到数据库中
- 已暂存 staged：表示对一个已修改的文件的当前版本做了标记，使其包含在下次提交的快照中
- 已提交 commited：表示数据已经安全地保存在本地数据库中

---

### 三种文件状态使 Git 项目拥有了三个阶段

<img src='/blog/2018/2/git-status.png' alt="git-status" />

- 工作区：对项目的某个版本独立提取出来的内容
- 暂存区：保存了下次将要提交的文件列表信息
- Git 目录：用来保存项目的元数据和对象数据库的地方

---

### Git 的基本工作流程

- 在工作区修改文件
- 将想要在下次提交的更改，选择性的暂存
- 提交更新

---

### Git 基本命令

这里就不贴出来了，直接查看阮一峰老师的博客
[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

---

### Git 原理

[Git 原理入门](https://www.ruanyifeng.com/blog/2018/10/git-internals.html)

---

```javascript
git init    //初始化 git 仓库
git status    //查看文件状态
git log    //查看日志
git branch    //查看分支
git diff    //查看文件修改具体内容
git add .    //添加所有修改文件
git commit -m 'xxx'    //提交文件
git branch 'xxx'    //创建分支
git checkout 'xxx branch'    //切换分支
git merge 'xxx branch'   //合并分支（区分好目标分支和源分支）
git remote add origin xxxx(远程仓库地址)     //将本地仓库和远程仓库关联起来
git pull      //拉去代码
git push -u origin "main"      //推送代码到main分支
```
