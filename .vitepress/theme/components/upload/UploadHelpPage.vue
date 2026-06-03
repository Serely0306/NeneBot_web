<template>
  <ClientOnly>
    <div class="nene-page-container wide nene-page-enter">
      <div class="nene-card-header">
        <h1>抓包帮助</h1>
        <p class="subtitle">提供 iOS 模块抓包和 Android 半自动抓包的教程与工具下载。</p>
      </div>

      <div class="nene-page-actions">
        <span class="nene-page-actions-label">上传入口：</span>
        <a href="/nenebot/upload/suite" class="nene-btn-secondary">Suite 上传</a>
        <a href="/nenebot/upload/mysekai" class="nene-btn-secondary">MySekai 上传</a>
      </div>

      <!-- Horizontal tabs -->
      <div class="help-tabs nene-section-reveal">
        <button class="help-tab" :class="{ active: activeTab === 'ios-module' }" @click="activateTab('ios-module')">iOS 模块抓包</button>
        <button class="help-tab" :class="{ active: activeTab === 'android-guide' }" @click="activateTab('android-guide')">Android 半自动抓包</button>
      </div>

      <div v-if="message.text" :class="['nene-message', message.type]">{{ message.text }}</div>

      <!-- ═══════════ iOS Panel ═══════════ -->
      <section v-show="activeTab === 'ios-module'" class="help-panel nene-section-reveal">

        <!-- 模块声明 -->
        <div class="help-module-notice">
          <p class="help-module-notice-title">注意事项</p>
          <p>该部分提供的模块仅为 NeneBot 所部署的 <strong>LunaBot</strong> 部分的上传模块，该模块仅包括日服 suite/mysekai 和国服 suite 数据，未包括国服 mysekai 数据。</p>
          <p>上传到其他 Bot（<strong>Haruki 工具箱、SakuraBot</strong> 等）请自行参考其对应教程的模块。</p>
          <div class="module-dl">
            <button class="module-btn module-btn-secondary" @click="downloadIosModule">下载模块文件</button>
            <button class="module-btn module-btn-secondary" @click="copyIosModule">复制模块内容</button>
          </div>
        </div>

        <p class="help-attribution">以下教程部分来源于 <a href="https://bot.teaphenby.com/public/tutorial/tutorial.html#%E6%A8%A1%E5%9D%97%E6%8A%93%E5%8C%85" target="_blank" rel="noreferrer">LunaBot 的抓包教程</a>。</p>

        <!-- 适用范围 -->
        <div class="help-section">
          <p class="help-section-intro"><strong>适用：</strong>任意区服 · iOS 系统 · 需要代理软件</p>
          <p class="help-section-intro">本教程以 <code>Shadowrocket</code> 为例演示，使用前推荐更新软件到最新版。</p>
        </div>

        <hr class="help-divider">

        <!-- 准备工作 -->
        <div class="help-section">
          <h3>准备工作</h3>
          <ul>
            <li>一台 iOS 设备（iPhone / iPad 均可）</li>
            <li>以下任一代理软件（需在非国区 AppStore 购买，国区的基本都是仿冒品）：
              <ul>
                <li><code>Shadowrocket</code>（本教程以此为例）</li>
                <li><code>Surge</code> / <code>QuantumultX</code> / <code>Loon</code> / <code>Stash</code></li>
              </ul>
            </li>
          </ul>
        </div>

        <hr class="help-divider">

        <!-- 步骤 1：开启 HTTPS 解密 -->
        <div class="help-section">
          <h3>步骤 1：开启 HTTPS 解密（MITM）</h3>
          <p>打开 <code>Shadowrocket</code>，选择下方的 <strong>配置</strong>，点击本地文件中 <strong>打勾的配置的圈 i</strong> → <strong>HTTPS 解密</strong>。</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/1.jpg" alt="配置 → HTTPS解密" loading="lazy" @click="onImgClick">
            <img src="/assets/uploadhelp/2.jpg" alt="HTTPS解密入口" loading="lazy" @click="onImgClick">
          </div>
          <p>打开该界面最上面的 <strong>HTTPS 解密开关</strong>：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/3.jpg" alt="打开HTTPS解密开关" loading="lazy" @click="onImgClick">
          </div>
          <p>第一次开启会提示 <strong>安装证书（重要！）</strong>，需要完成三步：</p>
          <ol>
            <li><strong>下载证书</strong> — 从 HTTPS 解密界面的 <strong>证书</strong> 里下载</li>
            <li><strong>安装证书</strong> — 下载后在 <strong>系统设置 → 已下载的描述文件</strong> 中安装</li>
            <li><strong>信任证书</strong> — 在 <strong>系统设置 → 通用 → 关于本机 → 证书信任设置</strong> 中信任安装的证书</li>
          </ol>
          <p>全部完成后点击 HTTPS 解密界面的 <strong>证书</strong>，<strong>确保和下图中的状态一样</strong>：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/4.jpg" alt="证书已验证状态" loading="lazy" @click="onImgClick">
          </div>
          <p class="help-note">若证书安装遇到问题，可搜索 <strong>"Shadowrocket 证书 安装"</strong> 或 <strong>"Shadowrocket HTTPS 解密"</strong> 查找网上教程。</p>
        </div>

        <hr class="help-divider">

        <!-- 步骤 2：安装模块 -->
        <div class="help-section">
          <h3>步骤 2：安装模块</h3>
          <p>回到 <strong>配置</strong> 界面，进入 <strong>模块</strong>：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/5.jpg" alt="配置 → 模块" loading="lazy" @click="onImgClick">
          </div>
          <p>下载模块文件：<span class="help-inline-btn" @click="downloadIosModule">nene_upload.sgmodule</span>，或 <span class="help-inline-btn" @click="copyIosModule">复制模块内容</span>。</p>

          <div class="help-imgs">
            <img src="/assets/uploadhelp/6.jpg" alt="添加模块" loading="lazy" @click="onImgClick">
          </div>

          <p>完成后在下方模块中 <strong>确保抓包模块已启用</strong>（启用状态下右侧有 <strong>打勾标志</strong>，点击可启用/禁用，出现问题时可直接禁用模块）：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/7.jpg" alt="确保模块启用" loading="lazy" @click="onImgClick">
          </div>
        </div>

        <hr class="help-divider">

        <!-- 步骤 3：关闭内存压力检测 -->
        <div class="help-section">
          <h3>步骤 3：关闭内存压力检测</h3>
          <p>这一步仅 <code>Shadowrocket</code> 用户需要，其他软件可跳过。</p>
          <p>进入 <code>Shadowrocket</code> 的 <strong>设置</strong> → <strong>诊断</strong>：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/8.jpg" alt="设置 → 诊断" loading="lazy" @click="onImgClick">
          </div>
          <p>关闭内存压力检测：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/9.jpg" alt="关闭内存压力检测" loading="lazy" @click="onImgClick">
          </div>
        </div>

        <hr class="help-divider">

        <!-- 步骤 4：开始抓包 -->
        <div class="help-section">
          <h3>步骤 4：开始抓包</h3>
          <p>在 <code>Shadowrocket</code> 首页 <strong>开启代理</strong>（第一个开关打开）。</p>
          <p>下方全局路由选项：如果你可以直连游戏，选择 <strong>直连</strong>；否则根据你使用的网络情况选择 <strong>配置</strong> 或 <strong>代理</strong>：</p>
          <div class="help-imgs">
            <img src="/assets/uploadhelp/10.jpg" alt="开启代理" loading="lazy" @click="onImgClick">
          </div>
          <p>然后打开世界计划游戏，触发对应数据的抓包操作：</p>
          <ul>
            <li><strong>Suite 数据（打歌、养成、卡牌等）</strong> — 在标题界面登录进入游戏时自动抓取。</li>
            <li><strong>MySekai 数据（烤森）</strong> — 进入烤森，等到豆腐人走出房门看到提示即完成。此外需要在游戏中至少拍过一张照片（使用胶卷道具）。</li>
          </ul>
          <p class="help-note">如果 Bot 提示"你上传的 MySekai 数据里没有正确的数据"，请去编队随便交换个人再进入烤森抓包。</p>
        </div>

        <hr class="help-divider">

        <!-- 抓包失败检查 -->
        <div class="help-section">
          <h3>抓包失败检查</h3>
          <ol>
            <li>检查上传抓包的游戏账号和 Bot 绑定的游戏账号是否一致</li>
            <li>对照教程检查每个步骤是否全部完成，特别是证书和模块状态</li>
            <li>尝试 <strong>关闭模块</strong> 后是否能正常游戏（排查是否为代理问题）</li>
            <li>如果上传的是烤森数据，检查游戏中是否拍过照片</li>
            <li>若仍无法解决，请描述清楚哪个步骤出现问题并附上截图，向群友求助</li>
          </ol>
        </div>

        <hr class="help-divider">

        <!-- 其他代理软件 -->
        <div class="help-section">
          <h3>其他代理软件</h3>
          <p>使用 <code>Surge</code> / <code>QuantumultX</code> / <code>Loon</code> / <code>Stash</code> 的配置流程与 <code>Shadowrocket</code> 类似，都需要以下四步：</p>
          <ol>
            <li>开启 <code>HTTPS 解密</code>（或叫 <code>MITM</code>）</li>
            <li>安装并信任证书</li>
            <li>安装模块（或叫插件/配置）并启用</li>
            <li>打开代理后进入游戏</li>
          </ol>
        </div>

        <hr class="help-divider">

        <!-- 外部教程链接 -->
        <div class="help-section">
          <h3>更多参考</h3>
          <ul>
            <li><a href="https://github.com/Team-Haruki/HarukiBot-Docs/blob/master/docs/toolbox-tutorial/ios-module.md" target="_blank" rel="noreferrer">HarukiBot 工具箱 — iOS 模块上传数据教程</a>（初期准备、购买软件、证书配置等补充说明）</li>
            <li><a href="https://bot.teaphenby.com/public/tutorial/tutorial.html#%E6%A8%A1%E5%9D%97%E6%8A%93%E5%8C%85" target="_blank" rel="noreferrer">世界计划抓包教程 — 模块抓包</a>（含截图的操作指南）</li>
          </ul>
        </div>
      </section>

      <!-- ═══════════ Android Panel ═══════════ -->
      <section v-show="activeTab === 'android-guide'" class="help-panel nene-section-reveal">

        <!-- 注意事项 -->
        <div class="help-module-notice">
          <p class="help-module-notice-title">注意事项</p>
          <p>该部分提供的脚本仅为 NeneBot 所部署的 <strong>LunaBot</strong> 部分的上传工具，上传到其他 Bot 请自行参考其对应教程。</p>
        </div>

        <hr class="help-divider">

        <!-- 适用范围 -->
        <div class="help-section">
          <p class="help-section-intro"><strong>适用：</strong>国服 · Android7 系统 · 虚拟机</p>
          <p class="help-section-intro">半自动抓包方式，通过 Shell 脚本配置系统代理来捕获游戏网络请求。</p>
        </div>

        <hr class="help-divider">

        <!-- 下载脚本 -->
        <div class="help-section">
          <h3>下载脚本</h3>
          <p>根据需求下载对应的 Shell 脚本文件：</p>
          <div class="module-grid">
            <div class="module-grid-col">
              <button class="module-btn module-btn-secondary" @click="downloadScript(catcherDownloadUrl, 'catcher.sh')">catcher.sh（抓包脚本）</button>
              <button class="module-btn module-btn-secondary" @click="copyScript(catcherDownloadUrl, 'catcher.sh')">复制</button>
            </div>
            <div class="module-grid-col">
              <button class="module-btn module-btn-secondary" @click="downloadScript(killCatcherUrl, 'kill-catcher.sh')">kill-catcher.sh（停止脚本）</button>
              <button class="module-btn module-btn-secondary" @click="copyScript(killCatcherUrl, 'kill-catcher.sh')">复制</button>
            </div>
            <div class="module-grid-col">
              <button class="module-btn module-btn-secondary" @click="downloadScript(uninstallCatcherUrl, 'uninstall-catcher.sh')">uninstall-catcher.sh（卸载脚本）</button>
              <button class="module-btn module-btn-secondary" @click="copyScript(uninstallCatcherUrl, 'uninstall-catcher.sh')">复制</button>
            </div>
          </div>
        </div>

        <hr class="help-divider">

        <!-- 使用说明 -->
        <div class="help-section">
          <h3>使用说明</h3>
          <p>本工具的使用流程与 HarukiProxy 基本相同，详细操作步骤（虚拟机安装、MT 管理器使用、问题排查等）可参考：</p>
          <p><a href="https://neo.haruki.seiunx.com/haruki-proxy/android" target="_blank" rel="noreferrer">HarukiProxy Android 抓包教程 →</a></p>
          <p>使用时注意以下区别：</p>
          <ol>
            <li>复制上方的 <code>catcher.sh</code>到你新建的文件中保存（非 <code>harukiproxy.sh</code>的内容），在 MT 管理器中勾选"使用扩展包环境执行"和"使用 ROOT 权限执行"后运行。</li>
            <li>脚本会自动下载执行文件到 <code>/data/local/tmp/catcher</code> 目录（非 harukiproxy），以及 <code>config-android.yaml</code> 配置文件。</li>
            <li>不要修改上传端点<code>upload_server</code>，除非本处后续明确说明。</li>
            <li>停止和卸载分别使用 <code>kill-catcher.sh</code> 和 <code>uninstall-catcher.sh</code>。</li>
          </ol>
        </div>
      </section>

      <!-- Lightbox overlay -->
      <Teleport to="body">
        <div v-if="zoomedImg" class="help-lightbox" @click="zoomedImg = null">
          <img :src="zoomedImg" alt="放大查看">
        </div>
      </Teleport>

      <div class="nene-footer">Nene-LunaBot Upload Help</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useUploadHelp } from '../../composables/useUploadHelp'

