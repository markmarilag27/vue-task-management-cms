import { getAllTask } from '@/api/task'
import { SET_TASK_LOADING_STATE, SET_TASK_DATA } from '@/store/mutation-types'

export default {
  namespaced: true,

  // initial state
  state: {
    isLoading: false,
    list: [],
    links: {},
    meta: {},
    filter: {
      page: 1,
      per_page: 10
    },
  },

  // getters
  getters: {
    querySearchParams: state => (new URLSearchParams(state.filter)),
  },

  // mutations
  mutations: {
    [SET_TASK_LOADING_STATE]: (state, payload) => (state.isLoading = payload),
    [SET_TASK_DATA]: (state, payload) => {
      const cloneList = [...state.list]
      const list = [...payload.data, ...cloneList]

      state.list = list
      state.links = payload.links
      state.meta = payload.meta
    }
  },

  // actions
  actions: {
    fetchData: async ({ commit, getters }) => {
      commit('SET_TASK_LOADING_STATE', true)

      const data = await getAllTask(getters.querySearchParams)

      commit('SET_TASK_DATA', data)
      commit('SET_TASK_LOADING_STATE', false)
    }
  }
}
