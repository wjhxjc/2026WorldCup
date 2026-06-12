<script setup lang="ts">
interface Player {
  name: string
  nameEn: string
  position: string
  age: number
  club: string
  goals: number
  caps: number
  isStar: boolean
}

defineProps<{
  players: Player[]
}>()

const getPositionColor = (position: string) => {
  switch (position) {
    case '前锋': return 'bg-red-500/20 text-red-400'
    case '中场': return 'bg-blue-500/20 text-blue-400'
    case '后卫': return 'bg-green-500/20 text-green-400'
    case '门将': return 'bg-yellow-500/20 text-yellow-400'
    default: return 'bg-pitch-700/20 text-pitch-300'
  }
}
</script>

<template>
  <div class="space-y-3">
    <div 
      v-for="player in players"
      :key="player.nameEn"
      class="flex items-center gap-4 p-3 rounded-lg bg-pitch-900/50 hover:bg-pitch-900/70 transition-colors"
    >
      <!-- 球员信息 -->
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <h4 class="font-semibold text-white">{{ player.name }}</h4>
          <span 
            v-if="player.isStar"
            class="text-gold-400 text-sm"
          >
            ⭐
          </span>
        </div>
        <p class="text-xs text-pitch-400">{{ player.nameEn }} · {{ player.club }}</p>
      </div>

      <!-- 位置标签 -->
      <span 
        class="text-xs font-medium px-2 py-1 rounded"
        :class="getPositionColor(player.position)"
      >
        {{ player.position }}
      </span>

      <!-- 统计数据 -->
      <div class="flex gap-4 text-sm">
        <div class="text-center">
          <p class="text-pitch-400">进球</p>
          <p class="font-bold text-white">{{ player.goals }}</p>
        </div>
        <div class="text-center">
          <p class="text-pitch-400">出场</p>
          <p class="font-bold text-white">{{ player.caps }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
