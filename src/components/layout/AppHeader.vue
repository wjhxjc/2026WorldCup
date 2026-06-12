<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { path: '/', name: '首页', icon: '🏠' },
  { path: '/teams', name: '球队', icon: '⚽' },
  { path: '/compare', name: '对比', icon: '📊' },
  { path: '/bracket', name: '赛程', icon: '🏆' },
  { path: '/vote', name: '投票', icon: '🗳️' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 glass border-b border-pitch-500/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div 
          class="flex items-center gap-3 cursor-pointer"
          @click="navigateTo('/')"
        >
          <span class="text-3xl">⚽</span>
          <div>
            <h1 class="text-xl font-bold text-gradient">世界杯预测</h1>
            <p class="text-xs text-pitch-300">2026 美加墨</p>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-pitch-500/20"
            :class="{
              'bg-pitch-500/30 text-white': route.path === item.path,
              'text-pitch-200 hover:text-white': route.path !== item.path
            }"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 rounded-lg hover:bg-pitch-500/20 transition-colors"
          @click="toggleMenu"
        >
          <svg 
            class="w-6 h-6 text-pitch-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav 
          v-if="isMenuOpen"
          class="md:hidden pb-4 space-y-1"
        >
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-pitch-500/20"
            :class="{
              'bg-pitch-500/30 text-white': route.path === item.path,
              'text-pitch-200 hover:text-white': route.path !== item.path
            }"
            @click="isMenuOpen = false"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>
