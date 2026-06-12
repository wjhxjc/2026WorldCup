<script setup lang="ts">
interface TeamData {
  name: string
  flag: string
  fifaRank: number
  eloScore: number
  worldCupTitles: number
  worldCupAppearances: number
  bestResult: string
  squadValue: string
  winProbability: number
}

const props = defineProps<{
  teamA: TeamData
  teamB: TeamData
}>()

const stats = [
  { label: 'FIFA排名', key: 'fifaRank', format: (v: number) => `#${v}`, lowerBetter: true },
  { label: 'ELO评分', key: 'eloScore', format: (v: number) => v.toString(), lowerBetter: false },
  { label: '世界杯冠军', key: 'worldCupTitles', format: (v: number) => `${v}次`, lowerBetter: false },
  { label: '参赛次数', key: 'worldCupAppearances', format: (v: number) => `${v}次`, lowerBetter: false },
  { label: '最佳成绩', key: 'bestResult', format: (v: string) => v, lowerBetter: false },
  { label: '阵容身价', key: 'squadValue', format: (v: string) => v, lowerBetter: false },
  { label: '夺冠概率', key: 'winProbability', format: (v: number) => `${v}%`, lowerBetter: false },
]

const getWinner = (stat: typeof stats[0], valueA: any, valueB: any) => {
  if (typeof valueA === 'string' || typeof valueB === 'string') return null
  if (stat.lowerBetter) {
    return valueA < valueB ? 'A' : valueA > valueB ? 'B' : null
  }
  return valueA > valueB ? 'A' : valueA < valueB ? 'B' : null
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-pitch-500/20">
          <th class="text-left py-3 px-4 text-pitch-400 font-medium w-1/4">指标</th>
          <th class="text-center py-3 px-4 w-1/3">
            <div class="flex items-center justify-center gap-2">
              <img :src="teamA.flag" :alt="teamA.name" class="flag-img">
              <span class="font-bold text-white">{{ teamA.name }}</span>
            </div>
          </th>
          <th class="text-center py-3 px-4 w-1/3">
            <div class="flex items-center justify-center gap-2">
              <img :src="teamB.flag" :alt="teamB.name" class="flag-img">
              <span class="font-bold text-white">{{ teamB.name }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="stat in stats"
          :key="stat.label"
          class="border-b border-pitch-500/10 hover:bg-pitch-900/30 transition-colors"
        >
          <td class="py-4 px-4 text-pitch-300">{{ stat.label }}</td>
          <td 
            class="py-4 px-4 text-center font-bold"
            :class="{
              'text-gold-400': getWinner(stat, teamA[stat.key as keyof TeamData], teamB[stat.key as keyof TeamData]) === 'A',
              'text-white': getWinner(stat, teamA[stat.key as keyof TeamData], teamB[stat.key as keyof TeamData]) !== 'A'
            }"
          >
            {{ stat.format(teamA[stat.key as keyof TeamData] as any) }}
          </td>
          <td 
            class="py-4 px-4 text-center font-bold"
            :class="{
              'text-gold-400': getWinner(stat, teamA[stat.key as keyof TeamData], teamB[stat.key as keyof TeamData]) === 'B',
              'text-white': getWinner(stat, teamA[stat.key as keyof TeamData], teamB[stat.key as keyof TeamData]) !== 'B'
            }"
          >
            {{ stat.format(teamB[stat.key as keyof TeamData] as any) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
