# npm 更换成淘宝镜像源以及 cnpm

更换镜像为淘宝镜像：

```
npm install -g cnpm --registry=https://registry.npmmirror.com
```

2.检测 cnpm 版本，如果安装成功可以看到 cnpm 的基本信息。

```
cnpm -v
```

以后安装插件只需要使用 cnpm intall 即可

3.单次使用

```
npm install --registry=https://registry.npmmirror.com
```

注：如果想还原 npm 仓库地址，只需再把地址配置成 npm 镜像就可以了

```
npm config set registry https://registry.npmjs.org/
```
