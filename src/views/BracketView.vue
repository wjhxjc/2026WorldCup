<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'
import GroupStage from '@/components/bracket/GroupStage.vue'
import BracketTree from '@/components/bracket/BracketTree.vue'

const { loadTeams, loadRankings, loading } = useTeams()

const activeTab = ref<'groups' | 'knockout'>('groups')

onMounted(async () => {
  await Promise.all([loadTeams(), loadRankings()])
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 页面标题 -->
    <section class="mb-8 animate-fade-in">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🏆</span>
        <h1 class="text-3xl font-bold text-white">赛程对阵</h1>
      </div>
      <p class="text-pitch-400">2026 美加墨世界杯完整赛程</p>
    </section>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <template v-else>
      <!-- Tab 切换 -->
      <section class="mb-8 animate-slide-up">
        <div class="flex gap-2 p-1 rounded-lg bg-pitch-900/50 w-fit">
          <button
            class="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
            :class="{
              'bg-pitch-500 text-white': activeTab === 'groups',
              'text-pitch-300 hover:text-white hover:bg-pitch-500/20': activeTab !== 'groups'
            }"
            @click="activeTab = 'groups'"
          >
            <span class="mr-2">📋</span>
            小组赛
          </button>
          <button
            class="px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
            :class="{
              'bg-pitch-500 text-white': activeTab === 'knockout',
              'text-pitch-300 hover:text-white hover:bg-pitch-500/20': activeTab !== 'knockout'
            }"
            @click="activeTab = 'knockout'"
          >
            <span class="mr-2">🏆</span>
            淘汰赛
          </button>
        </div>
      </section>

      <!-- 内容区域 -->
      <section class="animate-slide-up" style="animation-delay: 0.1s">
        <GroupStage v-if="activeTab === 'groups'" />
        <BracketTree v-else />
      </section>
    </template>
  </div>
</template>
