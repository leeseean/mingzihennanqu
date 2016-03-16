# IFE 第一阶段任务
官方任务说明：[第一阶段任务概要说明](http://mp.weixin.qq.com/s?__biz=MzA4MjUyNjY3Nw==&mid=401956006&idx=1&sn=bbf72ea5c17894c3a5423d8b3bdb7d9a#rd)

## 任务一：零基础 HTML 编码
任务链接：[任务一：零基础 HTML 编码](http://ife.baidu.com/task/detail?taskId=1)

### 第一版

#### 基本介绍

- 尽量按 HTML5 标准使用标签，使用到的新标签包括：`header`，`article`，`aside`，`footer`；
- 有一些标签的使用，导致和效果图有所不同，个人一直以来的习惯是保持 HTML 不受效果的干扰，真实编写中完全可以靠 CSS 加以控制;
- “文章作者” 和 “文章发表时间”，都使用 `em` 标签，参考的是[第一阶段任务概要说明](http://mp.weixin.qq.com/s?__biz=MzA4MjUyNjY3Nw==&mid=401956006&idx=1&sn=bbf72ea5c17894c3a5423d8b3bdb7d9a#rd)这个页面中的用法；
- 侧边栏 `form` 中，用 `p` 标签包裹 `input`，参考的是百度注册界面。

#### 遗留问题

- 我暂时不确定，文章一级标题是不是应该用 `h2`，因为侧边栏的标题理论上说级别会高于文章的一级标题；
- 导航部分本来想用上 HTML 的新标签 `nav`，但查阅了 `nav` 的用法后产生了疑问，需要再考虑一下。



## 安装步骤

### Node.js 的安装
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

### 项目依赖安装

```
  npm install
```
安装中可能会出现一些警告，忽略它们。

### 运行

```
  npm start
```
使用这个命令后，会在你的默认浏览器上自动开启一个 localhost:3000 窗口，显示的页面为项目目录中的 index.html。当你修改 index.html 并保存，浏览器会自动刷新，展现出最新的效果。