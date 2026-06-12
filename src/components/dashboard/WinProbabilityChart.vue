<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

interface TeamData {
  id: string
  name: string
  flag: string
  winProbability: number
}

const props = defineProps<{
  teams: TeamData[]
}>()

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(13, 40, 24, 0.9)',
    borderColor: 'rgba(29, 185, 84, 0.3)',
    textStyle: {
      color: '#e5e5e5'
    },
    formatter: (params: any) => {
      const data = params[0]
      return `${data.name}<br/>夺冠概率: <strong>${data.value}%</strong>`
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%',
      color: '#9ca3af'
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.2)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.1)'
      }
    },
    max: 25
  },
  yAxis: {
    type: 'category',
    data: props.teams.map(t => t.name).reverse(),
    axisLabel: {
      color: '#e5e5e5',
      fontSize: 14
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.2)'
      }
    }
  },
  series: [
    {
      name: '夺冠概率',
      type: 'bar',
      data: props.teams.map(t => t.winProbability).reverse(),
      itemStyle: {
        borderRadius: [0, 4, 4, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#1db954' },
            { offset: 1, color: '#f5c542' }
          ]
        }
      },
      emphasis: {
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#2dd464' },
              { offset: 1, color: '#ffd666' }
            ]
          }
        }
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}%',
        color: '#f5c542',
        fontWeight: 'bold'
      }
    }
  ]
}))
</script>

<template>
  <div class="glass rounded-xl p-6">
    <VChart 
      :option="option" 
      :style="{ height: '400px' }"
      autoresize
    />
  </div>
</template>
