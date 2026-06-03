<template>
  <ClientOnly>
    <!-- Lock Screen -->
    <div v-if="!unlocked" class="nene-page-container lock-wrap">
      <div class="nene-glass-section lock-card">
        <div class="lock-icon-wrap">
          <div class="lock-icon">&#x1F510;</div>
        </div>
        <h2 class="lock-title">管理员验证</h2>
        <p class="lock-sub">输入管理密钥以访问审核面板</p>
        <input v-model="tokenInput" type="password" class="nene-input lock-input" placeholder="密钥" @keypress.enter="unlock">
        <button class="nene-btn nene-btn-primary" @click="unlock">验证</button>
      </div>
    </div>

    <!-- Panel -->
    <div v-else class="nene-page-container wide nene-page-enter">
      <div class="nene-card-header">
        <h1>审核管理</h1>
        <p class="subtitle">共 {{ totalCount }} 条申请记录</p>
      </div>

      <!-- Filters + IP -->
      <div class="review-toolbar nene-section-reveal">
        <div class="filter-row">
          <button v-for="tab in filters" :key="tab.key"
            class="filter-tab" :class="{ active: currentStatus === tab.key && !showDeleted }"
            @click="setFilter(tab.key)">{{ tab.label }}</button>
          <button class="filter-tab filter-tab--del" :class="{ active: showDeleted }" @click="toggleDeleted">已删除</button>
          <button class="filter-tab filter-tab--ip" :class="{ active: ipPanelOpen }" @click="ipPanelOpen = !ipPanelOpen">IP管理</button>
        </div>

        <div v-if="actionMessage.text" :class="['action-msg', actionMessage.type]">{{ actionMessage.text }}</div>

        <div class="ip-panel" :class="{ open: ipPanelOpen }">
          <div class="ip-panel-inner">
            <template v-if="ipMeta.ip_blacklist.length > 0">
              <div class="ip-section-label">黑名单</div>
              <table class="ip-table"><tr><th>IP</th><th>操作</th></tr>
                <tr v-for="ip in ipMeta.ip_blacklist" :key="ip">
                  <td class="ip-mono">{{ ip }}</td>
                  <td><button class="btn-sm" @click="ipRemove(ip)">移除</button></td>
                </tr>
              </table>
            </template>
            <template v-if="Object.keys(ipMeta.ip_fake_counts).length > 0">
              <div class="ip-section-label" style="margin-top:12px;">虚假申请计数</div>
              <table class="ip-table"><tr><th>IP</th><th>次数</th></tr>
                <tr v-for="([ip, count]) in Object.entries(ipMeta.ip_fake_counts).sort((a,b) => b[1] - a[1])" :key="ip">
                  <td class="ip-mono">{{ ip }}<span v-if="ipMeta.ip_blacklist.includes(ip)" class="ip-blocked"> [已封]</span></td>
                  <td>{{ count }}</td>
                </tr>
              </table>
            </template>
            <div class="ip-add-row">
              <input v-model="newIpInput" type="text" class="nene-input ip-input" placeholder="输入 IP 地址">
              <button class="btn-sm btn-sm--add" @click="ipAdd">封禁 IP</button>
            </div>
            <p v-if="!ipMeta.ip_blacklist.length && !Object.keys(ipMeta.ip_fake_counts).length" class="ip-empty">暂无 IP 数据</p>
          </div>
        </div>
      </div>

      <!-- Main: Table List + Side Detail -->
      <div v-if="loading" class="loading-state">加载中...</div>
      <div v-else-if="records.length === 0" class="nene-glass-section empty-state">暂无申请记录</div>
      <div v-else class="review-split nene-section-reveal">
        <!-- Left: compact table -->
        <div class="review-list">
          <div v-for="r in records" :key="r.id"
            :class="['review-row', r.status, { selected: selectedRecord?.id === r.id }]"
            @click="selectedRecord = r">
            <span :class="['nene-status-pill', r.status]">{{ statusLabel(r.status) }}</span>
            <div class="review-row-info">
              <div class="review-row-name">{{ escapeHtml(r.group_name || ('群 ' + r.group_id)) }}</div>
              <div class="review-row-meta">{{ r.group_id }} · {{ r.member_count }}人 · {{ new Date(r.created_at).toLocaleDateString('zh-CN') }}</div>
            </div>
            <span class="review-row-arrow">&#8250;</span>
          </div>
        </div>

        <!-- Right: detail panel -->
        <div class="review-detail" v-if="selectedRecord">
          <div class="nene-glass-section" style="margin-bottom:0;">
            <div class="detail-header">
              <img :src="groupAvatar(selectedRecord.group_id)" class="detail-avatar" @error="($event.target as HTMLImageElement).style.display='none'">
              <div>
                <div class="detail-name">{{ escapeHtml(selectedRecord.group_name || ('群 ' + selectedRecord.group_id)) }}</div>
                <div class="detail-meta">群号 {{ selectedRecord.group_id }} · {{ selectedRecord.member_count }}人</div>
              </div>
              <span :class="['nene-status-pill', selectedRecord.status]">{{ statusLabel(selectedRecord.status) }}</span>
            </div>
            <hr class="nene-divider">
            <div class="detail-row">
              <img :src="userAvatar(selectedRecord.applicant)" class="detail-avatar-sm" @error="($event.target as HTMLImageElement).style.display='none'">
              <div>
                <div class="detail-label">申请人</div>
                <div>{{ escapeHtml(selectedRecord.applicant_nickname || selectedRecord.applicant) }} · QQ {{ selectedRecord.applicant }}</div>
              </div>
            </div>
            <div class="detail-row">
              <span class="detail-label-mono">IP</span>
              <span class="ip-mono">{{ escapeHtml(selectedRecord.client_ip || '未知') }}</span>
            </div>
            <div v-if="selectedRecord.verified === true" class="detail-verified">已验证</div>
            <div v-else-if="selectedRecord.verified === false && selectedRecord.status === 'rejected'" class="detail-verify-fail" :title="escapeHtml(selectedRecord.verification_note || '')">验证失败（已自动拒绝）</div>
            <div v-else-if="selectedRecord.verified === false" class="detail-verify-warn" :title="escapeHtml(selectedRecord.verification_note || '')">无法验证</div>
            <div v-else-if="selectedRecord.verified == null && !selectedRecord.verified_at" class="detail-verify-pending">待验证</div>
            <div v-else class="detail-verify-warn" :title="escapeHtml(selectedRecord.verification_note || '')">无法验证</div>
            <div class="detail-purpose">{{ escapeHtml(selectedRecord.purpose) }}</div>
            <div class="detail-time">{{ new Date(selectedRecord.created_at).toLocaleString('zh-CN') }}</div>
            <div v-if="selectedRecord.admin_note" class="detail-note">
              {{ escapeHtml(selectedRecord.admin_note) }}
              <button @click="editNote(selectedRecord.id)" class="btn-edit-note">编辑</button>
            </div>
            <div class="detail-actions">
              <template v-if="selectedRecord.status === 'pending'">
                <button class="btn-approve" @click="approve(selectedRecord.id)">通过</button>
                <button class="btn-reject" @click="rejectApp(selectedRecord.id)">拒绝</button>
              </template>
              <button v-if="selectedRecord.status !== 'pending'" class="btn-revoke" @click="revokeApp(selectedRecord.id)">撤销</button>
              <button class="btn-delete" @click="deleteApp(selectedRecord.id)">删除</button>
            </div>
          </div>
        </div>
        <div v-else class="review-detail review-detail--empty">
          <div class="nene-glass-section" style="margin-bottom:0;text-align:center;">
            <p style="color:var(--text-muted);font-size:0.85rem;">选择左侧申请查看详情</p>
          </div>
        </div>
      </div>

      <div class="nene-footer">NENEBOT Review Panel</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useReview } from '../../composables/useReview'

