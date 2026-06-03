<template>
  <ClientOnly>
    <!-- Access Gate -->
    <div v-if="!verified" class="nene-page-container nene-page-enter">
      <div class="nene-card-header">
        <h1>MySekai MSR 查询</h1>
        <p class="subtitle">请先验证 access_key，验证通过后才会显示查询页面。</p>
      </div>
      <div class="msr-gate">
        <div class="nene-glass-section gate-card">
          <div class="gate-icon-wrap">
            <span class="gate-icon">&#x1F511;</span>
          </div>
          <h2 class="gate-title">验证 access_key</h2>
          <input id="accessKey" v-model="accessKey" type="password" class="nene-input gate-input" placeholder="请输入 access_key" @keypress.enter="validateAccessKey">
          <button class="nene-btn nene-btn-primary" :disabled="validating" @click="validateAccessKey">
            <span v-if="validating">验证中...</span>
            <span v-else>验证并进入</span>
          </button>
        </div>
      </div>
      <div v-if="message.text" :class="['nene-message', message.type]">{{ message.text }}</div>
      <div class="nene-footer">Nene-LunaBot MySekai MSR Service</div>
    </div>

    <!-- Main App -->
    <div v-else class="nene-page-container nene-page-enter">
      <div class="nene-card-header">
        <h1>MySekai MSR 查询</h1>
        <p class="subtitle">输入 QQ 号，选择已绑定账号，返回当前 MSR 地图。</p>
      </div>

      <div class="msr-content">
        <!-- Query -->
        <section class="nene-section-reveal">
          <div class="nene-section-label">查询绑定账号</div>
          <div class="msr-query-row">
            <div class="nene-form-group" style="flex:1;min-width:120px;">
              <label for="region">游戏区服</label>
              <select id="region" v-model="region" class="nene-select">
                <option value="jp">JP</option>
                <option value="cn">CN</option>
                <option value="tw">TW</option>
                <option value="kr">KR</option>
                <option value="en">EN</option>
              </select>
            </div>
            <div class="nene-form-group" style="flex:2;min-width:160px;">
              <label for="qqId">QQ 号</label>
              <input id="qqId" v-model="qqId" type="text" class="nene-input" placeholder="在 Nene-LunaBot 中绑定账号时使用的 QQ 号" @keypress.enter="queryBinding">
            </div>
            <div class="nene-form-group" style="flex:0;min-width:fit-content;align-self:flex-end;">
              <button class="nene-btn nene-btn-primary" :disabled="!canQuery || querying" @click="queryBinding" style="margin-top:0;">
                <span v-if="querying">查询中...</span>
                <span v-else>查询</span>
              </button>
            </div>
          </div>
          <div v-if="queryResultMessage" :class="['query-result', queryResultType === 'success' ? 'query-success' : 'query-error']">
            {{ queryResultMessage }}
          </div>
        </section>

        <!-- Select Account -->
        <section v-if="boundAccounts.length > 0" class="nene-section-reveal">
          <div class="nene-section-label">选择要查询的账号</div>
          <div class="nene-accounts-list">
            <div v-for="account in boundAccounts" :key="account.game_id"
              class="nene-account-item msr-acct"
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
          <div v-if="selectedAccount" class="selected-bar">
            <span>当前选择账号 <strong>{{ selectedAccount.display_id }}</strong></span>
            <span v-if="selectedAccount.is_main" class="badge">主账号</span>
          </div>
          <button class="nene-btn nene-btn-success" :disabled="!canRender || rendering" @click="renderMsr">
            <span v-if="rendering">查询中...</span>
            <span v-else>查询 MSR 地图</span>
          </button>
        </section>

        <!-- Result -->
        <section v-if="resultUrl" class="nene-section-reveal">
          <div class="nene-section-label">MSR 地图结果</div>
          <div class="result-header">
            <span class="result-meta">{{ resultMetaText }}</span>
            <a :href="resultUrl" class="nene-btn-secondary" download="msr-map.png" style="width:auto;">下载图片</a>
          </div>
          <div class="result-image-wrap">
            <img :src="resultUrl" class="result-image" alt="MSR map result">
          </div>
        </section>
      </div>

      <!-- Guide -->
      <section class="nene-section-reveal" style="margin-top:var(--section-gap);">
        <div class="nene-section-label">使用说明</div>
        <p class="guide-text">1. 先验证 access_key。2. 输入 QQ 号并查询当前 QQ 在对应区服绑定的账号。3. 选择账号后直接返回 MSR 地图。</p>
      </section>

      <div class="nene-footer">Nene-LunaBot MySekai MSR Service</div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ClientOnly from '../ClientOnly.vue'
import { useMsr } from '../../composables/useMsr'

const {
  verified, accessKey, validating,
  region, qqId, querying,
  boundAccounts, selectedAccount,
  rendering, resultUrl, resultMetaText,
  message, queryResultMessage, queryResultType,
  canQuery, canRender,
  validateAccessKey, queryBinding, selectAccount, renderMsr,
} = useMsr()

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nene-section-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-revealed'), i * 100 + 50)
    })
  })
})
</script>

<style scoped>
/* Gate */
.msr-gate { max-width: 400px; margin: 40px auto 0; }
.gate-card { text-align: center; padding: 40px 28px; border-color: rgba(167,139,250,0.15); }
.gate-icon-wrap {
  width: 56px; height: 56px; margin: 0 auto 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(167,139,250,0.1);
  box-shadow: 0 0 24px rgba(167,139,250,0.12);
}
.gate-icon { font-size: 1.3rem; }
.gate-title { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
.gate-input { text-align: center; letter-spacing: 1px; margin-bottom: 14px; }

/* Main content */
.msr-content { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--subsection-gap); }

.msr-query-row { display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap; }
@media (max-width: 560px) { .msr-query-row { flex-direction: column; } }

.query-result { margin-top: 12px; padding: 10px; border-radius: 8px; font-size: 0.85rem; }
.query-success { color: #00b894; background: rgba(0,184,148,0.08); }
.query-error { color: #d63031; background: rgba(214,48,49,0.06); }

.msr-acct {
  position: relative; overflow: hidden;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
}
.msr-acct::before {
  content: ''; position: absolute; left: 0; top: 8px; bottom: 8px;
  width: 3px; border-radius: 0 4px 4px 0;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2));
  opacity: 0; transform: scaleY(0.6);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.msr-acct.selected::before { opacity: 1; transform: scaleY(1); }
.msr-acct:hover { transform: translateY(-1px); }

.selected-bar {
  display: flex; align-items: center; gap: 10px; margin: 14px 0;
  padding: 12px 16px; border-radius: 10px;
  background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.15);
  font-size: 0.88rem;
}
.selected-bar .badge { background: var(--accent); color: #fff; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; }

/* Result */
.result-header {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  margin-bottom: 14px; flex-wrap: wrap;
}
.result-meta { color: var(--text-muted); font-size: 0.85rem; }
.result-image-wrap {
  border-radius: 18px; overflow: hidden;
  border: 1px solid var(--border-subtle);
  transition: box-shadow 0.3s ease;
}
.result-image-wrap:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.25); }
.result-image {
  width: 100%; display: block; border-radius: 18px;
  background: rgba(255,255,255,0.04);
  transition: transform 0.4s ease;
}
.result-image-wrap:hover .result-image { transform: scale(1.01); }

.guide-text { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7; }
</style>
