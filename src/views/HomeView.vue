<script setup lang="ts">
import { onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'
import WinProbabilityChart from '@/components/dashboard/WinProbabilityChart.vue'
import TopTeamsBar from '@/components/dashboard/TopTeamsBar.vue'
import QuickStats from '@/components/dashboard/QuickStats.vue'

const { loadTeams, loadRankings, topTeams, loading } = useTeams()

onMounted(async () => {
  await Promise.all([loadTeams(), loadRankings()])
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <section class="text-center mb-12 animate-fade-in">
      <div class="inline-flex items-center gap-3 mb-4">
        <span class="text-5xl">🏆</span>
        <div class="text-left">
          <h1 class="text-4xl md:text-5xl font-bold text-gradient">2026 世界杯预测</h1>
          <p class="text-pitch-300 text-lg">美加墨 · 夺冠概率分析</p>
        </div>
      </div>
      <p class="text-pitch-400 max-w-2xl mx-auto mt-4">
        基于 FIFA 排名、ELO 评分和历史数据的综合预测模型，分析各队夺冠概率
      </p>
    </section>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <template v-else>
      <!-- 快速统计 -->
      <QuickStats class="mb-8 animate-slide-up" />

      <!-- 夺冠概率 Top 10 -->
      <section class="mb-12 animate-slide-up" style="animation-delay: 0.1s">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">📊</span>
          <h2 class="text-2xl font-bold text-white">夺冠概率 Top 10</h2>
        </div>
        <WinProbabilityChart :teams="topTeams" />
      </section>

      <!-- 热门球队 -->
      <section class="animate-slide-up" style="animation-delay: 0.2s">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">⭐</span>
          <h2 class="text-2xl font-bold text-white">热门球队</h2>
        </div>
        <TopTeamsBar :teams="topTeams" />
      </section>

      <!-- 数据来源说明 -->
      <section class="mt-12 text-center animate-slide-up" style="animation-delay: 0.3s">
        <div class="glass rounded-xl p-6 max-w-2xl mx-auto">
          <p class="text-pitch-400 text-sm">
            📌 数据基于 FIFA 排名、ELO 评分、历史战绩和公开赔率综合计算，仅供娱乐参考
          </p>
        </div>
      </section>
    </template>
  </div>
</template>
