<script setup lang="ts">
import { useVote } from '@/composables/useVote'

interface TeamData {
  id: string
  name: string
  flag: string
  winProbability: number
}

defineProps<{
  teams: TeamData[]
}>()

const { userVote, saveVote, clearVote } = useVote()

const handleVote = (teamId: string) => {
  if (userVote.value === teamId) {
    clearVote()
  } else {
    saveVote(teamId)
  }
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
    <button
      v-for="team in teams"
      :key="team.id"
      class="p-4 rounded-xl border-2 transition-all duration-200 text-center"
      :class="{
        'border-gold-400 bg-gold-400/10 shadow-gold': userVote === team.id,
        'border-pitch-500/20 bg-pitch-900/50 hover:border-pitch-500/40 hover:bg-pitch-900/70': userVote !== team.id
      }"
      @click="handleVote(team.id)"
    >
      <img 
        :src="team.flag" 
        :alt="team.name"
        class="w-12 h-9 object-cover rounded mx-auto mb-2 shadow-md"
        loading="lazy"
      >
      <p 
        class="font-medium text-sm"
        :class="userVote === team.id ? 'text-gold-400' : 'text-white'"
      >
        {{ team.name }}
      </p>
      <p class="text-xs text-pitch-400 mt-1">{{ team.winProbability }}%</p>
    </button>
  </div>
</template>