const {
  unlocked, tokenInput,
  currentStatus, showDeleted, records, totalCount, loading,
  actionMessage, ipMeta, ipPanelOpen, newIpInput,
  unlock, setFilter, toggleDeleted,
  approve, rejectApp, revokeApp, editNote, deleteApp,
  ipRemove, ipAdd,
  statusLabel, groupAvatar, userAvatar, escapeHtml,
} = useReview()

const filters = [
  { key: '', label: '全部' },
  { key: 'pending', label: '待审核' },
  { key: 'approved', label: '已通过' },
  { key: 'rejected', label: '已拒绝' },
]

const selectedRecord = ref<any>(null)

function revealSections() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal').forEach((el, i) => {
      // only reveal elements that haven't been revealed yet
      if (!el.classList.contains('is-revealed')) {
        setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
      }
    })
  })
}

onMounted(() => revealSections())

watch(unlocked, (val) => {
  if (val) nextTick(() => revealSections())
})
</script>

<style scoped>
/* Lock screen */
.lock-wrap { max-width: 400px; margin-top: 100px; }
.lock-card { text-align: center; padding: 44px 32px; }
.lock-icon-wrap {
  width: 64px; height: 64px; margin: 0 auto 18px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(108,92,231,0.1);
  box-shadow: 0 0 32px rgba(108,92,231,0.18);
  animation: lock-pulse 3s ease-in-out infinite;
}
@keyframes lock-pulse {
  0%, 100% { box-shadow: 0 0 24px rgba(108,92,231,0.15); }
  50% { box-shadow: 0 0 40px rgba(108,92,231,0.3); }
}
.lock-icon { font-size: 1.5rem; }
.lock-title { font-size: 1.1rem; margin-bottom: 4px; }
.lock-sub { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px; }
.lock-input { text-align: center; letter-spacing: 2px; margin-bottom: 14px; }