const {
  activeTab,
  message,
  androidGuideContent,
  iosModuleUrl,
  catcherDownloadUrl,
  killCatcherUrl,
  uninstallCatcherUrl,
  activateTab,
  copyIosModule,
  downloadIosModule,
  downloadScript,
  copyScript,
} = useUploadHelp()

const zoomedImg = ref<string | null>(null)

function onImgClick(e: Event) {
  const target = e.target as HTMLImageElement
  if (target?.src) zoomedImg.value = target.src
}

onMounted(() => {
  const knownTabs = new Set(['ios-module', 'android-guide'])
  const initialTab = window.location.hash ? window.location.hash.slice(1) : 'ios-module'
  activateTab(knownTabs.has(initialTab) ? initialTab : 'ios-module')
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
    })
  })
})
</script>

<style scoped>
/* ── Tabs ── */
.help-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 32px;
  margin-top: 24px;
}
.help-tab {
  padding: 10px 20px;
  font-size: 0.95rem; font-weight: 600;
  background: none; border: none; color: var(--text-muted);
  cursor: pointer; transition: color 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.help-tab:hover { color: var(--text-secondary); }
.help-tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.help-panel { animation: panel-in 0.25s ease-out; max-width: 900px; }
@keyframes panel-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── Sections (no card background, plain dividers) ── */
.help-section {
  margin-bottom: 24px;
}
.help-section h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 14px 0;
}
.help-section p {
  font-size: 1rem; color: var(--text-secondary); line-height: 1.8;
  margin: 0 0 10px 0;
}
.help-section p:last-child { margin-bottom: 0; }
.help-section ul, .help-section ol {
  font-size: 1rem; color: var(--text-secondary); line-height: 1.9;
  padding-left: 1.5em; margin: 8px 0;
}
.help-section ul:last-child, .help-section ol:last-child { margin-bottom: 0; }
.help-section li { margin-bottom: 4px; }
.help-section li:last-child { margin-bottom: 0; }
.help-section code {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.92rem;
  background: rgba(127, 127, 127, 0.12);
  padding: 1px 6px;
  border-radius: 4px;
}
.help-section a { color: var(--accent); text-decoration: none; }
.help-section a:hover { text-decoration: underline; }

