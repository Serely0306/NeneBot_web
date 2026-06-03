<template>
  <ClientOnly>
    <div class="nene-page-container nene-page-enter">
      <div class="nene-card-header">
        <h1>Bot 加群申请</h1>
        <p class="subtitle">填写信息提交申请，管理员审核后处理</p>
      </div>

      <div class="apply-grid">
        <!-- Left Column -->
        <div class="apply-col">
          <section class="apply-section nene-section-reveal">
            <div class="nene-section-label">填写申请</div>
            <form @submit.prevent="submitApplication">
              <div class="nene-form-group">
                <label>QQ群号 <span class="required">*</span></label>
                <input v-model="formData.group_id" type="text" class="nene-input" placeholder="请输入目标群号" maxlength="20" required>
              </div>
              <div class="nene-form-group">
                <label>拉群目的 <span class="required">*</span></label>
                <textarea v-model="formData.purpose" class="nene-input" placeholder="请说明拉 Bot 进群的用途..." required style="resize:vertical;min-height:80px;"></textarea>
              </div>
              <div class="nene-form-group">
                <label>申请人QQ号 <span class="required">*</span></label>
                <input v-model="formData.applicant" type="text" class="nene-input" placeholder="你的 QQ 号，用于查询审核结果" maxlength="20" required>
              </div>
              <button type="submit" class="nene-btn nene-btn-primary" :disabled="submitting">
                {{ submitting ? '提交中...' : '提交申请' }}
              </button>
            </form>
            <div v-if="message.text" :class="['nene-message', message.type]">{{ message.text }}</div>
          </section>

          <section class="apply-section nene-section-reveal">
            <div class="nene-section-label">查询申请状态</div>
            <div class="nene-form-group">
              <input v-model="queryQQ" type="text" class="nene-input" placeholder="输入你的 QQ 号查询审核进度" maxlength="20" @keypress.enter="queryStatus">
            </div>
            <button class="nene-btn nene-btn-primary" :disabled="querying || !queryQQ.trim()" @click="queryStatus">
              {{ querying ? '查询中...' : '查询' }}
            </button>
            <div v-if="queryResults.length > 0" class="query-results">
              <div v-for="(r, i) in queryResults" :key="i" class="query-result-item">
                <div>
                  <div class="query-result-group">群 {{ escapeHtml(r.group_id) }}</div>
                  <div class="query-result-purpose">{{ escapeHtml(r.purpose) }}{{ r.member_count ? ' · ' + r.member_count + '人' : '' }}</div>
                  <div v-if="r.admin_note" class="query-result-note">{{ escapeHtml(r.admin_note) }}</div>
                </div>
                <span :class="['nene-status-pill', r.status]">{{ statusLabels[r.status] || r.status }}</span>
              </div>
            </div>
            <p v-else-if="queryError === 'invalid'" class="query-msg query-error">请输入有效的 QQ 号</p>
            <p v-else-if="queryError === 'network'" class="query-msg query-error">查询失败</p>
            <p v-else-if="!querying && queryQQ && queryResults.length === 0" class="query-msg query-empty">暂无申请记录</p>
          </section>
        </div>

        <!-- Right Column -->
        <div class="apply-col">
          <section class="apply-section nene-section-reveal">
            <div class="nene-section-label">申请流程</div>
            <ol class="apply-flow-list">
              <li v-for="(step, i) in flowSteps" :key="i" class="apply-flow-item">
                <span class="nene-step-badge">{{ i + 1 }}</span>
                <span class="apply-step-text" v-html="step"></span>
              </li>
            </ol>
            <hr class="nene-divider">
            <div class="nene-section-label" style="margin-top:0;">注意事项</div>
            <ul class="apply-notes-list">
              <li v-for="(note, i) in notes" :key="i" class="apply-note-item">
                <span v-html="note"></span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div class="nene-footer">NENEBOT</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useApply } from '../../composables/useApply'

const {
  formData, submitting, message,
  queryQQ, queryResults, querying, queryError,
  submitApplication, queryStatus,
  statusLabels, escapeHtml,
} = useApply()

const flowSteps = [
  '填写群号、拉群目的和你的 QQ 号，<strong>提交申请</strong>',
  'Bot <strong>自动验证</strong>目标群聊是否真实存在',
  '管理员审核申请信息，<strong>决定通过或拒绝</strong>',
  '审核通过后，你需要<strong>主动将 Bot 拉入群聊</strong>',
  'Bot <strong>自动通过入群验证</strong>，完成加群',
]

const notes = [
  '请确保群号真实有效，<strong>虚假信息将被记录并可能导致 IP 被封禁</strong>',
  '同一群聊同时只能有一个待审核的申请，<strong>请勿重复提交</strong>',
  '提交后可在下方查询区域输入 QQ 号查看审核进度',
  '审核通常于 <strong>12 小时内</strong>完成，若超时未处理请联系 Bot 主',
  '请确保目标群聊<strong>设置为允许被搜索</strong>，否则自动验证无法完成',
  '<strong>审核结果不会主动通知</strong>，请自行查询或留意群内 Bot 入群提示',
]

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
    })
  })
})
</script>

<style scoped>
.apply-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--section-gap);
  align-items: start;
}
@media (max-width: 768px) {
  .apply-grid { grid-template-columns: 1fr; gap: var(--subsection-gap); }
}

.apply-col { display: flex; flex-direction: column; gap: var(--subsection-gap); }
.apply-section { /* no card wrapper — immersive */ }

/* Flow steps with progress line */
.apply-flow-list { list-style: none; padding: 0; margin: 0; }
.apply-flow-item {
  position: relative;
  padding: 12px 0 12px 44px;
}
.apply-flow-item::before {
  content: '';
  position: absolute;
  left: 13px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, rgba(167,139,250,0.4), rgba(167,139,250,0.05));
}
.apply-flow-item:last-child::before { display: none; }
.apply-flow-item .nene-step-badge {
  position: absolute;
  left: 0; top: 12px;
}
.apply-step-text { font-size: 0.88rem; line-height: 1.55; }
.apply-step-text :deep(strong) { color: var(--accent); }

/* Notes */
.apply-notes-list { list-style: none; padding: 0; }
.apply-note-item {
  position: relative;
  padding: 7px 0 7px 22px;
  font-size: 0.86rem;
  line-height: 1.65;
}
.apply-note-item::before {
  content: '';
  position: absolute;
  left: 6px; top: 14px;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(167,139,250,0.4);
}
.apply-note-item :deep(strong) { color: var(--accent); }

:deep(.required) { color: #d63031; }

/* Query results */
.query-results { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
.query-result-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
}
.query-result-group { font-weight: 600; font-size: 0.85rem; }
.query-result-purpose { font-size: 0.9rem; color: var(--text-muted); }
.query-result-note { font-size: 0.9rem; color: #d63031; margin-top: 2px; }
.query-msg { font-size: 0.85rem; margin-top: 10px; }
.query-error { color: #d63031; }
.query-empty { color: var(--text-muted); }
</style>
