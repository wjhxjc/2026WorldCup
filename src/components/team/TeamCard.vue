<script setup lang="ts">
import { useRouter } from 'vue-router'

interface TeamData {
  id: string
  name: string
  nameEn: string
  flag: string
  group: string
  fifaRank: number
  winProbability: number
  nickname: string
  worldCupTitles: number
}

const props = defineProps<{
  team: TeamData
}>()

const router = useRouter()

const navigateToTeam = () => {
  router.push(`/teams/${props.team.id}`)
}

const getProbabilityColor = (prob: number) => {
  if (prob >= 15) return 'text-gold-400'
  if (prob >= 10) return 'text-pitch-300'
  return 'text-pitch-400'
}

const getRankBadgeColor = (rank: number) => {
  if (rank <= 3) return 'bg-gold-400 text-pitch-950'
  if (rank <= 10) return 'bg-pitch-500 text-white'
  return 'bg-pitch-700 text-pitch-200'
}
</script>

<template>
  <div 
    class="card cursor-pointer p-4"
    @click="navigateToTeam"
  >
    <!-- 头部：小组和排名 -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-medium px-2 py-1 rounded bg-pitch-500/20 text-pitch-300">
        {{ team.group }}组
      </span>
      <span 
        class="text-xs font-bold px-2 py-1 rounded"
        :class="getRankBadgeColor(team.fifaRank)"
      >
        FIFA #{{ team.fifaRank }}
      </span>
    </div>

    <!-- 球队信息 -->
    <div class="flex items-center gap-4 mb-4">
      <img 
        :src="team.flag" 
        :alt="team.name"
        class="w-12 h-9 object-cover rounded shadow-md"
        loading="lazy"
      >
      <div>
        <h3 class="font-bold text-lg text-white">{{ team.name }}</h3>
        <p class="text-sm text-pitch-400">{{ team.nickname }}</p>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 gap-3">
      <div class="text-center p-2 rounded-lg bg-pitch-900/50">
        <p class="text-xs text-pitch-400 mb-1">夺冠概率</p>
        <p 
          class="text-xl font-bold"
          :class="getProbabilityColor(team.winProbability)"
        >
          {{ team.winProbability }}%
        </p>
      </div>
      <div class="text-center p-2 rounded-lg bg-pitch-900/50">
        <p class="text-xs text-pitch-400 mb-1">世界杯冠军</p>
        <p class="text-xl font-bold text-white">
          {{ team.worldCupTitles }}次
        </p>
      </div>
    </div>
  </div>
</template>
