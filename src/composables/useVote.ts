import { ref, computed } from 'vue'
import type { VoteData } from '@/types'

const STORAGE_KEY = 'worldcup2026_vote'

export function useVote() {
  const userVote = ref<string | null>(null)
  const voteResults = ref<VoteData[]>([])

  // 初始化种子数据（模拟已有投票）
  const seedData: VoteData[] = [
    { teamId: 'brazil', count: 1250 },
    { teamId: 'france', count: 1120 },
    { teamId: 'argentina', count: 1080 },
    { teamId: 'england', count: 850 },
    { teamId: 'germany', count: 780 },
    { teamId: 'spain', count: 720 },
    { teamId: 'portugal', count: 650 },
    { teamId: 'netherlands', count: 420 },
    { teamId: 'belgium', count: 380 },
    { teamId: 'italy', count: 350 },
    { teamId: 'colombia', count: 280 },
    { teamId: 'uruguay', count: 250 },
  ]

  const loadVote = () => {
    // 加载用户投票
    const savedVote = localStorage.getItem(STORAGE_KEY)
    if (savedVote) {
      userVote.value = savedVote
    }

    // 加载投票结果（种子数据 + localStorage 增量）
    const savedResults = localStorage.getItem(`${STORAGE_KEY}_results`)
    if (savedResults) {
      voteResults.value = JSON.parse(savedResults)
    } else {
      voteResults.value = [...seedData]
    }
  }

  const saveVote = (teamId: string) => {
    // 如果已投票，先撤销之前的
    if (userVote.value) {
      const prevTeam = voteResults.value.find(v => v.teamId === userVote.value)
      if (prevTeam) {
        prevTeam.count = Math.max(0, prevTeam.count - 1)
      }
    }

    // 保存新投票
    userVote.value = teamId
    localStorage.setItem(STORAGE_KEY, teamId)

    // 更新结果
    const teamVote = voteResults.value.find(v => v.teamId === teamId)
    if (teamVote) {
      teamVote.count++
    } else {
      voteResults.value.push({ teamId, count: 1 })
    }

    // 保存到 localStorage
    localStorage.setItem(`${STORAGE_KEY}_results`, JSON.stringify(voteResults.value))
  }

  const clearVote = () => {
    if (userVote.value) {
      const prevTeam = voteResults.value.find(v => v.teamId === userVote.value)
      if (prevTeam) {
        prevTeam.count = Math.max(0, prevTeam.count - 1)
      }
    }
    userVote.value = null
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(`${STORAGE_KEY}_results`, JSON.stringify(voteResults.value))
  }

  const totalVotes = computed(() => {
    return voteResults.value.reduce((sum, v) => sum + v.count, 0)
  })

  const sortedResults = computed(() => {
    return [...voteResults.value].sort((a, b) => b.count - a.count)
  })

  const getVotePercentage = (teamId: string) => {
    const teamVote = voteResults.value.find(v => v.teamId === teamId)
    if (!teamVote || totalVotes.value === 0) return 0
    return ((teamVote.count / totalVotes.value) * 100).toFixed(1)
  }

  return {
    userVote,
    voteResults,
    totalVotes,
    sortedResults,
    loadVote,
    saveVote,
    clearVote,
    getVotePercentage,
  }
}
