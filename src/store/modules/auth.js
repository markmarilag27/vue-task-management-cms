import { SET_AUTH_USER, RESET_AUTH_USER } from '../mutation-types'

export default {
  namespaced: true,

  // initial state
  state: {
    access_token: null,
    user: null
  },

  // getters
  getters: {
    isAuthenticated: state => !!state.user
  },

  // mutations
  mutations: {
    [SET_AUTH_USER]: (state, payload) => {
      state.access_token = payload.access_token
      state.user = payload.user
    },
    [RESET_AUTH_USER]: state => {
      state.access_token = null
      state.user = null
    }
  },

  // actions
  actions: {
    setUser: ({ commit }, payload) => (commit('SET_AUTH_USER', payload))
  }
}
