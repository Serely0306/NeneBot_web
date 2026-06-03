# LunaBot — 综合服务

基于 [NeuraXmy/lunabot](https://github.com/NeuraXmy/lunabot) (MIT) 部署的多功能 Bot 的通用服务部分，使用前缀修改为了 `*`(半角符号)。包括群聊管理、图片处理、AI 聊天、统计与记录、定时提醒等。发送 `*help 服务名` 查看各服务详细帮助图片。

**Sekai 游戏数据查询**请查看 [LunaBot — Sekai 查询](/help/lunabot-sekai)。

---

## 基础指令 (general)

群聊管理、帮助查询、黑名单、性能分析等基础功能。标记 🛠️ 的指令仅超级管理员可用。

### 获取帮助
`*help`
> 获取帮助。加上参数获取指定服务的帮助；在其他指令后加上 `help` 可以单独获取特定指令的帮助。

- `*help` — 获取帮助
- `*help alive` — 获取 alive 服务的帮助
- `*xxx help` — 获取 `*xxx` 指令的帮助

### 开启/关闭群聊
🛠️ `*enable` `*disable`
> 开启或关闭群聊，开启后才能响应指令，默认为关闭状态。

- `*enable` — 开启当前群聊
- `*disable` — 关闭当前群聊
- `*enable 123456` — 开启群聊 123456
- `*disable 123456` — 关闭群聊 123456

### 查看群聊开启状态
🛠️ `*group status`
> 查看所有群聊开启状态。

### 在群聊开启/关闭服务
🛠️ `*{服务名} on` `*{服务名} off`
> 在群聊中开启或关闭服务，可以指定群号。

- `*alive on` — 开启 alive 服务
- `*alive off` — 关闭 alive 服务
- `*alive on 123456` — 在群聊 123456 中开启 alive 服务

### 查看群聊服务开启状态
🛠️ `*service` `*服务`
> 查看当前群聊开启的服务列表或查看某个特定服务开启状态。

- `*service` — 查看当前群聊开启的服务列表
- `*service chat` — 查看 chat 服务在哪些群聊开启

### 添加/删除黑名单
🛠️ `*blacklist add` `*blacklist del`
> 添加或删除黑名单，Bot 将不会响应黑名单中用户的指令。

- `*blacklist add 123456` — 添加用户 123456 到黑名单
- `*blacklist del 123456` — 从黑名单删除用户 123456

### 获取当日消息发送量
🛠️ `*send count`
> 获取当日消息发送数量。

### 查询绘图缓存
🛠️ `*pcache`
> 查询绘图缓存，返回当前绘图缓存的 key-value 列表。

### 清除绘图缓存
🛠️ `*pcache clear`
> 删除某个 key 的绘图缓存。

- `*pcache clear key` — 删除 key 的绘图缓存

### 安全模式
🛠️ `*safe`
> 开启或关闭安全模式，开启后将仅响应超级管理发送的指令。

### 性能分析
🛠️ `*profiling` `*性能分析`
> 开启或关闭基于 yappi 的性能分析。参数指定 clock_type: `wall` 或 `cpu`，默认为 `cpu`。性能分析结果保存于 `data/misc/profiler/` 中，可使用 snakeviz 查看。

- `*性能分析` — 开启/关闭性能分析
- `*性能分析 wall` — 开启基于 wall clock 的性能分析

---

## 图片处理服务 (imgtool)

提供 28 种图片处理操作，支持链式调用。回复一张图片后使用 `*img 操作1 参数1 操作2 参数2...` 进行处理。

### 基础指令

| 指令 | 功能 |
|------|------|
| `*img` | 图片处理主指令。回复图片后使用 `*img 操作 参数` 链式处理。多张图片可回复多条消息或使用 `*img push` 添加。 |
| `*img help` | 查看某个图片操作的帮助，如 `*img help rotate` |
| `*img check` / `*img info` | 获取图片分辨率等属性 |
| `*img push` | 将图片添加到列表供多张图片处理使用。加 `r` 参数翻转顺序。 |
| `*img pop` | 从列表中移除最后一张图片 |
| `*img clear` | 清空图片列表 |
| `*img rev` | 翻转图片列表 |
| `*scan` / `*扫描` / `*识别` | 识别图片中的二维码 |
| `*qrcode` / `*二维码` | 生成二维码图片，如 `*qrcode https://example.com` |
| `*语录` / `*quote` / `*saying` | 回复一条消息生成群友语录图片并自动保存 |
| `*看语录` / `*quote view` / `*saying view` | 随机查看本群已保存的语录。`*看语录 123` 查看 sid=123 的语录。 |
| `*看所有语录` / `*quote list` / `*saying list` | 查看本群所有已保存的语录列表 |
| `*删语录` / `*quote del` / `*saying del` | 🛠️ 删除指定语录。`*删语录 123` 删除 sid=123 的语录。 |
| `*md` / `*markdown` | 将 Markdown 文本转换为图片 |
| `*color` / `*颜色` | 展示颜色。支持 `#FF0000` `rgb 255 0 0` `rgbf 1.0 0.0 0.0` `hsl 0 100% 50%`。 |
| `*pick` / `*取色` | 从图片提取主要颜色，默认 10 种。如 `*pick 5` 提取 5 种。 |
| `*gif` | 回复视频消息转换为 GIF，会自动缩小视频分辨率和帧数。 |

### 图片操作列表

每个操作为 `*img` 的参数，可链式组合。格式：`*img 操作1 参数 操作2 参数 ...`

| 操作 | 类型转换 | 说明 |
|------|----------|------|
| `gif` | 静态图 → 静态图 | 静态图转 GIF，QQ 无法正确显示带透明部分的 PNG 转为 GIF 后可正常显示。`gif n` 普通算法；`gif 0.3` 指定不透明度阈值（默认 50%）。 |
| `png` | 静态图 → 静态图 | 任意图转 PNG 格式，可用于保存无法直接下载的 GIF 图。 |
| `mirror` | 任意 → 任意 | 镜像翻转。`mirror` 水平翻转；`mirror v` 垂直翻转。 |
| `rotate` | 任意 → 任意 | 逆时针旋转指定角度，如 `rotate 90`。 |
| `back` | 任意 → 任意 | 时间轴倒放（动图）。 |
| `speed` | 任意 → 任意 | 调整速度。`speed 2x` 加速；`speed 0.5x` 减速；`speed 50` 帧时长 50ms；`speed -2x` 加速并倒放。 |
| `mid` | 任意 → 任意 | 对称效果。`mid` 左翻右；`mid r` 右翻左；`mid v` 上翻下；`mid v r` 下翻上。 |
| `resize` | 任意 → 任意 | 缩放。`resize 0.5x` 缩小到 50%；`resize 100` 长边 100px；`resize 100 100` 精确尺寸；`resize 2x 0.5x` 宽放大 2 倍高缩小 50%。 |
| `crop` | 任意 → 任意 | 裁剪。`crop 100x100` 中间部分；`crop 0.5x0.5` 比例裁剪；`crop 100x100 lt` 左上角；`crop l0.1 t0.2` 裁掉左边 10% 上边 20%。 |
| `gray` | 任意 → 任意 | 灰度转换。 |
| `invert` | 任意 → 任意 | 颜色反转。 |
| `flow` | 任意 → 动图 | 流动效果。`flow` 左到右；`flow v` 上到下；`flow r` 右到左；`flow v r 2x` 下到上 2 倍速。 |
| `fan` | 任意 → 动图 | 转动效果。`fan` 逆时针；`fan r` 顺时针；`fan 2x` 逆时针 2 倍速。 |
| `repeat` | 任意 → 任意 | 重复图片。如 `repeat 1 2` 横向 1 次纵向 2 次。 |
| `concat` | 多张图片 → 静态图 | 拼接。`concat` 垂直；`concat h` 水平；`concat g` 网格。 |
| `stack` | 多张图片 → 动图 | 多图合成动图。`stack` 默认 20fps；`stack 10` 帧率 10fps。 |
| `extract` | 动图 → 多张图片 | 从动图提取帧。`extract` 自动抽帧；`extract 2` 间隔 2 帧。 |
| `mirage` | 多张图片 → 静态图 | 生成幻影坦克。`mirage` 倒数第二张表面/倒数第一张隐藏；`mirage r` 反转。 |
| `demirage` | 静态图 → 多张图片 | 还原幻影坦克，提取表面图和隐藏图。 |
| `brighten` | 任意 → 任意 | 调整亮度。0 全黑，1 原图。如 `brighten 0.5` 降低 50%、`brighten 1.5` 提高 50%。 |
| `contrast` | 任意 → 任意 | 调整对比度。0 全灰，1 原图。如 `contrast 0.5` 降低 50%、`contrast 1.5` 提高 50%。 |
| `sharpen` | 任意 → 任意 | 调整锐度。0 无锐化，1 原图，2 锐化。如 `sharpen 0.5` 降低 50%、`sharpen 1.5` 提高 50%。 |
| `saturate` | 任意 → 任意 | 调整饱和度。0 黑白，1 原图。如 `saturate 0.5` 降低 50%、`saturate 1.5` 提高 50%。 |
| `blur` | 任意 → 任意 | 高斯模糊。`blur` 默认半径 3；`blur 5` 半径 5。 |
| `cutout` | 任意 → 任意 | 抠图。`cutout` 洪水算法容差 20；`cutout 50` 容差 50；`cutout ai` AI 抠图。 |
| `shrink` | 任意 → 任意 | 裁剪透明边缘。`shrink` 默认阈值 10；`shrink 50` 阈值 50；`shrink 10 +10` 阈值 10 并扩展 10px。 |
| `bg` | 任意 → 任意 | 添加背景色。`bg` 默认白色；`bg #FFFFFF` 颜色代码；`bg 255 0 0` RGB 整数。 |

---

## AI 聊天服务 (chat)

大模型 AI 聊天。支持多轮对话、图片对话、文本转语音、翻译。通过 `@bot` 或 `*chat` 指令触发。

### 基础指令

| 指令 | 功能 |
|------|------|
| `*chat` 或 `@bot 文本` | AI 聊天。支持多轮对话（回复 Bot 继续）、图片对话（含图片的消息）、Python 代码执行（立刻运行代码）。 |
| `*模型列表` / `*model list` | 查看支持的聊天模型列表 |
| `*供应商` / `*chat provider` | 查询所有 API 供应商及余额 |
| `*tts` | 文本转语音，如 `*tts 你好` |
| `*翻译` / `*translate` | 翻译文本或图片。回复图片 + `*翻译` 可翻译图中文字。 |
| `*um` / `*autochat um` | 查询自动聊天的用户记忆（Bot 对某用户的印象）。`*um @用户` 查询指定用户。 |
| `*atchat on` / `*atchat off` | 🛠️ 开启/关闭 At 触发聊天。关闭后只能通过 `*chat` 指令触发。 |
| `*聊天模型` / `*chat model` | 🛠️ 查询/修改聊天模型。加 `text/mm/tool/image` 参数分别修改。如 `*chat model text o1-mini`。 |
| `*清空模型` / `*reset model` | 🛠️ 重置聊天模型为默认 |
| `*autochat on` / `*autochat off` | 🛠️ 开启/关闭自动聊天 |

<details class="cmd-details">
<summary>聊天高级功能</summary>
<div class="cmd-details-content">

- **干净模式**：在询问中加入 `cleanchat` 或 `cleanmode` 关键字，不使用预设提示。
- **自定义模型**：在询问中加入 `model:gpt-4o`（注意后需空格），群聊需超级用户权限。
- **图片生成**：在询问中加入 `图片生成` 或 `imagen` 关键字。
- **Python 代码执行**：在询问中明确指出让 Bot 立刻运行代码。

</div>
</details>

---

## 群消息统计服务 (sta)

基于 record 服务记录的消息提供群消息统计功能。

| 指令 | 功能 |
|------|------|
| `*sta day` | 发送每日群消息统计图（饼图+词云+时间分布）。饼图扇形名格式为 用户名(总消息数,图片表情数)。如 `*sta day 2021-10-01`、`*sta day -7`。 |
| `*sta sum` | 发送长时间统计图。如 `*sta sum 2021-10-01 2021-11-01`、`*sta sum 30`。 |
| `*sta time` | 发送消息时间分布统计图。如 `*sta time 7 @user`。 |
| `*sta word` | 发送词汇统计图。如 `*sta word 你好,世界 7`。 |
| `*sta notify on` / `*sta notify off` | 🛠️ 开启/关闭每日定时发送统计图 |
| `*sta cancel today` | 🛠️ 取消当天定时发送 |
| `*sta add` | 🛠️ 添加词汇到用户词典。如 `*sta add 你好 世界`。 |
| `*sta ban` | 🛠️ 添加词汇到停用词典。如 `*sta ban 你好 世界`。 |

---

## 群消息记录服务 (record)

自动记录群聊消息供其他模块使用，也会记录 Bot 自身发送的消息。

| 指令 | 功能 |
|------|------|
| `*nickname` | 查询用户历史群名片（最近 50 个）。`*nickname @某人` 查询指定用户；`*nickname 123456789` 查询指定 QQ 号。 |
| `*to text` / `*转文本` | 将折叠的聊天记录转为文本 |
| `*record msg on` / `*record msg off` | 🛠️ 开启/关闭消息记录 |
| `*check` | 🛠️ 回复一条消息检查其内容 |
| `*forward` | 🛠️ 私聊中使用，开启/关闭私聊转发。启动后其他用户向 Bot 发送的私聊会被转发到该账号。 |
| `*cmd history` / `*cmdh` | 🛠️ 展示最近的指令历史 |

---

## 定时提醒服务 (cron)

类 crontab 的定时提醒功能，支持 AI 智能创建提醒。使用自然语言描述即可创建。

| 指令 | 功能 |
|------|------|
| `*cron add` / `*添加提醒` | AI 智能创建定时提醒并自动订阅。如 `*cron add 每天早上7点叫我起床`、`*cron add 今天下午3点提醒我去开会`。 |
| `*cron del` / `*删除提醒` | 根据 ID 删除提醒（仅创建者/超级用户）。如 `*cron del 123`。 |
| `*cron list` / `*提醒列表` | 查看当前群定时提醒列表 |
| `*cron sub` / `*cron unsub` | 订阅/取消订阅提醒。加 @用户 可为他人操作（仅创建者/超级用户）。如 `*cron sub 1 @用户`。 |
| `*cron sublist` / `*提醒订阅列表` | 查看某提醒的订阅成员列表。如 `*cron sublist 1`。 |
| `*cron unsub all` / `*清空提醒订阅` | 取消某提醒的所有订阅（仅创建者/超级用户）。如 `*cron unsub all 1`。 |
| `*cron mute` / `*cron unmute` | 关闭/开启某提醒（仅创建者/超级用户）。如 `*cron mute 1`。 |
| `*cron mysub` / `*我的提醒订阅` | 查看自己订阅的所有提醒 |
| `*cron edit` / `*修改提醒` | 修改提醒内容（仅创建者/超级用户）。如 `*cron edit 1 每天早上8点叫我起床`。 |
| `*cron clear` / `*清空提醒` | 🛠️ 清空当前群聊的所有定时提醒 |
| `*cron muteall` / `*关闭所有提醒` | 🛠️ 关闭当前群聊的所有定时提醒 |

---

## 广播服务 (broadcast)

将特定群聊或用户添加到广播组，并发送广播消息。

| 指令 | 功能 |
|------|------|
| `*bc list` | 列出所有广播组 |
| `*bc sublist` | 列出已订阅的广播组 |
| `*bc sub` / `*bc unsub` | 订阅/取消订阅广播组。群聊中需超级管理。如 `*bc sub ABC`、`*bc unsub ABC`。 |
| `*bc unsuball` | 取消订阅所有广播组。群聊中需超级管理。 |
| `*bc add` | 🛠️ 添加广播组。如 `*bc add ABC`。 |
| `*bc del` | 🛠️ 删除广播组。如 `*bc del ABC`。 |
| `*bc send` | 🛠️ 发送广播消息。如 `*bc send ABC Hello!` 或回复一条消息 `*bc send ABC`。 |
| `*bc listsub` | 🛠️ 列出指定广播组的订阅者。如 `*bc listsub ABC`。 |

---

## 状态检测服务 (alive)

检测 Bot 当前运行状态。

| 指令 | 功能 |
|------|------|
| 戳一戳 Bot | 快速测试 Bot 是否在线 |
| `*status` / `*状态` | 查看当前 Bot 状态图，需 @bot 使用 |
| `*killbot` | 🛠️ 关闭 Bot |
| `*status notify on` / `*status notify off` | 🛠️ 开启/关闭群聊内 Bot 状态定时通知，开启后每天固定时间推送一次状态图 |

---

## 加退群通知服务 (welcome)

在群聊中发送加群提醒。

| 指令 | 功能 |
|------|------|
| `*welcome info` / `*欢迎信息` / `*入群信息` | 🛠️ 设置群聊欢迎信息。占位符：`@`（@入群用户）、`{user}`（入群用户昵称）、`{user_id}`（入群用户 QQ 号）。不加参数则清除。如 `*欢迎信息 欢迎 {user}({user_id}) 入群`。 |

---

## 画廊服务 (gallery)

上传和查看图片的画廊系统。

| 指令 | 功能 |
|------|------|
| `*看` / `*gall pick` | 随机查看画廊图片。`*看 画廊名` 随机查看；`*看 画廊名 x2` 随机两张；`*看 123` 查看指定 pid；`*看 -1` 倒数第一张。 |
| `*看所有` / `*gall list` | 查看所有画廊列表。`*看所有 画廊名` 查看指定画廊内图片列表。 |
| `*上传` / `*gall add` / `*gall upload` | 上传图片到指定画廊。回复图片/折叠消息。加 `force` 参数禁用查重。 |
| `*撤销上传` / `*gall cancel` / `*gall revert` | 撤销自己最近一次上传。🛠️ `*撤销上传 123` 撤销指定上传 id。 |
| `*上传记录` / `*gall record` | 查看指定 id 的上传记录。如 `*上传记录 123`。 |
| `*下载图包` / `*gall download link` | 获取画廊图包下载链接 |
| `*gall open` | 🛠️ 新建画廊。如 `*gall open 画廊名`。 |
| `*gall close` | 🛠️ 删除画廊。如 `*gall close 画廊名`。 |
| `*gall mode` | 🛠️ 查看/设置画廊模式。模式：`edit`（默认，允许上传删除）、`view`（仅查看）、`off`（关闭）。 |
| `*gall cover` | 🛠️ 修改画廊封面。如 `*gall cover 画廊名 123`。 |
| `*gall alias add` / `*gall alias del` | 🛠️ 添加/删除画廊别名 |
| `*gall del` / `*gall remove` | 🛠️ 删除指定 pid 图片。支持 `-1`、`100-119` 范围、多张混合。 |
| `*gall replace` | 🛠️ 替换指定 pid 图片。回复图片 + `*gall replace 123`。加 `force` 禁用查重。 |
| `*gall reload` / `*gall update` | 🛠️ 从本地图片重载画廊 |
| `*gall check` | 🛠️ 画廊查重。加 `all` 所有画廊；加 `rehash` 重新计算 hash。 |
| `*gall log` | 🛠️ 查询某 pid 图片的上传日志。如 `*gall log 123`。 |
| `*gall download` | 🛠️ 下载指定画廊的图片打包文件。如 `*gall download 画廊名`。 |

---

## 搜图服务 (imgexp)

图片来源搜索和媒体资源下载。

| 指令 | 功能 |
|------|------|
| `*search` / `*搜图` | 使用 Google Lens 和 SauceNAO 搜索图片来源 |
| `*ytdlp` / `*video` | 下载网页视频。参数：`-i`/`--info` 仅获取信息；`-g`/`--gif` 转换 GIF；`-l`/`--low-quality` 下载低质量。 |
| `*ximg` | 获取 X（推特）文章图片并拼图。拼图参数：`-V`/`--vertical` 垂直；`-H`/`--horizontal` 水平；`-G`/`--grid` 网格。其他：`-f`/`--fold` 折叠回复；`-g`/`--gif` 转 GIF。 |

---

## 数学服务 (math)

数学计算相关服务。

| 指令 | 功能 |
|------|------|
| `*eval` / `*计算` | 基于 Python asteval 库的科学计算。如 `*eval 1+1`、`*eval sin(pi/2)*sqrt(2)`。 |
| `*oeis` | 查询 OEIS 序列信息。如 `*oeis 1,2,3,4,5`。 |

---

## 随机服务 (random)

骰子、抽签等随机数生成服务。

| 指令 | 功能 |
|------|------|
| `*roll` / `*rand` / `*随机数` | 生成闭区间随机整数。`*roll` 默认 [0,100]；`*roll 6` [1,6]；`*roll 5 10` [5,10]。 |
| `*choose` / `*choice` / `*选择` | 从给定选项中随机选择。如 `*choose 石头 剪刀 布`。 |
| `*shuffle` / `*洗牌` / `*打乱` | 随机排列给定选项。如 `*shuffle 1 2 3 4 5`。 |
| `*rolluser` / `*randuser` / `*随机群友` | 随机选择群内成员。`*rolluser 3` 随机 3 个。 |
| `*bing` / `*博饼` / `*饼` | 中秋博饼（使用六个骰子的闽南传统游戏） |
| `*bing rule` / `*博饼规则` | 查看博饼规则说明 |

---

## 代码运行服务 (code)

基于 glot.io 提供代码运行服务，支持 40+ 语言。

`*code` / `*run` — 指定语言和标准输入运行代码，返回标准输出。

```
*code py 1 2
a, b = map(int, input().split())
print(a + b)
```

支持语言：py / php / java / cpp / js / c# / c / go / asm / ats / bash / clisp / clojure / cobol / coffeescript / crystal / d / elixir / elm / erlang / fsharp / groovy / guide / hare / haskell / idris / julia / kotlin / lua / mercury / nim / nix / ocaml / pascal / perl / raku / ruby / rust / sac / scala / swift / typescript / zig / plaintext

---

## Minecraft 服务 (mc)

基于卫星地图插件或日志监听服务以及 RCON 协议，提供 Minecraft 服务器对接。一个群聊对应一个 Minecraft 服务器。

标记 ⚙️ 的指令仅超级管理和服务器 OP 可用。

| 指令 | 功能 |
|------|------|
| `*send` | 向服务器发送消息，服务器中显示发送者的群名片。如 `*send 你好`。 |
| `*listen` | ⚙️ 设置/查询监听模式。模式：`off`（关闭）、`dynamicmap`（卫星地图）、`log`（日志文件）。 |
| `*info` | 获取服务器信息，包括预设信息、游戏时间、在线玩家状态 |
| `*setinfo` | ⚙️ 设置服务器信息。如 `*setinfo 服务器信息`。 |
| `*geturl` / `*seturl` | 获取/设置（⚙️）监听链接 |
| `*getrconurl` / `*setrconurl` | 获取/设置（⚙️）RCON 链接 |
| `*setrconpw` | ⚙️ 设置 RCON 密码（需私聊）。如 `*setrconpw 群号 password`。 |
| `*rcon` | ⚙️ 发送 RCON 命令。如 `*rcon say hello`。 |
| `*playtime` | 查询当前周目玩家游玩时间 |
| `*playtime clear` | ⚙️ 清空当前周目玩家游玩时间 |
| `*start game` | ⚙️ 切换新周目。如 `*start game GameName`。 |
| `*getoffset` / `*setoffset` | 获取/设置（⚙️）卫星地图请求时间偏移（ms） |
| `*getchatprefix` / `*setchatprefix` | 获取/设置（⚙️）服务器聊天前缀。只有以前缀开头的消息和 `*send` 消息会被转发到群。 |
| `*connect notify on` / `*connect notify off` | ⚙️ 开启/关闭服务器连线断线通知 |
| `*oplist` | 查看当前群聊 OP 列表 |
| `*op add` | 🛠️ 添加 OP。如 `*op add @成员1 @成员2`。 |
| `*op del` | 🛠️ 删除 OP。如 `*op del @成员1 @成员2`。 |

---

## 鸟类查询服务 (bird)

查询鸟类信息，数据来源：中文 Wiki 中国鸟类列表。

| 指令 | 功能 |
|------|------|
| `*bird` / `*鸟` / `*查鸟` | 使用鸟类名称查询鸟类信息，支持俗名和模糊查询。添加 `refresh` 参数刷新网页图片。如 `*bird 白鹭`、`*bird 白鹭 refresh`。 |

---

## 水群查询服务 (water)

> 该服务已停用。

---

<div class="src-attribution">基于 <a href="https://github.com/NeuraXmy/lunabot">NeuraXmy/lunabot</a> (MIT) 部署</div>