/* Toolbar */
.review-toolbar { margin-bottom: 20px; }
.filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
.filter-tab {
  padding: 6px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  background: transparent; border: 1.5px solid var(--border-subtle); color: var(--text-muted);
}
.filter-tab.active {
  background: rgba(108,92,231,0.1); border-color: rgba(108,92,231,0.25); color: var(--accent);
}
.filter-tab--del.active { background: rgba(214,48,49,0.08); border-color: rgba(214,48,49,0.2); color: #d63031; }
.filter-tab--ip { margin-left: auto; font-size: 0.87rem; }

.action-msg {
  display: block; padding: 10px 14px; margin-top: 12px; border-radius: 10px; font-size: 0.82rem;
}
.action-msg.success { background: rgba(0,184,148,0.1); color: #00b894; border: 1px solid rgba(0,184,148,0.22); }
.action-msg.error { background: rgba(214,48,49,0.08); color: #d63031; border: 1px solid rgba(214,48,49,0.18); }

/* IP panel */
.ip-panel { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
.ip-panel.open { max-height: 600px; }
.ip-panel-inner { padding-top: 14px; }
.ip-section-label { font-weight: 600; font-size: 0.8rem; margin-bottom: 6px; }
.ip-mono { font-family: var(--font-mono); }
.ip-blocked { color: #d63031; font-size: 0.82rem; }
.ip-add-row { margin-top: 10px; display: flex; gap: 8px; }
.ip-input { flex: 1; padding: 6px 10px; font-size: 0.9rem; }
.ip-empty { color: var(--text-muted); font-size: 0.82rem; margin-top: 8px; }
.ip-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
.ip-table th, .ip-table td { padding: 6px 10px; text-align: left; border-bottom: 1px solid var(--border-subtle); }
.ip-table th { color: var(--text-muted); font-weight: 600; font-size: 0.84rem; }

.loading-state, .empty-state { text-align: center; padding: 40px; color: var(--text-muted); }

/* Split layout */
.review-split {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  align-items: start;
}
@media (max-width: 768px) {
  .review-split { grid-template-columns: 1fr; }
}

/* Left: compact rows */
.review-list { display: flex; flex-direction: column; gap: 4px; }
.review-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px; border-radius: 8px;
  cursor: pointer; transition: all 0.15s ease;
  border: 1px solid transparent;
}
.review-row:hover { background: rgba(167,139,250,0.04); }
.review-row.selected {
  background: rgba(167,139,250,0.06);
  border-color: rgba(167,139,250,0.18);
  border-left: 3px solid var(--accent);
}
.review-row-info { flex: 1; min-width: 0; }
.review-row-name { font-weight: 600; font-size: 0.82rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.review-row-meta { font-size: 0.8rem; color: var(--text-muted); }
.review-row-arrow { color: var(--text-muted); font-size: 1rem; }

/* Right: detail panel */
.review-detail--empty { display: flex; align-items: center; justify-content: center; }
.review-detail { position: sticky; top: 80px; }

.detail-header { display: flex; align-items: center; gap: 10px; }
.detail-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; background: rgba(108,92,231,0.08); flex-shrink: 0; }
.detail-avatar-sm { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; background: rgba(108,92,231,0.08); flex-shrink: 0; }
.detail-name { font-weight: 700; font-size: 0.88rem; }
.detail-meta { font-size: 0.84rem; color: var(--text-muted); }
.detail-row { display: flex; align-items: center; gap: 10px; margin: 8px 0; font-size: 0.8rem; }
.detail-label { font-size: 0.8rem; color: var(--text-muted); }
.detail-label-mono { font-size: 0.84rem; color: var(--text-muted); font-family: var(--font-mono); }
.detail-purpose { font-size: 0.84rem; color: var(--text-secondary); margin: 8px 0; }
.detail-time { font-size: 0.84rem; color: var(--text-muted); }
.detail-verified { color: #00b894; font-size: 0.82rem; margin: 4px 0; }
.detail-verify-fail { color: #d63031; font-size: 0.82rem; margin: 4px 0; }
.detail-verify-warn { color: #ffa940; font-size: 0.82rem; margin: 4px 0; }
.detail-verify-pending { color: #c9a050; font-size: 0.82rem; margin: 4px 0; }
.detail-note { font-size: 0.82rem; color: #d63031; margin: 4px 0; display: flex; align-items: center; gap: 8px; }
.detail-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }

/* Action buttons */
.btn-approve {
  padding: 6px 18px; border: none; border-radius: 8px;
  background: linear-gradient(135deg, #00b894, #00a185); color: #fff;
  font-size: 0.8rem; font-weight: 600; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,184,148,0.25);
  transition: transform 0.15s ease;
}
.btn-approve:active { transform: scale(0.96); }
.btn-reject {
  padding: 6px 18px; border: 1.5px solid rgba(214,48,49,0.25); border-radius: 8px;
  background: var(--bg-glass); color: #d63031; font-size: 0.8rem; font-weight: 600; cursor: pointer;
  transition: transform 0.15s ease, background 0.2s;
}
.btn-reject:hover { background: rgba(214,48,49,0.06); }
.btn-reject:active { transform: scale(0.96); }
.btn-revoke {
  padding: 6px 14px; border: 1px solid var(--border-subtle); border-radius: 8px;
  background: var(--bg-glass); color: var(--text-secondary); cursor: pointer; font-size: 0.9rem;
  transition: transform 0.15s ease, border-color 0.2s;
}
.btn-revoke:hover { border-color: var(--border-hover); }
.btn-revoke:active { transform: scale(0.96); }
.btn-delete {
  padding: 4px 12px; border: 1px solid var(--border-subtle); border-radius: 8px;
  background: var(--bg-glass); color: var(--text-muted); cursor: pointer; font-size: 0.9rem;
  transition: border-color 0.2s, color 0.2s;
}
.btn-delete:hover { border-color: rgba(214,48,49,0.3); color: #d63031; }

.btn-sm {
  padding: 3px 10px; border: 1px solid rgba(214,48,49,0.25); border-radius: 6px;
  background: var(--bg-glass); color: #d63031; cursor: pointer; font-size: 0.84rem;
}
.btn-sm--add { border-color: var(--border-subtle); color: var(--text-secondary); }
.btn-sm--add:hover { border-color: var(--border-hover); }

.btn-edit-note {
  font-size: 0.82rem; padding: 0 6px; border: 1px solid var(--border-subtle); border-radius: 4px;
  background: var(--bg-glass); color: var(--text-muted); cursor: pointer;
}
.btn-edit-note:hover { border-color: var(--border-hover); color: var(--text-primary); }
</style>
