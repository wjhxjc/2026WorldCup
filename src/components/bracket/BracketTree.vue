<script setup lang="ts">
import { ref } from 'vue'

// 模拟淘汰赛数据
const knockoutRounds = ref([
  {
    name: '16强',
    matches: [
      { id: 'r16_1', home: '巴西', away: '日本', homeFlag: 'https://flagcdn.com/w80/br.png', awayFlag: 'https://flagcdn.com/w80/jp.png', homeScore: null, awayScore: null },
      { id: 'r16_2', home: '德国', away: '摩洛哥', homeFlag: 'https://flagcdn.com/w80/de.png', awayFlag: 'https://flagcdn.com/w80/ma.png', homeScore: null, awayScore: null },
      { id: 'r16_3', home: '比利时', away: '加纳', homeFlag: 'https://flagcdn.com/w80/be.png', awayFlag: 'https://flagcdn.com/w80/gh.png', homeScore: null, awayScore: null },
      { id: 'r16_4', home: '葡萄牙', away: '厄瓜多尔', homeFlag: 'https://flagcdn.com/w80/pt.png', awayFlag: 'https://flagcdn.com/w80/ec.png', homeScore: null, awayScore: null },
      { id: 'r16_5', home: '阿根廷', away: '塞内加尔', homeFlag: 'https://flagcdn.com/w80/ar.png', awayFlag: 'https://flagcdn.com/w80/sn.png', homeScore: null, awayScore: null },
      { id: 'r16_6', home: '西班牙', away: '澳大利亚', homeFlag: 'https://flagcdn.com/w80/es.png', awayFlag: 'https://flagcdn.com/w80/au.png', homeScore: null, awayScore: null },
      { id: 'r16_7', home: '法国', away: '英格兰', homeFlag: 'https://flagcdn.com/w80/fr.png', awayFlag: 'https://flagcdn.com/w80/gb-eng.png', homeScore: null, awayScore: null },
      { id: 'r16_8', home: '荷兰', away: '美国', homeFlag: 'https://flagcdn.com/w80/nl.png', awayFlag: 'https://flagcdn.com/w80/us.png', homeScore: null, awayScore: null },
    ]
  },
  {
    name: '8强',
    matches: [
      { id: 'qf_1', home: '巴西', away: '德国', homeFlag: 'https://flagcdn.com/w80/br.png', awayFlag: 'https://flagcdn.com/w80/de.png', homeScore: null, awayScore: null },
      { id: 'qf_2', home: '比利时', away: '葡萄牙', homeFlag: 'https://flagcdn.com/w80/be.png', awayFlag: 'https://flagcdn.com/w80/pt.png', homeScore: null, awayScore: null },
      { id: 'qf_3', home: '阿根廷', away: '西班牙', homeFlag: 'https://flagcdn.com/w80/ar.png', awayFlag: 'https://flagcdn.com/w80/es.png', homeScore: null, awayScore: null },
      { id: 'qf_4', home: '法国', away: '荷兰', homeFlag: 'https://flagcdn.com/w80/fr.png', awayFlag: 'https://flagcdn.com/w80/nl.png', homeScore: null, awayScore: null },
    ]
  },
  {
    name: '半决赛',
    matches: [
      { id: 'sf_1', home: '巴西', away: '比利时', homeFlag: 'https://flagcdn.com/w80/br.png', awayFlag: 'https://flagcdn.com/w80/be.png', homeScore: null, awayScore: null },
      { id: 'sf_2', home: '阿根廷', away: '法国', homeFlag: 'https://flagcdn.com/w80/ar.png', awayFlag: 'https://flagcdn.com/w80/fr.png', homeScore: null, awayScore: null },
    ]
  },
  {
    name: '决赛',
    matches: [
      { id: 'final', home: '巴西', away: '法国', homeFlag: 'https://flagcdn.com/w80/br.png', awayFlag: 'https://flagcdn.com/w80/fr.png', homeScore: null, awayScore: null },
    ]
  }
])
</script>

<template>
  <div class="overflow-x-auto pb-4">
    <div class="flex gap-8 min-w-max">
      <!-- 第三名决赛 -->
      <div class="flex flex-col gap-4">
        <h3 class="text-lg font-bold text-pitch-300 text-center mb-2">三四名决赛</h3>
        <div class="glass rounded-lg p-4 w-64">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <img src="https://flagcdn.com/w80/be.png" alt="比利时" class="flag-img">
              <span class="text-white font-medium">比利时</span>
            </div>
            <span class="text-pitch-400">-</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="https://flagcdn.com/w80/ar.png" alt="阿根廷" class="flag-img">
              <span class="text-white font-medium">阿根廷</span>
            </div>
            <span class="text-pitch-400">-</span>
          </div>
        </div>
      </div>

      <!-- 各轮次 -->
      <div 
        v-for="round in knockoutRounds"
        :key="round.name"
        class="flex flex-col gap-4"
      >
        <h3 class="text-lg font-bold text-pitch-300 text-center mb-2">{{ round.name }}</h3>
        <div 
          v-for="match in round.matches"
          :key="match.id"
          class="glass rounded-lg p-4 w-64 hover:border-pitch-500/40 transition-colors"
        >
          <!-- 主队 -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <img :src="match.homeFlag" :alt="match.home" class="flag-img">
              <span class="text-white font-medium">{{ match.home }}</span>
            </div>
            <span 
              class="font-bold"
              :class="match.homeScore !== null ? 'text-gold-400' : 'text-pitch-400'"
            >
              {{ match.homeScore ?? '-' }}
            </span>
          </div>
          
          <!-- 分隔线 -->
          <div class="border-t border-pitch-500/20 my-2"></div>
          
          <!-- 客队 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="match.awayFlag" :alt="match.away" class="flag-img">
              <span class="text-white font-medium">{{ match.away }}</span>
            </div>
            <span 
              class="font-bold"
              :class="match.awayScore !== null ? 'text-gold-400' : 'text-pitch-400'"
            >
              {{ match.awayScore ?? '-' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 冠军展示 -->
      <div class="flex flex-col items-center justify-center">
        <span class="text-6xl mb-4">🏆</span>
        <p class="text-xl font-bold text-gold-400">冠军</p>
        <p class="text-pitch-400 mt-2">待定</p>
      </div>
    </div>
  </div>
</template>
