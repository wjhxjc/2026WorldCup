<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([RadarChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface TeamData {
  name: string
  stats: {
    attack: number
    defense: number
    midfield: number
    speed: number
    experience: number
    stamina: number
  }
}

const props = defineProps<{
  teamA: TeamData
  teamB: TeamData
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
  legend: {
    data: [props.teamA.name, props.teamB.name],
    bottom: 0,
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
      name: '实力对比',
      type: 'radar',
      data: [
        {
          value: [
            props.teamA.stats.attack,
            props.teamA.stats.defense,
            props.teamA.stats.midfield,
            props.teamA.stats.speed,
            props.teamA.stats.experience,
            props.teamA.stats.stamina
          ],
          name: props.teamA.name,
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
        },
        {
          value: [
            props.teamB.stats.attack,
            props.teamB.stats.defense,
            props.teamB.stats.midfield,
            props.teamB.stats.speed,
            props.teamB.stats.experience,
            props.teamB.stats.stamina
          ],
          name: props.teamB.name,
          areaStyle: {
            color: 'rgba(245, 197, 66, 0.3)'
          },
          lineStyle: {
            color: '#f5c542',
            width: 2
          },
          itemStyle: {
            color: '#f5c542'
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
    :style="{ height: '400px' }"
    autoresize
  />
</template>