.help-section-intro {
  font-size: 1rem !important;
  color: var(--text-secondary);
}
.help-attribution {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
  font-style: italic;
}
.help-attribution a { color: var(--accent); text-decoration: none; }
.help-attribution a:hover { text-decoration: underline; }

.help-module-notice {
  background: rgba(214, 48, 49, 0.12);
  border: 1px solid rgba(214, 48, 49, 0.25);
  border-left: 4px solid rgba(214, 48, 49, 0.6);
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
}
.help-module-notice-title {
  font-size: 1.35rem !important;
  font-weight: 700;
  color: #d63031 !important;
  margin: 0 0 10px 0 !important;
}
.help-module-notice p {
  font-size: 1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0 0 14px 0;
}
[data-theme="dark"] .help-module-notice {
  background: rgba(214, 48, 49, 0.15);
  border-color: rgba(214, 48, 49, 0.3);
  border-left-color: rgba(214, 48, 49, 0.5);
}
[data-theme="dark"] .help-module-notice-title {
  color: #ff6b6b !important;
}
[data-theme="dark"] .help-module-notice p {
  color: #f0f0f0;
}
.help-note {
  font-size: 0.92rem !important;
  color: var(--text-muted) !important;
  font-style: italic;
}

/* ── Dividers ── */
.help-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 0 0 24px 0;
}

