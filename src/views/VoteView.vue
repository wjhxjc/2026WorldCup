<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTeams } from '@/composables/useTeams'
import { useVote } from '@/composables/useVote'
import VotePanel from '@/components/vote/VotePanel.vue'
import VoteResult from '@/components/vote/VoteResult.vue'

const { loadTeams, loadRankings, teamsWithRankings, loading } = useTeams()
const { loadVote, userVote } = useVote()

onMounted(async () => {
  await Promise.all([loadTeams(), loadRankings()])
  loadVote()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- 页面标题 -->
    <section class="mb-8 animate-fade-in">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🗳️</span>
        <h1 class="text-3xl font-bold text-white">投票预测</h1>
      </div>
      <p class="text-pitch-400">选出你心中的2026世界杯冠军</p>
    </section>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pitch-500"></div>
    </div>

    <template v-else>
      <!-- 已投票提示 -->
      <section v-if="userVote" class="mb-8 animate-slide-up">
        <div class="glass rounded-xl p-6 border-gold-400/30">
          <div class="flex items-center gap-3">
            <span class="text-3xl">✅</span>
            <div>
              <p class="text-lg font-bold text-white">你已投票</p>
              <p class="text-pitch-400">
                你选择的冠军是：
                <span class="text-gold-400 font-bold">
                  {{ teamsWithRankings.find(t => t.id === userVote)?.name }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 投票面板 -->
      <section class="mb-12 animate-slide-up" style="animation-delay: 0.1s">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🏆</span>
          {{ userVote ? '更改投票' : '选择冠军球队' }}
        </h2>
        <VotePanel :teams="teamsWithRankings" />
      </section>

      <!-- 投票结果 -->
      <section class="animate-slide-up" style="animation-delay: 0.2s">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📊</span>
          投票结果
        </h2>
        <VoteResult :teams="teamsWithRankings" />
      </section>
    </template>
  </div>
</template>
