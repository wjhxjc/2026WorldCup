<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeams } from '@/composables/useTeams'
import TeamRadar from '@/components/team/TeamRadar.vue'
import PlayerList from '@/components/team/PlayerList.vue'

const route = useRoute()
const router = useRouter()
const { loadTeams, loadRankings, teams, rankings, loading } = useTeams()

const teamId = computed(() => route.params.id as string)

const team = computed(() => {
  return teams.value.find(t => t.id === teamId.value)
})

const ranking = computed(() => {
  return rankings.value.find(r => r.teamId === teamId.value)
})

const goBack = () => {
  router.push('/teams')
}

onMounted(async () => {
  await Promise.all([loadTeams(), loadRankings()])
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 返回按钮 -->
    <button 
      class="flex items-center gap-2 text-pitch-300 hover:text-white transition-colors mb-6"
      @click="goBack"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回球队列表
    </button>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <!-- 球队未找到 -->
    <div v-else-if="!team" class="text-center py-20">
      <span class="text-5xl mb-4 block">😢</span>
      <h2 class="text-2xl font-bold text-white mb-2">球队未找到</h2>
      <p class="text-pitch-400 mb-6">请检查URL或返回球队列表</p>
      <button 
        class="btn-primary"
        @click="goBack"
      >
        返回球队列表
      </button>
    </div>

    <!-- 球队详情 -->
    <template v-else>
      <!-- 球队头部信息 -->
      <section class="glass rounded-xl p-6 mb-8 animate-fade-in">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img 
            :src="team.flag" 
            :alt="team.name"
            class="w-24 h-18 object-cover rounded-lg shadow-lg"
          >
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-white">{{ team.name }}</h1>
              <span class="text-sm font-medium px-3 py-1 rounded-full bg-pitch-500/20 text-pitch-300">
                {{ team.group }}组
              </span>
            </div>
            <p class="text-pitch-400 mb-3">{{ team.nickname }} · {{ team.nameEn }}</p>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <span class="text-pitch-400">FIFA排名:</span>
                <span class="font-bold text-gold-400">#{{ team.fifaRank }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-pitch-400">ELO评分:</span>
                <span class="font-bold text-white">{{ team.eloScore }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-pitch-400">夺冠概率:</span>
                <span class="font-bold text-gold-400">{{ ranking?.winProbability }}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 详细信息网格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 左侧：基本信息和雷达图 -->
        <div class="space-y-6 animate-slide-up">
          <!-- 基本信息卡片 -->
          <div class="glass rounded-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📋</span>
              基本信息
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">世界杯冠军</p>
                <p class="text-2xl font-bold text-gold-400">{{ team.worldCupTitles }}次</p>
              </div>
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">参赛次数</p>
                <p class="text-2xl font-bold text-white">{{ team.worldCupAppearances }}次</p>
              </div>
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">最佳成绩</p>
                <p class="text-2xl font-bold text-white">{{ team.bestResult }}</p>
              </div>
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">阵容身价</p>
                <p class="text-2xl font-bold text-white">{{ team.squadValue }}</p>
              </div>
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">近期状态</p>
                <p class="text-2xl font-bold text-white">{{ team.recentForm }}</p>
              </div>
              <div class="p-3 rounded-lg bg-pitch-900/50">
                <p class="text-sm text-pitch-400 mb-1">主教练</p>
                <p class="text-2xl font-bold text-white">{{ team.coach }}</p>
              </div>
            </div>
          </div>

          <!-- 历史战绩 -->
          <div class="glass rounded-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📜</span>
              历届世界杯
            </h2>
            <div class="space-y-3">
              <div 
                v-for="history in team.history"
                :key="history.year"
                class="flex items-center justify-between p-3 rounded-lg bg-pitch-900/50"
              >
                <div>
                  <span class="font-bold text-white">{{ history.year }}</span>
                  <span class="text-pitch-400 ml-2">{{ history.host }}</span>
                </div>
                <span 
                  class="font-medium px-3 py-1 rounded-full text-sm"
                  :class="{
                    'bg-gold-400/20 text-gold-400': history.result === '冠军',
                    'bg-pitch-500/20 text-pitch-300': history.result === '亚军',
                    'bg-orange-500/20 text-orange-400': history.result === '第三名' || history.result === '第四名',
                    'bg-pitch-700/20 text-pitch-300': history.result === '八强',
                    'bg-pitch-800/20 text-pitch-400': history.result === '十六强' || history.result === '小组赛'
                  }"
                >
                  {{ history.result }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：雷达图和球员 -->
        <div class="space-y-6 animate-slide-up" style="animation-delay: 0.1s">
          <!-- 雷达图 -->
          <div class="glass rounded-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span>
              实力分析
            </h2>
            <TeamRadar :stats="team.stats" :team-name="team.name" />
          </div>

          <!-- 核心球员 -->
          <div class="glass rounded-xl p-6">
            <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>⭐</span>
              核心球员
            </h2>
            <PlayerList :players="team.players" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
