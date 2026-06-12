<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTeams } from '@/composables/useTeams'
import TeamSelector from '@/components/compare/TeamSelector.vue'
import RadarCompare from '@/components/compare/RadarCompare.vue'
import StatsCompare from '@/components/compare/StatsCompare.vue'

const { loadTeams, loadRankings, teamsWithRankings, loading } = useTeams()

const selectedTeamA = ref<string>('')
const selectedTeamB = ref<string>('')

const teamA = computed(() => {
  return teamsWithRankings.value.find(t => t.id === selectedTeamA.value)
})

const teamB = computed(() => {
  return teamsWithRankings.value.find(t => t.id === selectedTeamB.value)
})

const canCompare = computed(() => {
  return selectedTeamA.value && selectedTeamB.value && selectedTeamA.value !== selectedTeamB.value
})

onMounted(async () => {
  await Promise.all([loadTeams(), loadRankings()])
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 页面标题 -->
    <section class="mb-8 animate-fade-in">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📊</span>
        <h1 class="text-3xl font-bold text-white">数据对比</h1>
      </div>
      <p class="text-pitch-400">选择两支球队进行多维数据对比分析</p>
    </section>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <template v-else>
      <!-- 球队选择器 -->
      <section class="mb-8 animate-slide-up">
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div class="flex-1 w-full">
            <TeamSelector
              v-model="selectedTeamA"
              :teams="teamsWithRankings"
              label="球队 A"
              placeholder="选择第一支球队"
            />
          </div>
          
          <div class="flex items-center justify-center">
            <span class="text-4xl font-bold text-gold-400">VS</span>
          </div>
          
          <div class="flex-1 w-full">
            <TeamSelector
              v-model="selectedTeamB"
              :teams="teamsWithRankings"
              label="球队 B"
              placeholder="选择第二支球队"
            />
          </div>
        </div>
      </section>

      <!-- 对比结果 -->
      <section v-if="canCompare" class="animate-slide-up" style="animation-delay: 0.1s">
        <!-- 雷达图对比 -->
        <div class="glass rounded-xl p-6 mb-8">
          <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📈</span>
            实力雷达图对比
          </h2>
          <RadarCompare 
            :team-a="teamA!" 
            :team-b="teamB!"
          />
        </div>

        <!-- 数据对比表 -->
        <div class="glass rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            关键数据对比
          </h2>
          <StatsCompare 
            :team-a="teamA!" 
            :team-b="teamB!"
          />
        </div>
      </section>

      <!-- 未选择提示 -->
      <section v-else class="text-center py-16 animate-slide-up">
        <span class="text-6xl mb-4 block">⚡</span>
        <h2 class="text-2xl font-bold text-white mb-2">选择两支球队开始对比</h2>
        <p class="text-pitch-400">从上方下拉菜单中选择两支不同的球队</p>
      </section>
    </template>
  </div>
</template>
