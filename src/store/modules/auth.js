import { setAuthUserToken, removeAuthUserToken } from '@/services/auth'

export default {
  namespaced: true,

  // initial state
  state: {
    access_token: null,
    user: null
  },

  // getters
  getters: {
    isAuthenticated: state => !!state.access_token
  },

  // mutations
  mutations: {
    SET_AUTH_USER: (state, payload) => {
      if (payload?.access_token && state.access_token === null) {
        state.access_token = payload.access_token
        setAuthUserToken(JSON.stringify(payload))
      }
      state.user = payload?.user
    },
    RESET_AUTH_USER: state => {
      removeAuthUserToken()
      state.access_token = null
      state.user = null
    }
  },

  // actions
  actions: {
    setUser: ({ commit }, payload) => {
      const data = typeof payload === 'string' ? JSON.parse(payload) : payload
      return commit('SET_AUTH_USER', data)
    },
    resetAuthUser: ({ commit }, payload) => (commit('RESET_AUTH_USER', payload))
  }
}
