<template>
  <ClientOnly>
    <div class="nene-page-container nene-page-enter">
      <div class="nene-card-header">
        <h1>MySekai 数据上传</h1>
        <p class="subtitle">上传你的 MySekai 抓包数据到 NeneBot</p>
      </div>

      <div class="mysekai-grid">
        <!-- Left: Step Flow -->
        <div class="mysekai-main">
          <!-- Step 1 -->
          <section class="nene-section-reveal">
            <div class="nene-section-label">步骤 1 · 查询绑定账号</div>
            <div class="step-row">
              <div class="nene-form-group" style="flex:1;min-width:120px;">
                <label for="region">游戏区服</label>
                <select id="region" v-model="region" class="nene-select">
                  <option value="jp">日服 (JP)</option>
                  <option value="cn">国服 (CN)</option>
                </select>
              </div>
              <div class="nene-form-group" style="flex:2;min-width:160px;">
                <label for="qqId">你的 QQ 号</label>
                <input id="qqId" v-model="qqId" type="text" class="nene-input" placeholder="请输入你绑定账号时使用的 QQ 号" @keypress.enter="queryBinding">
              </div>
              <button class="nene-btn nene-btn-primary step1-btn" :disabled="querying || !qqId.trim()" @click="queryBinding">
                <span v-if="querying">查询中...</span>
                <span v-else>查询绑定账号</span>
              </button>
            </div>
            <div v-if="queryResultMessage" :class="['query-result', queryResultType === 'success' ? 'query-success' : 'query-error']">
              {{ queryResultMessage }}
            </div>
          </section>

          <!-- Step 2 -->
          <section v-if="step >= 2" class="nene-section-reveal">
            <div class="nene-section-label">步骤 2 · 选择要上传数据的账号</div>
            <div class="nene-accounts-list">
              <div v-for="account in boundAccounts" :key="account.game_id"
                class="nene-account-item account-item"
                :class="{ selected: selectedAccount?.game_id === account.game_id }"
                @click="selectAccount(account)">
                <div class="nene-account-info">
                  <span class="nene-account-index">账号 {{ account.index }}</span>
                  <span class="nene-account-id">{{ account.display_id }}</span>
                  <span v-if="account.is_main" class="nene-account-badge">主账号</span>
                </div>
                <span class="nene-account-select-icon">{{ selectedAccount?.game_id === account.game_id ? '●' : '○' }}</span>
              </div>
            </div>
          </section>

          <!-- Step 3 -->
          <section v-if="step >= 3" class="nene-section-reveal">
            <div class="nene-section-label">步骤 3 · 上传数据文件</div>
            <div v-if="selectedAccount" class="selected-bar">
              <span>将为账号 <strong>{{ selectedAccount.display_id }}</strong> 上传数据</span>
              <span v-if="selectedAccount.is_main" class="badge">主账号</span>
            </div>
            <div v-if="!selectedFile" class="nene-upload-area upload-zone" @click="triggerFileInput" @dragover.prevent @drop.prevent="onDrop">
              <div class="nene-upload-icon">&#x1F4C1;</div>
              <p class="nene-upload-text">拖拽文件到此处，或点击选择文件</p>
              <p class="nene-upload-hint">请上传抓到的 MySekai 文件</p>
              <input ref="fileInputRef" type="file" accept=".json,.bin,.msgpack,.dat,application/json,application/octet-stream,*/*" hidden @change="onFileChange">
            </div>
            <div v-else class="nene-file-info">
              <div class="nene-file-name">{{ selectedFile.name }}</div>
              <div class="nene-file-size">{{ formatFileSize(selectedFile.size) }}</div>
              <button class="nene-file-clear" @click="clearFile">&#x2715;</button>
            </div>
            <div v-if="uploading" class="nene-progress-container">
              <div class="nene-progress-bar">
                <div class="nene-progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <div class="nene-progress-text">{{ progressText }}</div>
            </div>
            <button class="nene-btn nene-btn-success" :disabled="!canUpload || uploading" @click="upload">
              <span v-if="uploading">上传中...</span>
              <span v-else>开始上传</span>
            </button>
          </section>
        </div>

        <!-- Right: Guide -->
        <div class="mysekai-side">
          <div class="nene-section-reveal">
            <div class="nene-section-label">使用说明</div>
            <ol class="side-guide">
              <li>选择你的游戏区服，输入你在 NeneBot的LunaBot 绑定时使用的 QQ 号</li>
              <li>点击查询后，选择你要上传数据的游戏账号</li>
              <li>上传抓包得到的 MySekai 数据文件</li>
              <li>上传成功后，可在 NeneBot的LunaBot 部分使用相关功能</li>
            </ol>
          </div>
        </div>
      </div>

      <div v-if="message.text" :class="['nene-message', message.type]">{{ message.text }}</div>
      <div class="nene-footer">NeneBot MySekai Upload Service v2.0</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useMySekaiUpload } from '../../composables/useMySekaiUpload'

const fileInputRef = ref<HTMLInputElement | null>(null)
const {
  region, qqId, selectedFile, selectedAccount, boundAccounts,
  querying, queryResultMessage, queryResultType,
  uploading, progress, progressText, message, step, canUpload,
  formatFileSize, handleFile, clearFile, queryBinding, selectAccount, upload,
} = useMySekaiUpload()

function triggerFileInput() { fileInputRef.value?.click() }
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.length) handleFile(input.files[0])
}
function onDrop(e: DragEvent) {
  if (e.dataTransfer?.files.length) handleFile(e.dataTransfer.files[0])
}

function revealSections() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal:not(.is-revealed)').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
    })
  })
}

onMounted(() => revealSections())

watch(step, async () => {
  await nextTick()
  revealSections()
})
</script>

<style scoped>
.mysekai-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--section-gap);
  align-items: start;
}
@media (max-width: 768px) {
  .mysekai-grid { grid-template-columns: 1fr; gap: var(--subsection-gap); }
}

.mysekai-main { display: flex; flex-direction: column; gap: var(--subsection-gap); }
.mysekai-side { display: flex; flex-direction: column; gap: var(--subsection-gap); position: sticky; top: 80px; }

.step-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.step1-btn { flex-shrink: 0; align-self: flex-end; }

.query-result { margin-top: 14px; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; }
.query-success { color: #00b894; background: rgba(0,184,148,0.08); }
.query-error { color: #d63031; background: rgba(214,48,49,0.06); }

.account-item {
  position: relative; overflow: hidden;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}
.account-item::before {
  content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
  width: 3px; border-radius: 0 4px 4px 0;
  background: var(--accent-gradient);
  opacity: 0; transform: scaleY(0.6);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.account-item.selected::before { opacity: 1; transform: scaleY(1); }
.account-item:hover { transform: translateY(-1px); }

.selected-bar {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-radius: 10px;
  background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.15);
  font-size: 0.88rem; margin-bottom: 16px;
}
.selected-bar .badge { background: var(--accent); color: #fff; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; }

.upload-zone {
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
}
.upload-zone:hover {
  border-color: var(--accent);
  background: rgba(167,139,250,0.04);
  transform: translateY(-1px);
}

.side-guide { padding-left: 20px; color: var(--text-primary); font-size: 0.9rem; line-height: 1.8; }
.side-guide li { margin-bottom: 6px; }
</style>