/* ── Tutorial images ── */
.help-imgs {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px 0;
}
.help-imgs img {
  max-width: 720px;
  max-height: 1200px;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  object-fit: contain;
  background: rgba(0,0,0,0.06);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.help-imgs img:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
@media (max-width: 560px) {
  .help-imgs img { max-width: 100%; }
}

/* ── Lightbox ── */
.help-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: lb-in 0.2s ease-out;
}
.help-lightbox img {
  max-width: 92vw;
  max-height: 92vh;
  border-radius: 12px;
  box-shadow: 0 8px 48px rgba(0,0,0,0.4);
}
@keyframes lb-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Module download row ── */
.module-dl {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  margin: 20px 0;
  max-width: 720px;
}
.module-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  text-decoration: none;
  line-height: 1.3;
  white-space: nowrap;
}
.module-btn:active { transform: scale(0.97); }

.module-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
  max-width: 720px;
}
.module-grid-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.module-grid-col .module-btn {
  width: 100%;
}
.module-btn-primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.module-btn-primary:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
}
.module-btn-secondary {
  background: var(--bg-glass);
  color: var(--text-primary);
}
.module-btn-secondary:hover {
  background: rgba(127, 127, 127, 0.12);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* Keep android styles */
.nene-page-actions-label {
  font-size: 0.95rem;
  color: var(--text-secondary);
  align-self: center;
}
.help-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
.help-code { min-height: 200px; position: relative; }
.help-code::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent);
  opacity: 0.6;
}
.help-steps { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7; }

.help-inline-btn {
  color: var(--accent);
  cursor: pointer;
  text-decoration: none;
}
.help-inline-btn:hover { text-decoration: underline; }
</style>
