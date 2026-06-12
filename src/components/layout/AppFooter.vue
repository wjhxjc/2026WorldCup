<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="glass border-t border-pitch-500/20 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⚽</span>
          <div>
            <p class="text-sm font-medium text-pitch-200">2026 FIFA 世界杯预测</p>
            <p class="text-xs text-pitch-400">纯前端展示项目</p>
          </div>
        </div>
        
        <div class="flex items-center gap-6 text-xs text-pitch-400">
          <span>数据来源：公开数据</span>
          <span>|</span>
          <span>仅供娱乐参考</span>
          <span>|</span>
          <span>© {{ currentYear }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>
