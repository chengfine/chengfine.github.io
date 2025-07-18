# 根据 element-ui 官网步骤安装，按需引入，报错，Cannot find module ‘babel-preset-es2015’

按照 element 的官方文档的指导来编写代码的话会报错
`Cannot find module ‘babel-preset-es2015’`  
这个错的原因就是从你的项目依赖中找不到 `babel-preset-es2015`

下面说解决办法：

#### 方法一：直接运行下面的命令行安装这个依赖

```
yarn add babel-preset-es2015 --dev
```

或者

```
npm install babel-preset-es2015 -D
```

#### 方法二：旧的`babel-perset-es2015`在`babel7`已经不支持，运行下面的命令行安装依赖

```
npm install --save-dev @babel/preset-env
```

或者

```
yarn add @babel/preset-env --dev
```

在 `babel.config.js` 文件中，进行如下修改：

```
module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset'],
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

就能解决问题了，推荐第二种方法。
