# IFE 第一阶段任务
官方任务说明：[第一阶段任务概要说明](http://mp.weixin.qq.com/s?__biz=MzA4MjUyNjY3Nw==&mid=401956006&idx=1&sn=bbf72ea5c17894c3a5423d8b3bdb7d9a#rd)

## 代码与说明
### 任务1
- [代码](./task_1_1_1/index.html)
- [说明](./task_1_1_1/README.md)

## 关于本目录中的 index.html
用来提供到每个任务页面的链接，方便 lite-server 的使用。

## lite-server
一个简单的服务器，主要用途是提供 browser-sync 的功能。browser-sync 在你的代码保存时，自动刷新浏览器，展现最新修改的效果，提升工作效率。
- [lite-server](https://github.com/johnpapa/lite-server)
- [browser-sync](https://github.com/BrowserSync/browser-sync)

### 安装步骤

#### Node.js 的安装
介于今后有可能会用到多个版本的 node.js，我推荐使用 nvm（Node Version Manager）来安装和管理 node：

  - [nvm](https://github.com/creationix/nvm)
  - [nvm-windows](https://github.com/coreybutler/nvm-windows)

nvm 安装好后，直接使用以下命令安装 node：

```
  nvm install latest
```

安装完成后，通过以下命令确认安装是否成功：

```
  node --version
```

#### 项目依赖安装
首先，需要在项目根目录下添加一个 package.json 文件，具体写法请参照我的 package.json。
之后在命令行中输入：

```
  npm install
```
安装中可能会出现一些警告，忽略它们。

### 运行

```
  npm start
```
使用这个命令后，会在你的默认浏览器上自动开启一个 localhost:3000 窗口，显示的页面为项目目录中的 index.html。当你修改 index.html 并保存，浏览器会自动刷新，展现出最新的效果。