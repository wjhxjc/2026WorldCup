import { ref, computed } from 'vue'
import type { Team, TeamDetail, Ranking } from '@/types'

const teams = ref<Team[]>([])
const rankings = ref<Ranking[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function useTeams() {
  const loadTeams = async () => {
    if (teams.value.length > 0) return
    loading.value = true
    error.value = null
    try {
      const response = await fetch('./data/teams.json')
      teams.value = await response.json()
    } catch (e) {
      error.value = '加载球队数据失败'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const loadRankings = async () => {
    if (rankings.value.length > 0) return
    try {
      const response = await fetch('./data/rankings.json')
      rankings.value = await response.json()
    } catch (e) {
      console.error('加载排名数据失败', e)
    }
  }

  const getTeamById = (id: string): Team | undefined => {
    return teams.value.find(t => t.id === id)
  }

  const getRankingByTeamId = (teamId: string): Ranking | undefined => {
    return rankings.value.find(r => r.teamId === teamId)
  }

  const teamsWithRankings = computed(() => {
    return teams.value.map(team => {
      const ranking = rankings.value.find(r => r.teamId === team.id)
      return {
        ...team,
        winProbability: ranking?.winProbability || 0,
        groupAdvanceProb: ranking?.groupAdvanceProb || 0,
        semiFinalProb: ranking?.semiFinalProb || 0,
        finalProb: ranking?.finalProb || 0,
      }
    }).sort((a, b) => b.winProbability - a.winProbability)
  })

  const topTeams = computed(() => {
    return teamsWithRankings.value.slice(0, 10)
  })

  const searchTeams = (query: string) => {
    if (!query) return teamsWithRankings.value
    const lowerQuery = query.toLowerCase()
    return teamsWithRankings.value.filter(team =>
      team.name.includes(query) ||
      team.nameEn.toLowerCase().includes(lowerQuery) ||
      team.nickname.includes(query)
    )
  }

  const filterByGroup = (group: string) => {
    if (!group || group === 'all') return teamsWithRankings.value
    return teamsWithRankings.value.filter(team => team.group === group)
  }

  return {
    teams,
    rankings,
    loading,
    error,
    loadTeams,
    loadRankings,
    getTeamById,
    getRankingByTeamId,
    teamsWithRankings,
    topTeams,
    searchTeams,
    filterByGroup,
  }
}
