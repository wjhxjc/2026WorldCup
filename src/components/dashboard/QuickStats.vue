<script setup lang="ts">
const stats = [
  { label: '参赛球队', value: '48', icon: '⚽', suffix: '支' },
  { label: '小组赛', value: '12', icon: '📋', suffix: '组' },
  { label: '总比赛数', value: '104', icon: '🏟️', suffix: '场' },
  { label: '举办城市', value: '16', icon: '🏙️', suffix: '座' },
]
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div 
      v-for="stat in stats"
      :key="stat.label"
      class="glass rounded-xl p-4 text-center hover:border-pitch-500/40 transition-colors"
    >
      <span class="text-3xl mb-2 block">{{ stat.icon }}</span>
      <div class="flex items-baseline justify-center gap-1">
        <span class="text-3xl font-bold text-gold-400">{{ stat.value }}</span>
        <span class="text-sm text-pitch-400">{{ stat.suffix }}</span>
      </div>
      <p class="text-sm text-pitch-300 mt-1">{{ stat.label }}</p>
    </div>
  </div>
</template>
