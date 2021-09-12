import { getCompletedTask } from '@/api/auth'

export default {
  namespaced: true,

  // initial state
  state: {
    isLoading: false,
    originData: {},
    chartData: {
      type: 'line',
      height: '360px',
      data: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: []
      },
      options: {
        legend: {
          position: false
        }
      }
    }
  },

  // getters
  getters: {
    datasetValues: state => {
      const labels = [...state.chartData.data.labels]
      const originDataValues = Object.keys(state.originData).map(result => result.length)
      const mergeKeyValues = Object.keys(state.originData).map((label, key) => {
        return {
          label,
          value: originDataValues[key]
        }
      })
      return labels.map(label => {
        if (mergeKeyValues.some(originalData => label === originalData.label)) {
          const newLabel = mergeKeyValues.find(origin => label === origin.label)
          return newLabel.value
        }
        return 0
      })
    }
  },

  // mutations
  mutations: {
    SET_LOADING_STATE: (state, payload) => (state.isLoading = payload),
    SET_ORIGIN_DATA: (state, payload) => (state.originData = payload),
    SET_DATASET: (state, payload) => {
      state.chartData.data.datasets = [
        {
          label: 'Completed Task',
          borderColor: "#4A5568",
          data: payload,
          fill: false,
          pointBackgroundColor: "#4A5568",
          borderWidth: "3",
          pointBorderWidth: "4",
          pointHoverRadius: "6",
          pointHoverBorderWidth: "8",
          pointHoverBorderColor: "rgb(74,85,104,0.2)"
        }
      ]
    }
  },

  // actions
  actions: {
    fetchData: async ({ commit, getters }) => {
      commit('SET_LOADING_STATE', true)

      const response = await getCompletedTask()
      const responseData = await response.data

      commit('SET_ORIGIN_DATA', responseData)
      commit('SET_DATASET', getters.datasetValues)
      commit('SET_LOADING_STATE', false)
    }
  }
}
