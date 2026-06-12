<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'
import TeamCard from '@/components/team/TeamCard.vue'

const { loadTeams, loadRankings, teamsWithRankings, loading } = useTeams()

const searchQuery = ref('')
const selectedGroup = ref('all')

const groups = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

const filteredTeams = computed(() => {
  let result = teamsWithRankings.value
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(team =>
      team.name.includes(searchQuery.value) ||
      team.nameEn.toLowerCase().includes(query) ||
      team.nickname.includes(searchQuery.value)
    )
  }
  
  // 小组过滤
  if (selectedGroup.value !== 'all') {
    result = result.filter(team => team.group === selectedGroup.value)
  }
  
  return result
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
        <span class="text-3xl">⚽</span>
        <h1 class="text-3xl font-bold text-white">球队列表</h1>
      </div>
      <p class="text-pitch-400">共 {{ filteredTeams.length }} 支球队</p>
    </section>

    <!-- 搜索和筛选 -->
    <section class="mb-8 animate-slide-up">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- 搜索框 -->
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索球队名称..."
            class="w-full px-4 py-3 pl-10 rounded-lg bg-pitch-900/50 border border-pitch-500/30 text-white placeholder-pitch-400 focus:outline-none focus:border-pitch-500 transition-colors"
          >
          <svg class="absolute left-3 top-3.5 h-5 w-5 text-pitch-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <!-- 小组筛选 -->
        <div class="flex flex-wrap gap-2">
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
            {{ group === 'all' ? '全部' : `${group}组` }}
          </button>
        </div>
      </div>
    </section>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <!-- 球队网格 -->
    <section v-else class="animate-slide-up" style="animation-delay: 0.1s">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <TeamCard
          v-for="team in filteredTeams"
          :key="team.id"
          :team="team"
        />
      </div>
      
      <!-- 无结果提示 -->
      <div 
        v-if="filteredTeams.length === 0"
        class="text-center py-12"
      >
        <span class="text-4xl mb-4 block">🔍</span>
        <p class="text-pitch-400">没有找到匹配的球队</p>
      </div>
    </section>
  </div>
</template>
