<template>
  <ClientOnly>
    <div class="nene-page-container nene-page-enter">
      <div class="nene-card-header">
        <h1>Suite 数据上传</h1>
        <p class="subtitle">上传你的 Suite 抓包数据到 NeneBot</p>
      </div>

      <div class="suite-grid">
        <!-- Left: Main -->
        <div class="suite-main">
          <section class="nene-section-reveal">
            <div class="nene-section-label">选择区服</div>
            <div class="nene-form-group">
              <select id="region" v-model="region" class="nene-select">
                <option value="jp">日服 (JP)</option>
                <option value="cn">国服 (CN)</option>
              </select>
            </div>
          </section>

          <section class="nene-section-reveal">
            <div class="nene-section-label">上传数据文件</div>
            <div v-if="!selectedFile" class="nene-upload-area suite-upload" @click="triggerFileInput" @dragover.prevent @drop.prevent="onDrop">
              <div class="nene-upload-icon">&#x1F4C1;</div>
              <p class="nene-upload-text">拖拽文件到此处，或点击选择文件</p>
              <p class="nene-upload-hint">请上传抓到的 Suite 文件</p>
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
            <button class="nene-btn nene-btn-success" :disabled="!selectedFile || uploading" @click="upload">
              <span v-if="uploading">上传中...</span>
              <span v-else>开始上传</span>
            </button>
          </section>
        </div>

        <!-- Right: Guide -->
        <div class="suite-side">
          <div class="nene-section-reveal">
            <div class="nene-section-label">使用说明</div>
            <ol class="suite-guide">
              <li>选择你的游戏区服</li>
              <li>上传抓包得到的 Suite 数据文件：
                <ul class="suite-guide-sub">
                  <li><strong>二进制文件</strong> — 抓包得到的原始数据</li>
                  <li><strong>.json 文件</strong> — 已解密的 JSON 数据</li>
                </ul>
              </li>
              <li>上传成功后，可在 NeneBot 中使用相关功能</li>
            </ol>
          </div>
        </div>
      </div>

      <div v-if="message.text" :class="['nene-message', message.type]">{{ message.text }}</div>
      <div class="nene-footer">NeneBot Suite Upload Service v2.1</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useSuiteUpload } from '../../composables/useSuiteUpload'

const fileInputRef = ref<HTMLInputElement | null>(null)
const { region, selectedFile, uploading, progress, progressText, message, formatFileSize, handleFile, clearFile, upload } = useSuiteUpload()

function triggerFileInput() { fileInputRef.value?.click() }
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.length) handleFile(input.files[0])
}
function onDrop(e: DragEvent) {
  if (e.dataTransfer?.files.length) handleFile(e.dataTransfer.files[0])
}

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
    })
  })
})
</script>

<style scoped>
.suite-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--section-gap);
  align-items: start;
}
@media (max-width: 768px) {
  .suite-grid { grid-template-columns: 1fr; gap: var(--subsection-gap); }
}

.suite-main { display: flex; flex-direction: column; gap: var(--subsection-gap); }
.suite-side { display: flex; flex-direction: column; gap: var(--subsection-gap); position: sticky; top: 80px; }

.suite-upload {
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
}
.suite-upload:hover {
  border-color: var(--accent);
  background: rgba(167,139,250,0.04);
  transform: translateY(-1px);
}

.suite-guide { padding-left: 20px; color: var(--text-primary); font-size: 0.9rem; line-height: 1.8; }
.suite-guide li { margin-bottom: 6px; }
.suite-guide strong { color: var(--text-primary); font-weight: 700; }
.suite-guide-sub { margin-top: 4px; color: var(--text-secondary); font-size: 0.84rem; padding-left: 18px; }
.suite-guide-sub li { margin-bottom: 2px; }
</style>
