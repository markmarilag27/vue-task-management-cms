import { getAllTask, getTask } from '@/api/task'

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
    querySearchParams: state => (new URLSearchParams(state.filter))
  },

  // mutations
  mutations: {
    SET_TASK_LOADING_STATE: (state, payload) => (state.isLoading = payload),
    SET_TASK_LIST: (state, payload) => (state.list = payload),
    SET_TASK_DATA: (state, payload) => {
      state.list = payload.data.sort((a, b) => b.sort_order - a.sort_order)
      state.links = payload.links
      state.meta = payload.meta
    },
    SET_TASK_ITEM: (state, payload) => {
      const cloneList = [...state.list]
      const list = [payload, ...cloneList]

      state.list = list.sort((a, b) => b.sort_order - a.sort_order)
    },
    REMOVE_TASK_ITEM: (state, payload) => {
      const cloneList = [...state.list]
      const list = cloneList.filter(item => payload.uuid !== item.uuid)

      state.list = list
    },
    UPDATE_TASK_ITEM: (state, payload) => {
      const cloneList = [...state.list]
      const list = cloneList.map(item => {
        if (payload.uuid === item.uuid) {
          return {
            ...item,
            state: payload.state
          }
        }
        return item
      })

      state.list = list
    },
    SET_FILTER: (state, payload) => {
      const clonedFilter = {...state.filter}
      let newFilter = {...clonedFilter}
      if (payload.only_trashed) {
        newFilter = {...payload, ...clonedFilter}
      } else {
        delete newFilter.only_trashed
      }
      state.filter = newFilter
    }
  },

  // actions
  actions: {
    fetchData: async ({ commit, getters }, payload) => {
      commit('SET_TASK_LOADING_STATE', true)

      let data = {}

      if (typeof payload === 'undefined') {
        data = await getAllTask(getters.querySearchParams)
      } else {
        data = await getTask(payload, getters.querySearchParams)
      }

      commit('SET_TASK_DATA', data)
      commit('SET_TASK_LOADING_STATE', false)
    },
    setTaskLoadingState: ({ commit }, payload) => (commit('SET_TASK_LOADING_STATE', payload)),
    setTaskList: ({ commit }, payload) => (commit('SET_TASK_LIST', payload)),
    setTaskItem: ({ commit }, payload) => (commit('SET_TASK_ITEM', payload)),
    removeTaskItem: ({ commit }, payload) => (commit('REMOVE_TASK_ITEM', payload)),
    updateTaskItem: ({ commit }, payload) => (commit('UPDATE_TASK_ITEM', payload)),
    setFilter: ({ commit }, payload) => (commit('SET_FILTER', payload))
  }
}
