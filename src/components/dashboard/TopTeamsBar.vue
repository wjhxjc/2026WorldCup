<script setup lang="ts">
import { useRouter } from 'vue-router'

interface TeamData {
  id: string
  name: string
  nameEn: string
  flag: string
  winProbability: number
  fifaRank: number
  nickname: string
}

const props = defineProps<{
  teams: TeamData[]
}>()

const router = useRouter()

const navigateToTeam = (teamId: string) => {
  router.push(`/teams/${teamId}`)
}

const getProbabilityColor = (prob: number) => {
  if (prob >= 15) return 'text-gold-400'
  if (prob >= 10) return 'text-pitch-300'
  return 'text-pitch-400'
}

const getProbabilityBg = (prob: number) => {
  if (prob >= 15) return 'bg-gold-400/20'
  if (prob >= 10) return 'bg-pitch-500/20'
  return 'bg-pitch-700/20'
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
    <div
      v-for="(team, index) in teams"
      :key="team.id"
      class="card cursor-pointer p-4"
      @click="navigateToTeam(team.id)"
    >
      <!-- 排名 -->
      <div class="flex items-center justify-between mb-3">
        <span 
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          :class="{
            'bg-gold-400 text-pitch-950': index === 0,
            'bg-stadium-300 text-pitch-950': index === 1,
            'bg-orange-600 text-white': index === 2,
            'bg-pitch-700 text-pitch-200': index > 2
          }"
        >
          {{ index + 1 }}
        </span>
        <span class="text-xs text-pitch-400">FIFA #{{ team.fifaRank }}</span>
      </div>

      <!-- 球队信息 -->
      <div class="flex items-center gap-3 mb-3">
        <img 
          :src="team.flag" 
          :alt="team.name"
          class="flag-img"
          loading="lazy"
        >
        <div>
          <h3 class="font-semibold text-white">{{ team.name }}</h3>
          <p class="text-xs text-pitch-400">{{ team.nickname }}</p>
        </div>
      </div>

      <!-- 夺冠概率 -->
      <div 
        class="rounded-lg px-3 py-2 text-center"
        :class="getProbabilityBg(team.winProbability)"
      >
        <p class="text-xs text-pitch-400 mb-1">夺冠概率</p>
        <p 
          class="text-2xl font-bold"
          :class="getProbabilityColor(team.winProbability)"
        >
          {{ team.winProbability }}%
        </p>
      </div>
    </div>
  </div>
</template>
