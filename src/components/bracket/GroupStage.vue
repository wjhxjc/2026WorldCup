<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'

const { teams, loadTeams } = useTeams()

const selectedGroup = ref('A')
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

// 模拟小组赛数据
const generateGroupData = (groupId: string) => {
  const groupTeams = teams.value.filter(t => t.group === groupId)
  return groupTeams.map((team, index) => ({
    ...team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0
  }))
}

const groupData = computed(() => {
  return generateGroupData(selectedGroup.value)
})

onMounted(async () => {
  await loadTeams()
})
</script>

<template>
  <div>
    <!-- 小组选择 -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="group in groups"
        :key="group"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="{
          'bg-pitch-500 text-white': selectedGroup === group,
          'bg-pitch-900/50 text-pitch-300 hover:bg-pitch-500/20 hover:text-white': selectedGroup !== group
        }"
        @click="selectedGroup = group"
      >
        {{ group }}组
      </button>
    </div>

    <!-- 积分表 -->
    <div class="glass rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-pitch-900/50">
              <th class="text-left py-3 px-4 text-pitch-400 font-medium">排名</th>
              <th class="text-left py-3 px-4 text-pitch-400 font-medium">球队</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">场</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">胜</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">平</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">负</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">进</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">失</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">净</th>
              <th class="text-center py-3 px-4 text-pitch-400 font-medium">积分</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(team, index) in groupData"
              :key="team.id"
              class="border-t border-pitch-500/10 hover:bg-pitch-900/30 transition-colors"
            >
              <td class="py-4 px-4">
                <span 
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  :class="{
                    'bg-pitch-500 text-white': index < 2,
                    'bg-pitch-700 text-pitch-300': index >= 2
                  }"
                >
                  {{ index + 1 }}
                </span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <img 
                    :src="team.flag" 
                    :alt="team.name"
                    class="flag-img"
                    loading="lazy"
                  >
                  <div>
                    <p class="font-semibold text-white">{{ team.name }}</p>
                    <p class="text-xs text-pitch-400">FIFA #{{ team.fifaRank }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.played }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.won }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.drawn }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.lost }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.goalsFor }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.goalsAgainst }}</td>
              <td class="py-4 px-4 text-center text-pitch-300">{{ team.goalsFor - team.goalsAgainst }}</td>
              <td class="py-4 px-4 text-center font-bold text-gold-400">{{ team.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 晋级说明 -->
      <div class="p-4 bg-pitch-900/30 border-t border-pitch-500/10">
        <p class="text-sm text-pitch-400">
          <span class="inline-block w-3 h-3 rounded-full bg-pitch-500 mr-2"></span>
          小组前两名直接晋级淘汰赛
        </p>
      </div>
    </div>
  </div>
</template>
