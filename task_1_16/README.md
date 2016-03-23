#任务十四：零基础JavaScript编码（四）
任务链接：[零基础JavaScript编码（四）](http://ife.baidu.com/task/detail?taskId=16)
DEMO：[http://yanisj.github.io/ife-missions/task-1-16/index.html](http://yanisj.github.io/ife-missions/task-1-16/index.html)

##版本调整记录
### v0.1.1
#### 修改验证城市名的正则
本来用 `\w` 来匹配英文输入，这是不对的，`\w` 等价于 `[A-Za-z0-9_]`。更正为 `A-Za-z`。
