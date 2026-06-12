<script setup lang="ts">
import { computed } from 'vue'

interface TeamData {
  id: string
  name: string
  flag: string
  fifaRank: number
}

const props = defineProps<{
  modelValue: string
  teams: TeamData[]
  label: string
  placeholder: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-pitch-300 mb-2">{{ label }}</label>
    <select
      v-model="selectedValue"
      class="w-full px-4 py-3 rounded-lg bg-pitch-900/50 border border-pitch-500/30 text-white focus:outline-none focus:border-pitch-500 transition-colors appearance-none cursor-pointer"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option 
        v-for="team in teams"
        :key="team.id"
        :value="team.id"
        class="bg-pitch-900 text-white"
      >
        {{ team.name }} (FIFA #{{ team.fifaRank }})
      </option>
    </select>
  </div>
</template>
