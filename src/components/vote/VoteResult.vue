<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useVote } from '@/composables/useVote'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

interface TeamData {
  id: string
  name: string
  flag: string
}

const props = defineProps<{
  teams: TeamData[]
}>()

const { sortedResults, totalVotes, getVotePercentage } = useVote()

const top10Results = computed(() => {
  return sortedResults.value.slice(0, 10).map(result => {
    const team = props.teams.find(t => t.id === result.teamId)
    return {
      name: team?.name || result.teamId,
      count: result.count,
      percentage: getVotePercentage(result.teamId)
    }
  }).reverse()
})

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
      return `${data.name}<br/>票数: <strong>${data.value}</strong>`
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
    }
  },
  yAxis: {
    type: 'category',
    data: top10Results.value.map(r => r.name),
    axisLabel: {
      color: '#e5e5e5',
      fontSize: 12
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(29, 185, 84, 0.2)'
      }
    }
  },
  series: [
    {
      name: '投票',
      type: 'bar',
      data: top10Results.value.map(r => r.count),
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
        color: '#f5c542',
        fontWeight: 'bold'
      }
    }
  ]
}))
</script>

<template>
  <div class="glass rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <p class="text-pitch-400">
        共 <span class="text-gold-400 font-bold">{{ totalVotes }}</span> 人参与投票
      </p>
    </div>
    
    <VChart 
      :option="option" 
      :style="{ height: '400px' }"
      autoresize
    />
  </div>
</template>
