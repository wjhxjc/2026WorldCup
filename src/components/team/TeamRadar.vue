<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface TeamStats {
  attack: number
  defense: number
  midfield: number
  speed: number
  experience: number
  stamina: number
}

const props = defineProps<{
  stats: TeamStats
  teamName: string
}>()

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(13, 40, 24, 0.9)',
    borderColor: 'rgba(29, 185, 84, 0.3)',
    textStyle: {
      color: '#e5e5e5'
    }
  },
  radar: {
    indicator: [
      { name: '攻击', max: 100 },
      { name: '防守', max: 100 },
      { name: '中场', max: 100 },
      { name: '速度', max: 100 },
      { name: '经验', max: 100 },
      { name: '体能', max: 100 }
    ],
    shape: 'circle',
    splitNumber: 5,
    axisName: {
      color: '#9ca3af',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.15)'
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(29, 185, 84, 0.05)', 'rgba(29, 185, 84, 0.1)']
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.2)'
      }
    }
  },
  series: [
    {
      name: props.teamName,
      type: 'radar',
      data: [
        {
          value: [
            props.stats.attack,
            props.stats.defense,
            props.stats.midfield,
            props.stats.speed,
            props.stats.experience,
            props.stats.stamina
          ],
          name: props.teamName,
          areaStyle: {
            color: 'rgba(29, 185, 84, 0.3)'
          },
          lineStyle: {
            color: '#1db954',
            width: 2
          },
          itemStyle: {
            color: '#1db954'
          }
        }
      ]
    }
  ]
}))
</script>

<template>
  <VChart 
    :option="option" 
    :style="{ height: '300px' }"
    autoresize
  />
</template>
