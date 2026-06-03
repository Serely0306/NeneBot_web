# ZeroBot

基于 [FloatTech/ZeroBot-Plugin](https://github.com/FloatTech/ZeroBot-Plugin) (AGPL-3.0) 部署的插件机器人，基于 [ZeroBot](https://github.com/wdvxdr1123/ZeroBot) 框架。100+ 插件覆盖聊天、群管、娱乐、游戏、社交、工具、ACG、B站、MC 等领域。通过 `@bot /` 触发指令。

## 插件控制

管理 Bot 在群聊/私聊中的响应状态以及各插件的启用/禁用。发送 `@bot /服务列表` 查看所有可用插件（图片形式），`@bot /用法 插件名` 查看单个插件的详细用法。

| 指令 | 功能 |
|------|------|
| `/响应` | 在发送的群/用户开始工作（响应指令） |
| `/沉默` | 在发送的群/用户停止工作 |
| `/全局响应` | 在所有位置开始工作，无视单独的沉默 |
| `/全局沉默` | 在所有本应沉默的位置停止工作。显式指定启用的位置不受影响 |
| `/启用 xxx` | 在发送的群/用户启用指定插件 |
| `/禁用 xxx` | 在发送的群/用户禁用指定插件 |
| `/此处启用所有插件` | 在当前群/用户启用全部插件 |
| `/此处禁用所有插件` | 在当前群/用户禁用全部插件 |
| `/全局启用 xxx` | 全局启用指定插件 |
| `/全局禁用 xxx` | 全局禁用指定插件 |
| `/还原 xxx` | 还原xxx的开启状态到初始状态 |
| `/改变默认启用状态 xxx` | 修改插件默认启用状态 |
| `/禁止 service qq1 qq2...` | 禁止指定QQ号使用某服务 |
| `/允许 service qq1 qq2...` | 重新允许指定QQ号使用某服务 |
| `/封禁 qq1 qq2...` | 禁止指定QQ号使用全部服务 |
| `/解封 qq1 qq2...` | 允许指定QQ号使用全部服务 |
| `/用法 xxx` | 查看指定插件的详细用法，如 `/用法 qqwife` |
| `/服务列表` | 查看所有可用插件列表（图片形式） |
| `/设置服务列表显示行数 xx` | 调整服务列表显示行数（默认9，重启后重置） |
| `@Bot 插件冲突检测` | 检测群内同类Bot并禁用冲突插件 |

::: tip 优先级规则
当全局未配置或与默认相同时，状态取决于单独配置，后备为默认配置；当全局与默认不同时，状态取决于全局配置，单独配置失效。
:::

## 使用说明

ZeroBot 共有 100+ 插件。完整列表通过 `@bot /服务列表` 查看（返回图片），单个插件的详细用法通过 `@bot /用法 插件名` 查看。在群内发送 `/启用 zerobot` 或 `/禁用 zerobot` 控制 ZeroBot 整体开关。

::: tip 优先级规则
插件级别通过 `@bot /启用 插件名` / `@bot /禁用 插件名` 控制。优先级规则：全局配置与默认不同时 → 全局生效，单独配置失效；全局与默认相同时 → 单独配置生效，后备默认。
:::

## 插件列表

共 109 个插件，点击卡片跳转到对应用法。

<div class="plugin-grid">
<a href="#pl-chat" class="plugin-card"><span class="plugin-card-en">chat</span><span class="plugin-card-cn">聊天</span></a>
<a href="#pl-chatcount" class="plugin-card"><span class="plugin-card-en">chatcount</span><span class="plugin-card-cn">聊天时长统计</span></a>
<a href="#pl-sleep" class="plugin-card"><span class="plugin-card-en">sleep_manage</span><span class="plugin-card-cn">睡眠管理</span></a>
<a href="#pl-antiabuse" class="plugin-card"><span class="plugin-card-en">antiabuse</span><span class="plugin-card-cn">违禁词检测</span></a>
<a href="#pl-atri" class="plugin-card"><span class="plugin-card-en">atri</span><span class="plugin-card-cn">ATRI</span></a>
<a href="#pl-manager" class="plugin-card"><span class="plugin-card-en">manager</span><span class="plugin-card-cn">群管</span></a>
<a href="#pl-airecord" class="plugin-card"><span class="plugin-card-en">airecord</span><span class="plugin-card-cn">AI声聊</span></a>
<a href="#pl-job" class="plugin-card"><span class="plugin-card-en">job</span><span class="plugin-card-cn">定时指令触发器</span></a>
<a href="#pl-ahsai" class="plugin-card"><span class="plugin-card-en">ahsai</span><span class="plugin-card-cn">ahsai TTS</span></a>
<a href="#pl-ai_false" class="plugin-card"><span class="plugin-card-en">ai_false</span><span class="plugin-card-cn">AIfalse</span></a>
<a href="#pl-aiimage" class="plugin-card"><span class="plugin-card-en">aiimage</span><span class="plugin-card-cn">AI画图</span></a>
<a href="#pl-aiwife" class="plugin-card"><span class="plugin-card-en">aiwife</span><span class="plugin-card-cn">AIWife</span></a>
<a href="#pl-alipayvoice" class="plugin-card"><span class="plugin-card-en">alipayvoice</span><span class="plugin-card-cn">支付宝到账语音</span></a>
<a href="#pl-animetrace" class="plugin-card"><span class="plugin-card-en">animetrace</span><span class="plugin-card-cn">动画/Galgame识别</span></a>
<a href="#pl-autowithdraw" class="plugin-card"><span class="plugin-card-en">autowithdraw</span><span class="plugin-card-cn">触发者撤回</span></a>
<a href="#pl-b14" class="plugin-card"><span class="plugin-card-en">b14</span><span class="plugin-card-cn">base16384加解密</span></a>
<a href="#pl-baiduaudit" class="plugin-card"><span class="plugin-card-en">baiduaudit</span><span class="plugin-card-cn">百度内容审核</span></a>
<a href="#pl-base64gua" class="plugin-card"><span class="plugin-card-en">base64gua</span><span class="plugin-card-cn">base64卦加解密</span></a>
<a href="#pl-baseamasiro" class="plugin-card"><span class="plugin-card-en">baseamasiro</span><span class="plugin-card-cn">base天城文加解密</span></a>
<a href="#pl-bilibili" class="plugin-card"><span class="plugin-card-en">bilibili</span><span class="plugin-card-cn">B站用户/VUP信息</span></a>
<a href="#pl-bilibiliparse" class="plugin-card"><span class="plugin-card-en">bilibiliparse</span><span class="plugin-card-cn">B站链接解析</span></a>
<a href="#pl-bilibilipush" class="plugin-card"><span class="plugin-card-en">bilibilipush</span><span class="plugin-card-cn">B站动态/直播推送</span></a>
<a href="#pl-bookreview" class="plugin-card"><span class="plugin-card-en">book_review</span><span class="plugin-card-cn">书评</span></a>
<a href="#pl-choose" class="plugin-card"><span class="plugin-card-en">choose</span><span class="plugin-card-cn">选择困难症帮手</span></a>
<a href="#pl-chouxianghua" class="plugin-card"><span class="plugin-card-en">chouxianghua</span><span class="plugin-card-cn">抽象话</span></a>
<a href="#pl-chrev" class="plugin-card"><span class="plugin-card-en">chrev</span><span class="plugin-card-cn">英文字符翻转</span></a>
<a href="#pl-coser" class="plugin-card"><span class="plugin-card-en">coser</span><span class="plugin-card-cn">coser</span></a>
<a href="#pl-cpstory" class="plugin-card"><span class="plugin-card-en">cpstory</span><span class="plugin-card-cn">cp短打</span></a>
<a href="#pl-crypter" class="plugin-card"><span class="plugin-card-en">crypter</span><span class="plugin-card-cn">奇怪语言加解密</span></a>
<a href="#pl-dailynews" class="plugin-card"><span class="plugin-card-en">dailynews</span><span class="plugin-card-cn">今日早报</span></a>
<a href="#pl-danbooru" class="plugin-card"><span class="plugin-card-en">danbooru</span><span class="plugin-card-cn">DeepDanbooru识图</span></a>
<a href="#pl-diana" class="plugin-card"><span class="plugin-card-en">diana</span><span class="plugin-card-cn">嘉然</span></a>
<a href="#pl-dish" class="plugin-card"><span class="plugin-card-en">dish</span><span class="plugin-card-cn">程序员做饭指南</span></a>
<a href="#pl-drawlots" class="plugin-card"><span class="plugin-card-en">drawlots</span><span class="plugin-card-cn">多功能抽签</span></a>
<a href="#pl-driftbottle" class="plugin-card"><span class="plugin-card-en">drift_bottle</span><span class="plugin-card-cn">漂流瓶</span></a>
<a href="#pl-emojimix" class="plugin-card"><span class="plugin-card-en">emojimix</span><span class="plugin-card-cn">合成emoji</span></a>
<a href="#pl-emozi" class="plugin-card"><span class="plugin-card-en">emozi</span><span class="plugin-card-cn">颜文字抽象转写</span></a>
<a href="#pl-event" class="plugin-card"><span class="plugin-card-en">event</span><span class="plugin-card-cn">好友/群邀请处理</span></a>
<a href="#pl-font" class="plugin-card"><span class="plugin-card-en">font</span><span class="plugin-card-cn">文字渲染</span></a>
<a href="#pl-fortune" class="plugin-card"><span class="plugin-card-en">fortune</span><span class="plugin-card-cn">每日运势</span></a>
<a href="#pl-funny" class="plugin-card"><span class="plugin-card-en">funny</span><span class="plugin-card-cn">笑话</span></a>
<a href="#pl-genshin" class="plugin-card"><span class="plugin-card-en">genshin</span><span class="plugin-card-cn">原神抽卡</span></a>
<a href="#pl-gif" class="plugin-card"><span class="plugin-card-en">gif</span><span class="plugin-card-cn">gif表情生成</span></a>
<a href="#pl-github" class="plugin-card"><span class="plugin-card-en">github</span><span class="plugin-card-cn">GitHub搜索</span></a>
<a href="#pl-guessmusic" class="plugin-card"><span class="plugin-card-en">guessmusic</span><span class="plugin-card-cn">猜歌</span></a>
<a href="#pl-handou" class="plugin-card"><span class="plugin-card-en">handou</span><span class="plugin-card-cn">猜成语</span></a>
<a href="#pl-hitokoto" class="plugin-card"><span class="plugin-card-en">hitokoto</span><span class="plugin-card-cn">一言</span></a>
<a href="#pl-hs" class="plugin-card"><span class="plugin-card-en">hs</span><span class="plugin-card-cn">炉石</span></a>
<a href="#pl-hyaku" class="plugin-card"><span class="plugin-card-en">hyaku</span><span class="plugin-card-cn">百人一首</span></a>
<a href="#pl-inject" class="plugin-card"><span class="plugin-card-en">inject</span><span class="plugin-card-cn">注入指令</span></a>
<a href="#pl-jandan" class="plugin-card"><span class="plugin-card-en">jandan</span><span class="plugin-card-cn">煎蛋网无聊图</span></a>
<a href="#pl-jptingroom" class="plugin-card"><span class="plugin-card-en">jptingroom</span><span class="plugin-card-cn">日语听力</span></a>
<a href="#pl-kfc" class="plugin-card"><span class="plugin-card-en">kfccrazythursday</span><span class="plugin-card-cn">疯狂星期四</span></a>
<a href="#pl-llm" class="plugin-card"><span class="plugin-card-en">llm</span><span class="plugin-card-cn">大模型聊天/群聊总结</span></a>
<a href="#pl-kokomi" class="plugin-card"><span class="plugin-card-en">kokomi</span><span class="plugin-card-cn">原神面板</span></a>
<a href="#pl-lolicon" class="plugin-card"><span class="plugin-card-en">lolicon</span><span class="plugin-card-cn">随机涩图</span></a>
<a href="#pl-lolimi" class="plugin-card"><span class="plugin-card-en">lolimi</span><span class="plugin-card-cn">桑帛云API</span></a>
<a href="#pl-magicprompt" class="plugin-card"><span class="plugin-card-en">magicprompt</span><span class="plugin-card-cn">SD吟唱提示</span></a>
<a href="#pl-mcfish" class="plugin-card"><span class="plugin-card-en">mcfish</span><span class="plugin-card-cn">钓鱼模拟器</span></a>
<a href="#pl-midicreate" class="plugin-card"><span class="plugin-card-en">midicreate</span><span class="plugin-card-cn">midi音乐制作</span></a>
<a href="#pl-mcobserver" class="plugin-card"><span class="plugin-card-en">minecraftobserver</span><span class="plugin-card-cn">MC服务器监控</span></a>
<a href="#pl-movies" class="plugin-card"><span class="plugin-card-en">movies</span><span class="plugin-card-cn">猫眼电影</span></a>
<a href="#pl-moyu" class="plugin-card"><span class="plugin-card-en">moyu</span><span class="plugin-card-cn">摸鱼</span></a>
<a href="#pl-moyucalendar" class="plugin-card"><span class="plugin-card-en">moyu_calendar</span><span class="plugin-card-cn">摸鱼人日历</span></a>
<a href="#pl-music" class="plugin-card"><span class="plugin-card-en">music</span><span class="plugin-card-cn">点歌</span></a>
<a href="#pl-nativesetu" class="plugin-card"><span class="plugin-card-en">nativesetu</span><span class="plugin-card-cn">本地涩图</span></a>
<a href="#pl-nbnhhsh" class="plugin-card"><span class="plugin-card-en">nbnhhsh</span><span class="plugin-card-cn">拼音缩写释义</span></a>
<a href="#pl-nihongo" class="plugin-card"><span class="plugin-card-en">nihongo</span><span class="plugin-card-cn">日语语法学习</span></a>
<a href="#pl-niuniu" class="plugin-card"><span class="plugin-card-en">niuniu</span><span class="plugin-card-cn">牛牛大作战</span></a>
<a href="#pl-novel" class="plugin-card"><span class="plugin-card-en">novel</span><span class="plugin-card-cn">小说</span></a>
<a href="#pl-nsfw" class="plugin-card"><span class="plugin-card-en">nsfw</span><span class="plugin-card-cn">nsfw图片识别</span></a>
<a href="#pl-nwife" class="plugin-card"><span class="plugin-card-en">nwife</span><span class="plugin-card-cn">抽wife</span></a>
<a href="#pl-omikuji" class="plugin-card"><span class="plugin-card-en">omikuji</span><span class="plugin-card-cn">浅草寺求签</span></a>
<a href="#pl-poker" class="plugin-card"><span class="plugin-card-en">poker</span><span class="plugin-card-cn">抽扑克</span></a>
<a href="#pl-pig" class="plugin-card"><span class="plugin-card-en">pig</span><span class="plugin-card-cn">来份猪猪</span></a>
<a href="#pl-qqwife" class="plugin-card"><span class="plugin-card-en">qqwife</span><span class="plugin-card-cn">群老婆</span></a>
<a href="#pl-qzone" class="plugin-card"><span class="plugin-card-en">qzone</span><span class="plugin-card-cn">QQ空间表白墙</span></a>
<a href="#pl-realcugan" class="plugin-card"><span class="plugin-card-en">realcugan</span><span class="plugin-card-cn">Real-CUGAN清晰术</span></a>
<a href="#pl-reborn" class="plugin-card"><span class="plugin-card-en">reborn</span><span class="plugin-card-cn">投胎</span></a>
<a href="#pl-robbery" class="plugin-card"><span class="plugin-card-en">robbery</span><span class="plugin-card-cn">打劫</span></a>
<a href="#pl-rsshub" class="plugin-card"><span class="plugin-card-en">rsshub</span><span class="plugin-card-cn">RSSHub</span></a>
<a href="#pl-runcode" class="plugin-card"><span class="plugin-card-en">runcode</span><span class="plugin-card-cn">在线代码运行</span></a>
<a href="#pl-saucenao" class="plugin-card"><span class="plugin-card-en">saucenao</span><span class="plugin-card-cn">搜图</span></a>
<a href="#pl-score" class="plugin-card"><span class="plugin-card-en">score</span><span class="plugin-card-cn">签到得分</span></a>
<a href="#pl-shadiao" class="plugin-card"><span class="plugin-card-en">shadiao</span><span class="plugin-card-cn">沙雕app</span></a>
<a href="#pl-shindan" class="plugin-card"><span class="plugin-card-en">shindan</span><span class="plugin-card-cn">shindan</span></a>
<a href="#pl-steam" class="plugin-card"><span class="plugin-card-en">steam</span><span class="plugin-card-cn">steam</span></a>
<a href="#pl-tarot" class="plugin-card"><span class="plugin-card-en">tarot</span><span class="plugin-card-cn">塔罗牌</span></a>
<a href="#pl-tiangou" class="plugin-card"><span class="plugin-card-en">tiangou</span><span class="plugin-card-cn">舔狗日记</span></a>
<a href="#pl-tracemoe" class="plugin-card"><span class="plugin-card-en">tracemoe</span><span class="plugin-card-cn">搜番</span></a>
<a href="#pl-translation" class="plugin-card"><span class="plugin-card-en">translation</span><span class="plugin-card-cn">翻译</span></a>
<a href="#pl-vtb" class="plugin-card"><span class="plugin-card-en">vtb_quotation</span><span class="plugin-card-cn">vtb语录</span></a>
<a href="#pl-wallet" class="plugin-card"><span class="plugin-card-en">wallet</span><span class="plugin-card-cn">钱包</span></a>
<a href="#pl-wantquotes" class="plugin-card"><span class="plugin-card-en">wantquotes</span><span class="plugin-card-cn">据意查句</span></a>
<a href="#pl-warframeapi" class="plugin-card"><span class="plugin-card-en">warframeapi</span><span class="plugin-card-cn">星际战甲</span></a>
<a href="#pl-wife" class="plugin-card"><span class="plugin-card-en">wife</span><span class="plugin-card-cn">抽老婆</span></a>
<a href="#pl-wordcount" class="plugin-card"><span class="plugin-card-en">word_count</span><span class="plugin-card-cn">聊天热词</span></a>
<a href="#pl-wordle" class="plugin-card"><span class="plugin-card-en">wordle</span><span class="plugin-card-cn">猜单词</span></a>
<a href="#pl-wtf" class="plugin-card"><span class="plugin-card-en">wtf</span><span class="plugin-card-cn">鬼东西</span></a>
<a href="#pl-xhstext" class="plugin-card"><span class="plugin-card-en">xhstext</span><span class="plugin-card-cn">小红书文案</span></a>
<a href="#pl-ygocdb" class="plugin-card"><span class="plugin-card-en">ygocdb</span><span class="plugin-card-cn">游戏王卡查</span></a>
<a href="#pl-ygotrade" class="plugin-card"><span class="plugin-card-en">ygotrade</span><span class="plugin-card-cn">游戏王卡价</span></a>
<a href="#pl-ymgal" class="plugin-card"><span class="plugin-card-en">ymgal</span><span class="plugin-card-cn">月幕galgame图</span></a>
<a href="#pl-yujn" class="plugin-card"><span class="plugin-card-en">yujn</span><span class="plugin-card-cn">遇见API</span></a>
<a href="#pl-aichatcfg" class="plugin-card"><span class="plugin-card-en">aichatcfg</span><span class="plugin-card-cn">AI聊天配置</span></a>
<a href="#pl-aichat" class="plugin-card"><span class="plugin-card-en">aichat</span><span class="plugin-card-cn">AI聊天Agent</span></a>
<a href="#pl-curse" class="plugin-card"><span class="plugin-card-en">curse</span><span class="plugin-card-cn">骂人</span></a>
<a href="#pl-thesaurus" class="plugin-card"><span class="plugin-card-en">thesaurus</span><span class="plugin-card-cn">词典匹配回复</span></a>
<a href="#pl-breakrepeat" class="plugin-card"><span class="plugin-card-en">breakrepeat</span><span class="plugin-card-cn">打断复读</span></a>
</div>

## 插件用法

### 聊天 (chat) 

<details class="cmd-details" id="pl-chat"><summary>聊天 (chat)</summary><div class="cmd-details-content"><ul><li><code>[BOT名字]</code> — 呼叫Bot名字触发聊天</li><li>戳一戳 Bot</li><li><code>空调开</code> / <code>空调关</code> — 群空调开关</li><li><code>群温度</code> — 查看当前群温度</li><li><code>设置温度[正整数]</code> — 设置群温度</li></ul></div></details>

### 聊天时长统计 (chatcount) 

<details class="cmd-details" id="pl-chatcount"><summary>聊天时长统计 (chatcount)</summary><div class="cmd-details-content"><ul><li><code>查询水群@xxx</code> — 查询指定用户水群数据</li><li><code>查看水群排名</code> — 查看群内水群排名</li></ul></div></details>

### 睡眠管理 (sleep_manage) 

<details class="cmd-details" id="pl-sleep"><summary>睡眠管理 (sleep_manage)</summary><div class="cmd-details-content"><ul><li><code>早安</code> / <code>晚安</code> — 记录作息时间</li></ul></div></details>

### 违禁词检测 (antiabuse) 

<details class="cmd-details" id="pl-antiabuse"><summary>违禁词检测 (antiabuse)</summary><div class="cmd-details-content"><ul><li><code>添加违禁词 xxx</code></li><li><code>删除违禁词 xxx</code></li><li><code>查看违禁词</code></li></ul></div></details>

### ATRI (atri) 

<details class="cmd-details" id="pl-atri"><summary>ATRI (atri)</summary><div class="cmd-details-content"><p>基于 <a href="https://github.com/Kyomotoi/ATRI" target="_blank" rel="noreferrer">ATRI</a>，为 Golang 移植版。具体指令查看 <code>/用法 atri</code>。</p></div></details>

### 群管 (manager) 

<details class="cmd-details" id="pl-manager"><summary>群管 (manager)</summary><div class="cmd-details-content"><ul><li><code>禁言[@xxx][分钟]</code></li><li><code>解除禁言[@xxx]</code></li><li><code>我要自闭</code> / <code>禅定 x [分钟|小时|天]</code> — 自我禁言</li><li><code>开启全员禁言</code> / <code>解除全员禁言</code></li><li><code>升为管理[@xxx]</code> / <code>取消管理[@xxx]</code></li><li><code>修改名片[@xxx][xxx]</code></li><li><code>修改头衔[@xxx][xxx]</code></li><li><code>申请头衔[xxx]</code></li><li><code>踢出群聊[@xxx]</code></li><li><code>退出群聊[群号]@Bot</code></li><li><code>设置欢迎语[xxx]</code> — 占位符：<code>{at}</code> <code>{nickname}</code> <code>{avatar}</code> <code>{uid}</code> <code>{gid}</code> <code>{groupname}</code></li><li><code>[开启|关闭]入群验证</code></li><li><code>[开启|关闭]gist加群自动审批</code></li><li>回复消息：<code>设置精华</code> / <code>取消精华</code></li><li><code>/精华列表</code></li><li>回复消息：<code>撤回</code></li><li><code>翻牌</code> / <code>赞我</code> / <code>群签到</code></li></ul><p><strong>定时提醒（群管内置）：</strong></p><ul><li><code>在[MM]月[dd]日的[hh]点[mm]分时 提醒大家[xxx]</code> — 单次提醒</li><li><code>在[MM]月[每周|周几]的[hh]点[mm]分时 提醒大家[xxx]</code> — 周循环</li><li><code>在"cron"时 提醒大家[xxx]</code> — cron 表达式</li><li><code>取消在[MM]月[dd]日的[hh]点[mm]分的提醒</code></li><li><code>列出所有提醒</code></li></ul></div></details>

### 群应用：AI声聊 (airecord) 

<details class="cmd-details" id="pl-airecord"><summary>群应用：AI声聊 (airecord)</summary><div class="cmd-details-content"><ul><li><code>设置AI语音群号 xxx</code></li><li><code>设置AI语音模型</code></li><li><code>查看AI语音配置</code></li><li><code>发送AI语音 xxx</code></li></ul></div></details>

### 定时指令触发器 (job) 

<details class="cmd-details" id="pl-job"><summary>定时指令触发器 (job)</summary><div class="cmd-details-content"><p>触发器具有限速，每 2s 仅允许最多一次触发。</p><ul><li><code>记录以"关键词"触发的(代表我执行的)指令</code></li><li><code>取消以"关键词"触发的(代表我执行的)指令</code></li><li><code>记录在"cron"触发的(别名xxx的)指令</code></li><li><code>取消在"cron"触发的指令</code></li><li><code>查看所有触发指令</code></li><li><code>查看在"cron"触发的指令</code></li><li><code>查看以"关键词"触发的(代表我执行的)指令</code></li><li><code>注入指令结果：xxx</code> / <code>执行指令：xxx</code> — 支持 Python 代码动态逻辑</li><li><code>[我|大家|有人][说|问][正则表达式]你[答|说|做|执行][模版]</code></li><li><code>[查看|看看][我|大家|有人][说|问][正则表达式]</code></li><li><code>删除[大家|有人|我][说|问|让你做|让你执行][正则表达式]</code></li></ul><p>支持 <code>?::参数提示语::1!</code> 交互参数和 <code>!::url::1!</code> URL 获取参数。模版中 <code>$1</code> <code>$2</code> 为正则子匹配对应值。</p></div></details>

### ahsai TTS (ahsai) 

<details class="cmd-details" id="pl-ahsai"><summary>ahsai TTS (ahsai)</summary><div class="cmd-details-content"><ul><li>使[伊織弓鶴|紲星あかり|結月ゆかり|京町セイカ|東北きりたん|東北イタコ|ついなちゃん標準語|ついなちゃん関西弁|音街ウナ|琴葉茜|吉田くん|民安ともえ|桜乃そら|月読アイ|琴葉葵|東北ずん子|月読ショウタ|水奈瀬コウ]说(日语)</li></ul></div></details>

### AIfalse (ai_false) 

<details class="cmd-details" id="pl-ai_false"><summary>AIfalse (ai_false)</summary><div class="cmd-details-content"><ul><li><code>检查身体</code> / <code>自检</code> / <code>启动自检</code> / <code>系统状态</code> — 查询计算机活跃度</li><li><code>设置默认限速为每 m [分钟|秒] n 次触发</code></li></ul></div></details>

### AI画图 (aiimage) 

<details class="cmd-details" id="pl-aiimage"><summary>AI画图 (aiimage)</summary><div class="cmd-details-content"><ul><li><code>AI画图 [描述]</code> — 根据文本生成图片</li><li><code>设置AI画图密钥 xxx</code></li><li><code>设置AI画图接口地址 xxx</code>（默认 SiliconFlow）</li><li><code>设置AI画图模型名 xxx</code>（默认 Kwai-Kolors/Kolors）</li><li><code>查看AI画图配置</code></li></ul></div></details>

### AIWife (aiwife) 

<details class="cmd-details" id="pl-aiwife"><summary>AIWife (aiwife)</summary><div class="cmd-details-content"><ul><li><code>waifu</code> / <code>随机waifu</code> — 从 100000 个 AI waifu 中随机</li></ul></div></details>

### 支付宝到账语音 (alipayvoice) 

<details class="cmd-details" id="pl-alipayvoice"><summary>支付宝到账语音 (alipayvoice)</summary><div class="cmd-details-content"><ul><li><code>支付宝到账 1</code> — 支付宝到账语音播报</li></ul></div></details>

### AnimeTrace 动画/Galgame识别 (animetrace) 

<details class="cmd-details" id="pl-animetrace"><summary>AnimeTrace 动画/Galgame识别 (animetrace)</summary><div class="cmd-details-content"><p>基于 <a href="https://ai.animedb.cn/" target="_blank" rel="noreferrer">AnimeTrace</a> API。</p><ul><li><code>动漫识图 [图片]</code> / <code>动漫识图 2</code> / <code>动漫识图 [模型名]</code></li><li><code>Gal识图 [图片]</code> / <code>Gal识图 [模型名]</code></li></ul></div></details>

### 触发者撤回时也自动撤回 (autowithdraw) 

<details class="cmd-details" id="pl-autowithdraw"><summary>触发者撤回时也自动撤回 (autowithdraw)</summary><div class="cmd-details-content"><ul><li>触发者撤回消息时 Bot 也自动撤回（无需指令）</li></ul></div></details>

### base16384加解密 (b14) 

<details class="cmd-details" id="pl-b14"><summary>base16384加解密 (b14)</summary><div class="cmd-details-content"><ul><li><code>加密 xxx</code> / <code>解密 xxx</code></li><li><code>用yyy加密 xxx</code> / <code>用yyy解密 xxx</code></li></ul></div></details>

### 百度内容审核 (baiduaudit) 

<details class="cmd-details" id="pl-baiduaudit"><summary>百度内容审核 (baiduaudit)</summary><div class="cmd-details-content"><ul><li><code>配置BDAKey [API Key] [Secret Key]</code></li><li><code>[开启|关闭]内容审核</code> — 总开关</li><li><code>[开启|关闭]文本检测</code> / <code>[开启|关闭]图像检测</code></li><li><code>[开启|关闭]撤回提示</code> / <code>[开启|关闭]详细提示</code></li><li><code>[开启|关闭]撤回禁言</code> / <code>[开启|关闭]禁言累加</code></li><li><code>设置最大禁言时间[分钟]</code>（默认60，最大43200）</li><li><code>设置每次累加时间[分钟]</code> / <code>设置撤回禁言时间[分钟]</code></li><li><code>设置检测类型[编号]</code> / <code>设置不检测类型[编号]</code></li><li><code>查看检测类型</code> / <code>查看检测配置</code></li><li><code>测试文本检测[文本]</code> / <code>测试图像检测[图片]</code></li></ul><p>检测类型：1:违禁违规 2:文本色情 3:敏感信息 4:恶意推广 5:低俗辱骂 6:恶意推广-联系方式 7:恶意推广-软文推广</p></div></details>

### base64卦加解密 (base64gua) 

<details class="cmd-details" id="pl-base64gua"><summary>base64卦加解密 (base64gua)</summary><div class="cmd-details-content"><ul><li><code>六十四卦加密 xxx</code> / <code>六十四卦解密 xxx</code></li><li><code>六十四卦用yyy加密 xxx</code> / <code>六十四卦用yyy解密 xxx</code></li></ul></div></details>

### base天城文加解密 (baseamasiro) 

<details class="cmd-details" id="pl-baseamasiro"><summary>base天城文加解密 (baseamasiro)</summary><div class="cmd-details-content"><ul><li><code>天城文加密 xxx</code> / <code>天城文解密 xxx</code></li><li><code>天城文用yyy加密 xxx</code> / <code>天城文用yyy解密 xxx</code></li></ul></div></details>

### B站用户/VUP信息 (bilibili) 

<details class="cmd-details" id="pl-bilibili"><summary>B站用户/VUP信息 (bilibili)</summary><div class="cmd-details-content"><ul><li><code>>vup info [xxx]</code> / <code>>user info [xxx]</code></li><li><code>查成分 [xxx]</code></li><li><code>查弹幕 [xxx] [页码]</code></li><li><code>设置b站cookie xxx</code></li><li><code>更新vup</code></li></ul></div></details>

### B站链接解析 (bilibiliparse) 

<details class="cmd-details" id="pl-bilibiliparse"><summary>B站链接解析 (bilibiliparse)</summary><div class="cmd-details-content"><ul><li>自动解析动态(t.bilibili.com)、专栏(read/cv)、视频(video/BV)、直播(live.bilibili.com) 链接</li></ul></div></details>

### B站动态/直播推送 (bilibilipush) 

<details class="cmd-details" id="pl-bilibilipush"><summary>B站动态/直播推送 (bilibilipush)</summary><div class="cmd-details-content"><p>需配合 job 定时指令触发器使用。</p><ul><li><code>添加b站订阅 [uid|name]</code></li><li><code>取消b站订阅 [uid|name]</code></li><li><code>取消b站动态订阅 [uid|name]</code> / <code>取消b站直播订阅 [uid|name]</code></li><li><code>b站推送列表</code></li><li><code>拉取b站推送</code> — 配合 <code>记录在"@every 5m"触发的指令</code></li></ul></div></details>

### 书评 (book_review) 

<details class="cmd-details" id="pl-bookreview"><summary>书评 (book_review)</summary><div class="cmd-details-content"><ul><li><code>书评 [xxx]</code> / <code>随机书评</code></li></ul></div></details>

### 选择困难症帮手 (choose) 

<details class="cmd-details" id="pl-choose"><summary>选择困难症帮手 (choose)</summary><div class="cmd-details-content"><ul><li><code>选择[A]还是[B]还是[更多选项]</code> — 帮你随机选择</li></ul></div></details>

### 抽象话 (chouxianghua) 

<details class="cmd-details" id="pl-chouxianghua"><summary>抽象话 (chouxianghua)</summary><div class="cmd-details-content"><ul><li><code>抽象翻译 [xxx]</code> — 文字转抽象话</li></ul></div></details>

### 英文字符翻转 (chrev) 

<details class="cmd-details" id="pl-chrev"><summary>英文字符翻转 (chrev)</summary><div class="cmd-details-content"><ul><li><code>翻转 I love you</code></li></ul></div></details>

### coser (coser) 

<details class="cmd-details" id="pl-coser"><summary>coser (coser)</summary><div class="cmd-details-content"><ul><li><code>coser</code> — 随机 Coser 图片</li></ul></div></details>

### cp短打 (cpstory) 

<details class="cmd-details" id="pl-cpstory"><summary>cp短打 (cpstory)</summary><div class="cmd-details-content"><ul><li><code>组cp [@xxx] [@xxx]</code></li><li><code>磕cp [名字] [名字]</code></li></ul></div></details>

### 奇怪语言加解密 (crypter) 

<details class="cmd-details" id="pl-crypter"><summary>奇怪语言加解密 (crypter)</summary><div class="cmd-details-content"><ul><li><code>齁语加密 [文本]</code> / <code>h加密 [文本]</code></li><li><code>齁语解密 [密文]</code> / <code>h解密 [密文]</code></li><li><code>fumo加密 [文本]</code> / <code>fumo解密 [密文]</code></li><li><code>qq加密 [文本]</code> / <code>qq解密 [密文]</code></li></ul></div></details>

### 今日早报 (dailynews) 

<details class="cmd-details" id="pl-dailynews"><summary>今日早报 (dailynews)</summary><div class="cmd-details-content"><ul><li><code>今日早报</code></li></ul></div></details>

### DeepDanbooru 二次元识图 (danbooru) 

<details class="cmd-details" id="pl-danbooru"><summary>DeepDanbooru 二次元识图 (danbooru)</summary><div class="cmd-details-content"><ul><li><code>鉴赏图片 [图片]</code> — 二次元图标签识别</li></ul></div></details>

### 嘉然 (diana) 

<details class="cmd-details" id="pl-diana"><summary>嘉然 (diana)</summary><div class="cmd-details-content"><ul><li><code>小作文</code> / <code>发大病</code></li><li><code>教你一篇小作文 [xxx]</code></li></ul></div></details>

### 程序员做饭指南 (dish) 

<details class="cmd-details" id="pl-dish"><summary>程序员做饭指南 (dish)</summary><div class="cmd-details-content"><ul><li><code>怎么做 [菜名]</code> / <code>烹饪 [菜名]</code></li><li><code>随机菜谱</code> / <code>随便做点菜</code></li></ul></div></details>

### 多功能抽签 (drawlots) 

<details class="cmd-details" id="pl-drawlots"><summary>多功能抽签 (drawlots)</summary><div class="cmd-details-content"><ul><li><code>抽 [签名] 签</code></li><li><code>看签 [gif签名]</code></li><li><code>加签 [签名] [gif图片]</code> / <code>删签 [gif签名]</code></li><li><code>抽签列表</code> / <code>刷新抽签列表</code></li></ul></div></details>

### 漂流瓶 (drift_bottle) 

<details class="cmd-details" id="pl-driftbottle"><summary>漂流瓶 (drift_bottle)</summary><div class="cmd-details-content"><ul><li><code>@Bot throw xxx</code> — 投递（内容需大于10字符或含图片）</li><li><code>@Bot pick</code> — 随机捞取</li></ul></div></details>

### 合成emoji (emojimix) 

<details class="cmd-details" id="pl-emojimix"><summary>合成emoji (emojimix)</summary><div class="cmd-details-content"><ul><li>两个 emoji 连发即可合成，如 <code>😀😡</code></li></ul></div></details>

### 颜文字抽象转写 (emozi) 

<details class="cmd-details" id="pl-emozi"><summary>颜文字抽象转写 (emozi)</summary><div class="cmd-details-content"><ul><li><code>抽象转写 [文段]</code> / <code>抽象还原 [文段]</code></li><li><code>抽象登录 [用户名]</code></li></ul></div></details>

### 好友/群邀请事件处理 (event) 

<details class="cmd-details" id="pl-event"><summary>好友/群邀请事件处理 (event)</summary><div class="cmd-details-content"><ul><li><code>[开启|关闭]自动同意[申请|邀请|主人]</code></li><li><code>[同意|拒绝][申请|邀请][flag]</code></li></ul></div></details>

### 文字渲染 (font) 

<details class="cmd-details" id="pl-font"><summary>文字渲染 (font)</summary><div class="cmd-details-content"><ul><li>用[终末体|终末变体|紫罗兰体|樱酥体|Consolas体|粗苹方体|未来荧黑体|Gugi体|八丸体|Impact体|猫啃体|苹方体]渲染(抖动)文字 xxx</li></ul></div></details>

### 每日运势 (fortune) 

<details class="cmd-details" id="pl-fortune"><summary>每日运势 (fortune)</summary><div class="cmd-details-content"><ul><li><code>运势</code> / <code>抽签</code> — 每日运势</li><li><code>设置底图 [xxx]</code> — 20+ 种底图：车万/DC4/爱因斯坦/星空列车/樱云之恋/富婆妹/李清歌/公主连结/原神/明日方舟/碧蓝航线/碧蓝幻想/战双/阴阳师/赛马娘/东方归言录/奇异恩典/夏日口袋/ASoul/Hololive</li></ul></div></details>

### 笑话 (funny) 

<details class="cmd-details" id="pl-funny"><summary>笑话 (funny)</summary><div class="cmd-details-content"><ul><li><code>讲个笑话 [@xxx|qq号|人名]</code></li><li><code>夸夸 [@xxx|qq号|人名]</code></li></ul></div></details>

### 原神抽卡 (genshin) 

<details class="cmd-details" id="pl-genshin"><summary>原神抽卡 (genshin)</summary><div class="cmd-details-content"><ul><li><code>切换原神卡池</code></li><li><code>原神十连</code></li></ul></div></details>

### gif 表情生成 (gif) 

<details class="cmd-details" id="pl-gif"><summary>gif 表情生成 (gif)</summary><div class="cmd-details-content"><ul><li><code>爬 [@xxx]</code> / <code>摸 [@xxx]</code> / <code>搓 [@xxx]</code></li></ul><p>更多指令见 <a href="https://github.com/FloatTech/ZeroBot-Plugin-Gif" target="_blank" rel="noreferrer">ZeroBot-Plugin-Gif</a>。</p></div></details>

### GitHub 仓库搜索 (github) 

<details class="cmd-details" id="pl-github"><summary>GitHub 仓库搜索 (github)</summary><div class="cmd-details-content"><ul><li><code>>github [xxx]</code></li><li><code>>github -p [xxx]</code></li></ul></div></details>

### 猜歌 (guessmusic) 

<details class="cmd-details" id="pl-guessmusic"><summary>猜歌 (guessmusic)</summary><div class="cmd-details-content"><p>依赖 ffmpeg。内置网易云 API 功能。</p><ul><li><code>[个人|团队]猜歌</code></li><li><code>设置猜歌歌库路径 [绝对路径]</code></li><li><code>[创建|删除]歌单 [名称]</code></li><li><code>下载歌曲 [名称|网易云ID] 到 [歌单]</code></li><li><code>设置猜歌默认歌单 [名称]</code> / <code>歌单列表</code></li><li><code>歌单信息 [网易云歌单链接|ID]</code></li><li><code>下载歌单 [链接|ID] 到 [歌单]</code></li><li><code>[歌单名称]绑定网易云 [链接|ID]</code> / <code>解除绑定 [歌单名称]</code></li></ul></div></details>

### 猜成语 (handou) 

<details class="cmd-details" id="pl-handou"><summary>猜成语 (handou)</summary><div class="cmd-details-content"><ul><li><code>个人猜成语</code> / <code>团队猜成语</code></li></ul></div></details>

### 一言 (hitokoto) 

<details class="cmd-details" id="pl-hitokoto"><summary>一言 (hitokoto)</summary><div class="cmd-details-content"><ul><li><code>一言 [xxx]</code> / <code>系列一言</code></li></ul></div></details>

### 炉石 (hs) 

<details class="cmd-details" id="pl-hs"><summary>炉石 (hs)</summary><div class="cmd-details-content"><ul><li><code>搜卡 [xxxx]</code></li><li><code>[卡组代码xxx]</code></li></ul></div></details>

### 百人一首 (hyaku) 

<details class="cmd-details" id="pl-hyaku"><summary>百人一首 (hyaku)</summary><div class="cmd-details-content"><ul><li><code>百人一首</code> — 日本传统歌牌</li><li><code>百人一首之n</code></li></ul></div></details>

### 注入指令 (inject) 

<details class="cmd-details" id="pl-inject"><summary>注入指令 (inject)</summary><div class="cmd-details-content"><ul><li><code>run[CQ码]</code></li></ul></div></details>

### 煎蛋网无聊图 (jandan) 

<details class="cmd-details" id="pl-jandan"><summary>煎蛋网无聊图 (jandan)</summary><div class="cmd-details-content"><ul><li><code>来份吊图</code> / <code>来份屌图</code> / <code>来份弔图</code></li><li><code>更新吊图</code></li></ul></div></details>

### 日语听力 (jptingroom) 

<details class="cmd-details" id="pl-jptingroom"><summary>日语听力 (jptingroom)</summary><div class="cmd-details-content"><ul><li><code>随机日语听力</code> / <code>日语听力 xxx</code></li><li><code>随机日语歌曲</code> / <code>日语歌曲 xxx</code></li></ul></div></details>

### 疯狂星期四 (kfccrazythursday) 

<details class="cmd-details" id="pl-kfc"><summary>疯狂星期四 (kfccrazythursday)</summary><div class="cmd-details-content"><ul><li><code>疯狂星期四</code> — KFC 文案</li></ul></div></details>

### 大模型聊天/群聊总结 (llm) 

<details class="cmd-details" id="pl-llm"><summary>大模型聊天/群聊总结 (llm)</summary><div class="cmd-details-content"><ul><li><code>/gpt [内容]</code> — 大模型聊天</li><li><code>群聊总结 [消息数目]</code> / <code>群聊总结 1000</code></li></ul></div></details>

### 原神面板 kokomi (kokomi) 

<details class="cmd-details" id="pl-kokomi"><summary>原神面板 kokomi (kokomi)</summary><div class="cmd-details-content"><p>未并入主仓库，需自行安装：<a href="https://github.com/lianhong2758/kokomi-plugin" target="_blank" rel="noreferrer">kokomi-plugin</a>。</p><ul><li><code>kokomi菜单</code> / <code>XX面板</code></li></ul></div></details>

### 随机涩图 lolicon (lolicon) 

<details class="cmd-details" id="pl-lolicon"><summary>随机涩图 lolicon (lolicon)</summary><div class="cmd-details-content"><ul><li><code>随机图片</code> / <code>随机图片 萝莉|少女</code></li><li><code>设置随机图片地址 [url]</code></li></ul></div></details>

### 桑帛云 API (lolimi) 

<details class="cmd-details" id="pl-lolimi"><summary>桑帛云 API (lolimi)</summary><div class="cmd-details-content"><ul><li><code>随机妹子</code> / <code>随机绕口令</code> / <code>随机情话</code></li><li><code>颜值鉴定 [图片]</code></li><li><code>发病 [角色名]</code></li><li><code>让[角色名]说我测尼玛</code> — 支持 100+ 角色</li></ul></div></details>

### SD吟唱提示 (magicprompt) 

<details class="cmd-details" id="pl-magicprompt"><summary>SD吟唱提示 (magicprompt)</summary><div class="cmd-details-content"><ul><li><code>吟唱提示 [xxxx]</code> — SD 提示词生成</li></ul></div></details>

### 钓鱼模拟器 (mcfish) 

<details class="cmd-details" id="pl-mcfish"><summary>钓鱼模拟器 (mcfish)</summary><div class="cmd-details-content"><ul><li><code>进行钓鱼</code> / <code>进行n次钓鱼</code></li><li><code>钓鱼商店</code> / <code>购买xxx [数量]</code></li><li><code>出售 [xxx|所有垃圾] [数量]</code></li><li><code>钓鱼背包</code> / <code>装备 [xx竿|三叉戟|美西螈]</code></li><li><code>附魔 [诱钓|海之眷顾]</code></li><li><code>修复鱼竿</code> / <code>合成 [xx竿|三叉戟]</code></li></ul></div></details>

### midi音乐制作 (midicreate) 

<details class="cmd-details" id="pl-midicreate"><summary>midi音乐制作 (midicreate)</summary><div class="cmd-details-content"><p>需要安装 timidity。</p><ul><li><code>midi制作 CCGGAAGR</code> — 简易 MIDI</li><li><code>个人听音练习</code> / <code>团队听音练习</code></li><li><code>*.mid</code> — midi 转 txt；<code>midi制作*.txt</code> — txt 转 midi</li><li><code>设置音色 [0~127]</code></li></ul></div></details>

### MC服务器监控 (minecraftobserver) 

<details class="cmd-details" id="pl-mcobserver"><summary>MC服务器监控 (minecraftobserver)</summary><div class="cmd-details-content"><ul><li><code>mc服务器状态 [IP/URI]</code></li><li><code>mc服务器添加订阅 [IP/URI]</code> / <code>mc服务器取消订阅 [IP/URI]</code></li><li><code>mc服务器订阅拉取</code> — 配合 <code>记录在"@every 1m"触发的指令</code></li></ul></div></details>

### 猫眼电影 (movies) 

<details class="cmd-details" id="pl-movies"><summary>猫眼电影 (movies)</summary><div class="cmd-details-content"><ul><li><code>今日电影</code> / <code>预售电影</code></li></ul></div></details>

### 摸鱼 (moyu) 

<details class="cmd-details" id="pl-moyu"><summary>摸鱼 (moyu)</summary><div class="cmd-details-content"><ul><li><code>摸鱼提醒</code> — 配合 <code>记录在"0 10 * * *"触发的指令</code></li></ul></div></details>

### 摸鱼人日历 (moyu_calendar) 

<details class="cmd-details" id="pl-moyucalendar"><summary>摸鱼人日历 (moyu_calendar)</summary><div class="cmd-details-content"><ul><li>配合 <code>记录在"30 8 * * *"触发的指令</code></li></ul></div></details>

### 点歌 (music) 

<details class="cmd-details" id="pl-music"><summary>点歌 (music)</summary><div class="cmd-details-content"><ul><li><code>点歌 [xxx]</code> / <code>网易点歌 [xxx]</code></li><li><code>酷我点歌 [xxx]</code> / <code>酷狗点歌 [xxx]</code></li><li><code>qq点歌 [xxx]</code> / <code>咪咕点歌 [xxx]</code></li></ul></div></details>

### 本地涩图 (nativesetu) 

<details class="cmd-details" id="pl-nativesetu"><summary>本地涩图 (nativesetu)</summary><div class="cmd-details-content"><ul><li><code>本地 [xxx]</code> / <code>刷新本地 [xxx]</code>（较慢，请等待）</li><li><code>设置本地setu绝对路径 [xxx]</code></li><li><code>刷新所有本地setu</code> / <code>所有本地setu分类</code></li></ul></div></details>

### 拼音缩写释义 (nbnhhsh) 

<details class="cmd-details" id="pl-nbnhhsh"><summary>拼音缩写释义 (nbnhhsh)</summary><div class="cmd-details-content"><ul><li><code>?? [缩写]</code> — 如 <code>?? yyds</code></li></ul></div></details>

### 日语语法学习 (nihongo) 

<details class="cmd-details" id="pl-nihongo"><summary>日语语法学习 (nihongo)</summary><div class="cmd-details-content"><ul><li><code>日语语法 [xxx]</code> — 使用 tag 随机</li><li><code>搜索日语语法 [xxx]</code></li></ul></div></details>

### 牛牛大作战 (niuniu) 

<details class="cmd-details" id="pl-niuniu"><summary>牛牛大作战 (niuniu)</summary><div class="cmd-details-content"><ul><li><code>打胶</code> / <code>使用[道具名]打胶</code></li><li><code>jj [@xxx]</code> — 查看牛牛长度</li><li><code>赎牛牛</code> / <code>牛牛拍卖行</code> / <code>出售牛牛</code></li><li><code>牛牛商店</code> / <code>牛牛背包</code> / <code>查看我的牛牛</code></li><li><code>注册牛牛</code> / <code>注销牛牛</code></li><li><code>牛子长度排行</code> / <code>牛子深度排行</code></li></ul></div></details>

### 小说 (novel) 

<details class="cmd-details" id="pl-novel"><summary>小说 (novel)</summary><div class="cmd-details-content"><ul><li><code>小说 [xxx]</code></li><li><code>设置小说配置 zerobot 123456</code></li><li><code>下载小说 [ID]</code></li></ul><p>建议去 <a href="https://www.23qb.com/" target="_blank" rel="noreferrer">23qb.com</a> 注册账号，下载有积分限制。</p></div></details>

### nsfw 图片识别 (nsfw) 

<details class="cmd-details" id="pl-nsfw"><summary>nsfw 图片识别 (nsfw)</summary><div class="cmd-details-content"><ul><li><code>nsfw打分 [图片]</code></li><li><code>/启用 nsfwauto</code> — 非 neutral 类别自动发送评价（默认禁用）</li></ul></div></details>

### 抽wife (nwife) 

<details class="cmd-details" id="pl-nwife"><summary>抽wife (nwife)</summary><div class="cmd-details-content"><ul><li><code>抽wife [@xxx]</code></li><li><code>添加wife [名字] [图片]</code> / <code>删除wife [名字]</code></li><li><code>[让|不让]所有人均可添加wife</code></li></ul><p>不同群添加后不会重叠。</p></div></details>

### 浅草寺求签 (omikuji) 

<details class="cmd-details" id="pl-omikuji"><summary>浅草寺求签 (omikuji)</summary><div class="cmd-details-content"><ul><li><code>求签</code> / <code>占卜</code> / <code>解签</code></li></ul></div></details>

### 抽扑克 (poker) 

<details class="cmd-details" id="pl-poker"><summary>抽扑克 (poker)</summary><div class="cmd-details-content"><ul><li><code>抽扑克牌</code></li></ul></div></details>

### 来份猪猪 (pig) 

<details class="cmd-details" id="pl-pig"><summary>来份猪猪 (pig)</summary><div class="cmd-details-content"><ul><li><code>随机猪猪</code> / <code>搜索猪猪 [名字]</code> / <code>猪猪id [ID]</code></li></ul></div></details>

### 群老婆 (qqwife) 

<details class="cmd-details" id="pl-qqwife"><summary>群老婆 (qqwife)</summary><div class="cmd-details-content"><ul><li><code>娶群友</code> / <code>娶|嫁 [@xxx]</code></li><li><code>当[对方Q号|@xxx]的小三</code></li><li><code>做媒 @攻方 @受方</code> / <code>买礼物给 [@xxx]</code></li><li><code>群老婆列表</code> / <code>查好感度 [@xxx]</code> / <code>好感度列表</code></li><li><code>设置CD为xx小时</code></li><li><code>[允许|禁止]自由恋爱</code> / <code>[允许|禁止]牛头人</code></li><li><code>重置花名册</code></li></ul><p>引入好感度系统，好感度越高，自由恋爱成功率越高。</p></div></details>

### QQ空间表白墙 (qzone) 

<details class="cmd-details" id="pl-qzone"><summary>QQ空间表白墙 (qzone)</summary><div class="cmd-details-content"><ul><li><code>登录QQ空间</code> — Cookie 过期很快，需经常登录</li><li><code>发说说 [xxx]</code></li><li><code>匿名发表白墙 [xxx]</code></li><li><code>[同意|拒绝]表白墙 1,2,3</code> — 序号用英文逗号连接</li><li><code>查看[等待|同意|拒绝|所有]表白墙 [页码]</code> — 建议私聊审稿</li></ul></div></details>

### Real-CUGAN 清晰术 (realcugan) 

<details class="cmd-details" id="pl-realcugan"><summary>Real-CUGAN 清晰术 (realcugan)</summary><div class="cmd-details-content"><ul><li><code>清晰术(双重|三重|四重吟唱)(强力|中等|弱|不变|原式) [图片]</code></li></ul></div></details>

### 投胎 (reborn) 

<details class="cmd-details" id="pl-reborn"><summary>投胎 (reborn)</summary><div class="cmd-details-content"><ul><li><code>reborn</code> — 看看下辈子是什么</li></ul></div></details>

### 打劫 (robbery) 

<details class="cmd-details" id="pl-robbery"><summary>打劫 (robbery)</summary><div class="cmd-details-content"><ul><li><code>打劫 [@xxx]</code></li></ul></div></details>

### RSSHub (rsshub) 

<details class="cmd-details" id="pl-rsshub"><summary>RSSHub (rsshub)</summary><div class="cmd-details-content"><ul><li><code>添加rsshub订阅 [xxx]</code> / <code>删除rsshub订阅 [xxx]</code></li><li><code>查看rsshub订阅列表</code></li><li><code>rsshub同步</code> — 配合 <code>记录在"@every 10m"触发的指令</code></li></ul></div></details>

### 在线代码运行 (runcode) 

<details class="cmd-details" id="pl-runcode"><summary>在线代码运行 (runcode)</summary><div class="cmd-details-content"><ul><li><code>>runcode [language] [code]</code></li><li><code>>runcoderaw [language] [code]</code> — 不包装</li></ul></div></details>

### 搜图 SauceNAO (saucenao) 

<details class="cmd-details" id="pl-saucenao"><summary>搜图 SauceNAO (saucenao)</summary><div class="cmd-details-content"><ul><li><code>以图搜图|搜索图片|以图识图 [图片]</code></li><li><code>搜图 [P站图片ID]</code></li><li><code>设置 saucenao api key [apikey]</code></li></ul></div></details>

### 签到得分 (score) 

<details class="cmd-details" id="pl-score"><summary>签到得分 (score)</summary><div class="cmd-details-content"><ul><li><code>签到</code> / <code>获得签到背景 [@xxx]</code></li><li><code>设置签到预设 (0~3)</code></li><li><code>查看等级排名</code> / <code>查看我的钱包</code> / <code>查看钱包排名</code></li></ul></div></details>

### 沙雕app (shadiao) 

<details class="cmd-details" id="pl-shadiao"><summary>沙雕app (shadiao)</summary><div class="cmd-details-content"><ul><li><code>哄我</code> / <code>渣我</code> / <code>来碗绿茶</code></li><li><code>发个朋友圈</code> / <code>来碗毒鸡汤</code> / <code>讲个段子</code></li><li><code>马丁路德骂我</code></li></ul></div></details>

### shindan (shindan) 

<details class="cmd-details" id="pl-shindan"><summary>shindan (shindan)</summary><div class="cmd-details-content"><ul><li><code>今天是什么少女 [@xxx]</code> / <code>异世界转生 [@xxx]</code></li><li><code>卖萌 [@xxx]</code> / <code>今日老婆 [@xxx]</code> / <code>黄油角色 [@xxx]</code></li></ul></div></details>

### steam (steam) 

<details class="cmd-details" id="pl-steam"><summary>steam (steam)</summary><div class="cmd-details-content"><ul><li><code>steam[添加|删除]订阅 xxxxx</code></li><li><code>steam查询订阅</code> / <code>steam绑定 api key xxxxxxx</code></li><li><code>查看apikey</code></li><li><code>拉取steam订阅</code> — 配合 <code>记录在"@every 1m"触发的指令</code></li></ul></div></details>

### 塔罗牌 (tarot) 

<details class="cmd-details" id="pl-tarot"><summary>塔罗牌 (tarot)</summary><div class="cmd-details-content"><ul><li><code>抽[塔罗牌|大阿卡纳|小阿卡纳]</code> / <code>抽n张...</code></li><li><code>解塔罗牌 [牌名]</code></li><li><code>[塔罗|大阿卡纳|小阿卡纳|混合]牌阵 [圣三角|时间之流|四要素|五牌阵|吉普赛十字|马蹄|六芒星]</code></li></ul></div></details>

### 舔狗日记 (tiangou) 

<details class="cmd-details" id="pl-tiangou"><summary>舔狗日记 (tiangou)</summary><div class="cmd-details-content"><ul><li><code>舔狗日记</code></li></ul></div></details>

### 搜番 trace.moe (tracemoe) 

<details class="cmd-details" id="pl-tracemoe"><summary>搜番 trace.moe (tracemoe)</summary><div class="cmd-details-content"><ul><li><code>搜番 [图片]</code> / <code>搜索番剧 [图片]</code></li></ul></div></details>

### 翻译 (translation) 

<details class="cmd-details" id="pl-translation"><summary>翻译 (translation)</summary><div class="cmd-details-content"><ul><li><code>>TL 你好</code> — 多语言翻译</li></ul></div></details>

### vtb语录 (vtb_quotation) 

<details class="cmd-details" id="pl-vtb"><summary>vtb语录 (vtb_quotation)</summary><div class="cmd-details-content"><ul><li><code>vtb语录</code> / <code>随机vtb</code> / <code>更新vtb</code></li></ul></div></details>

### 钱包 (wallet) 

<details class="cmd-details" id="pl-wallet"><summary>钱包 (wallet)</summary><div class="cmd-details-content"><ul><li><code>查看我的钱包</code> / <code>查看钱包余额 [@xxx]</code></li><li><code>钱包转账 [金额] [@xxx]</code></li><li><code>查看钱包排名</code> / <code>设置硬币名称 [xxx]</code></li></ul></div></details>

### 据意查句 (wantquotes) 

<details class="cmd-details" id="pl-wantquotes"><summary>据意查句 (wantquotes)</summary><div class="cmd-details-content"><ul><li><code>据意查句 大海</code> — 根据含义查找名言诗句</li><li><code>登录据意查句</code></li></ul></div></details>

### 星际战甲 (warframeapi) 

<details class="cmd-details" id="pl-warframeapi"><summary>星际战甲 (warframeapi)</summary><div class="cmd-details-content"><ul><li><code>wf时间同步</code> / <code>[金星|地球|火卫二]平原状态</code></li><li><code>.wm [物品名称]</code></li><li><code>仲裁</code> / <code>警报</code> / <code>每日特惠</code></li></ul></div></details>

### 抽老婆 (wife) 

<details class="cmd-details" id="pl-wife"><summary>抽老婆 (wife)</summary><div class="cmd-details-content"><ul><li><code>抽老婆</code></li></ul></div></details>

### 聊天热词 (word_count) 

<details class="cmd-details" id="pl-wordcount"><summary>聊天热词 (word_count)</summary><div class="cmd-details-content"><ul><li><code>热词 [消息数目]</code> / <code>热词 1000</code></li></ul></div></details>

### 猜单词 Wordle (wordle) 

<details class="cmd-details" id="pl-wordle"><summary>猜单词 Wordle (wordle)</summary><div class="cmd-details-content"><ul><li><code>个人猜单词</code> / <code>团队猜单词</code></li><li><code>团队六阶猜单词</code> / <code>团队七阶猜单词</code></li></ul></div></details>

### 鬼东西 (wtf) 

<details class="cmd-details" id="pl-wtf"><summary>鬼东西 (wtf)</summary><div class="cmd-details-content"><p>由于需要科学上网，默认注释。</p><ul><li><code>鬼东西列表</code> / <code>查询鬼东西 [序号] [@xxx]</code></li></ul></div></details>

### 小红书文案 (xhstext) 

<details class="cmd-details" id="pl-xhstext"><summary>小红书文案 (xhstext)</summary><div class="cmd-details-content"><ul><li><code>捧场</code> / <code>有梗</code></li></ul></div></details>

### 游戏王卡查 白鸽API (ygocdb) 

<details class="cmd-details" id="pl-ygocdb"><summary>游戏王卡查 白鸽API (ygocdb)</summary><div class="cmd-details-content"><ul><li><code>/ydp [xxx]</code> — 返回图片</li><li><code>/yds [xxx]</code> — 返回效果描述</li><li><code>/ydb [xxx]</code> — 高级搜索</li></ul></div></details>

### 游戏王卡价 集换社 (ygotrade) 

<details class="cmd-details" id="pl-ygotrade"><summary>游戏王卡价 集换社 (ygotrade)</summary><div class="cmd-details-content"><ul><li><code>查卡价 [卡名]</code> / <code>查卡价 [卡名] -r [稀有度 ...]</code></li><li><code>查卡店 [卡名]</code> / <code>查卡店 [卡名] -r [稀有度]</code></li></ul></div></details>

### 月幕 galgame图 (ymgal) 

<details class="cmd-details" id="pl-ymgal"><summary>月幕 galgame图 (ymgal)</summary><div class="cmd-details-content"><ul><li><code>随机galCG</code> / <code>galCG [xxx]</code></li><li><code>随机gal表情包</code> / <code>gal表情包 [xxx]</code></li><li><code>更新gal</code></li></ul></div></details>

### 遇见API (yujn) 

<details class="cmd-details" id="pl-yujn"><summary>遇见API (yujn)</summary><div class="cmd-details-content"><ul><li><code>小姐姐视频</code> / <code>小姐姐视频2</code> / <code>黑丝视频</code> / <code>白丝视频</code></li><li><code>欲梦视频</code> / <code>甜妹视频</code> / <code>双倍快乐</code> / <code>纯情女高</code></li><li><code>萝莉视频</code> / <code>玉足视频</code> / <code>帅哥视频</code> / <code>热舞视频</code></li><li><code>吊带视频</code> / <code>汉服视频</code> / <code>极品狱卒</code> / <code>清纯视频</code></li><li><code>快手变装</code> / <code>抖音变装</code> / <code>萌娃视频</code> / <code>穿搭视频</code></li><li><code>完美身材</code> / <code>御姐撒娇</code> / <code>绿茶语音</code> / <code>怼人语音</code></li><li><code>随机骚话</code> / <code>随机污句子</code> / <code>随机美句</code> / <code>土味情话</code></li><li><code>让[lulu]说我测尼玛</code></li></ul></div></details>

### AI聊天配置 (aichatcfg) 

<details class="cmd-details" id="pl-aichatcfg"><summary>AI聊天配置 (aichatcfg)</summary><div class="cmd-details-content"><ul><li><code>设置AI聊天触发概率 10</code> / <code>设置AI聊天温度 80</code></li><li><code>设置AI聊天(识图|Agent)接口类型 [OpenAI|OLLaMA|GenAI]</code></li><li><code>设置AI聊天(不)使用Agent模式</code> / <code>设置AI聊天(不)支持系统提示词</code></li><li><code>设置AI聊天(识图|Agent)接口地址 xxx</code></li><li><code>设置AI聊天(识图|Agent)密钥 xxx</code></li><li><code>设置AI聊天(识图|Agent)模型名 xxx</code></li><li><code>设置|查看|重置AI聊天系统提示词 xxx</code></li><li><code>设置AI聊天分隔符 xxx</code>（如 <code>&lt;/think&gt;</code>）</li><li><code>设置AI聊天(不)响应AT</code> / <code>设置AI聊天最大长度 4096</code></li><li><code>设置AI聊天TopP 0.9</code> / <code>设置AI聊天(不)以AI语音输出</code></li><li><code>设置AI聊天Agent性格</code> / <code>设置AI聊天Agent性别</code></li><li><code>查看|重置AI聊天配置</code> / <code>重置AI聊天Agent</code></li></ul></div></details>

### AI聊天Agent (aichat) 

<details class="cmd-details" id="pl-aichat"><summary>AI聊天Agent (aichat)</summary><div class="cmd-details-content"><ul><li>随意聊天，概率匹配触发（无需指令）</li></ul></div></details>

### 骂人 (curse) 

<details class="cmd-details" id="pl-curse"><summary>骂人 (curse)</summary><div class="cmd-details-content"><ul><li><code>骂我</code> / <code>大力骂我</code></li></ul></div></details>

### 词典匹配回复 (thesaurus) 

<details class="cmd-details" id="pl-thesaurus"><summary>词典匹配回复 (thesaurus)</summary><div class="cmd-details-content"><ul><li><code>切换 [kimo|傲娇|可爱] 词库</code> — 仅 @ 触发</li><li><code>设置词库触发概率 0.x</code></li></ul></div></details>

### 打断复读 (breakrepeat) 

<details class="cmd-details" id="pl-breakrepeat"><summary>打断复读 (breakrepeat)</summary><div class="cmd-details-content"><ul><li>自动打断三次以上复读（无需指令）</li></ul></div></details>

---

基于 [FloatTech/ZeroBot-Plugin](https://github.com/FloatTech/ZeroBot-Plugin) (AGPL-3.0) 部署
