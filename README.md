# Git 基本使用
进入项目目录，我们会处在 master 分支下：

```
projectName (master)
```

我们不能同时在 master 分支下进行编辑，第一件需要做的事情是，建立自己的分支：

```
git checkout -b your-name // 用自己的名字建一个新分支 
```

此时提示符会变为：

```
projectName (your-name)
```

这个新分支的文件与 master 下的文件一模一样，在这个分支里做的所有修改，都不会影响到其他人。这时，就可以开始编写代码了。

然后就是最寻常的 add 和 commit
```
git add .   // 添加所有的修改
git commit -m "在这里为改动做简单的注释"
```

当需要将代码提交到 github 库中时，会和普通的 push 有所不同：
```
git push origin your-name  // 提交一个新的分支
```

这样，我们每个人会在自己的分支里进行编写，然后提交自己的分支。每个人都编写完成后，经过讨论修改，我们会把最终的代码 merge 到 master 分支上。

当然，在最后的讨论和修改前，我们需要互相看看队友们的代码。可以这样做：

```
git checkout master  // 进入 master 分支
git pull             // 获取最新代码
git checkout teammate-name   // 进入队友的分支
```

这样就可以看到队友所写的代码了。
