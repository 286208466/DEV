控件样式是否具有一致性

内容展示：空状态、是否自动刷新、是否需要倒序

数据过长是否需要省略，是否会影响布局


### 进度指示

缓解用户等待焦虑

**为什么需要进度指示?**

人对等待的忍耐是有限度的，当一个操作需要等待较长时间时，用户会产生焦虑感，也更容易放弃这个操作甚至放弃整个产品，所以系统在适当的时机向用户反馈当前的进度就十分必要。

根据《可用性工程》一书中的研究：

- 0.1 秒大约是让用户感觉到系统正在立即做出反应的极限，这意味着除了显示结果之外不需要任何特殊的反馈。
- 1.0 秒大约是用户思想流保持不间断的极限，即使用户会注意到延迟。正常情况下，大于 0.1 秒但小于 1.0 秒的延迟不需要特别的反馈，但用户确实失去了直接对数据进行操作的感觉。
- 10 秒大约是将用户的注意力集中在对话上的限制。对于更长的延迟，用户将希望在等待计算机完成的同时执行其他任务，因此应向他们提供反馈，指示计算机预计何时完成。如果响应时间可能变化很大，则延迟期间的反馈尤其重要，因为用户将不知道会发生什么。

由于数据量大或网络原因，不可避免地会出现等待时间长的情况。以下是常见的例子：

- 对大文件的操作。如打开大文件、复制大文件、删除大文件等。
- 软件启动过程。如一些大型游戏、Aobe软件等。
- 需联网的操作。如上佳、下载、播放等。
- 搜索。无论联网与否，只要数据量太大，都可能出现等待时间长的情况。
- 安装软件。

**进度指示的表现形式**

1. 进度条 Progress

2. 加载 Loading

3. 骨架屏 Skeleton Screen

4. 步骤条 Step