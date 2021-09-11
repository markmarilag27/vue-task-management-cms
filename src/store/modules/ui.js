let notificationNextId = 1

export default {
  namespaced: true,

  // initial state
  state: {
    notifications: [
      {
        id: 1,
        type: 'error',
        message: 'Something went wrong!'
      },
      {
        id: 2,
        type: 'success',
        message: 'Successfully created!'
      }
    ]
  },

  // getters
  getters: {},

  // mutations
  mutations: {
    PUSH_NOTIFICATIONS: (state, notification) => {
      const cloneNotifications = [...state.notifications]
      const notifications = [
        {
          ...notification,
          id: notificationNextId++
        },
        ...cloneNotifications
      ]

      state.notifications = notifications
    },
    REMOVE_NOTIFICATION: (state, notificationToRemove) => {
      const cloneNotifications = [...state.notifications]
      const notifications = cloneNotifications.filter(
        notification => notification.id !== notificationToRemove.id
      )

      state.notifications = notifications
    }
  },

  // actions
  actions: {
    pushNotification: ({ commit }, notification) => (commit('PUSH_NOTIFICATIONS', notification)),
    removeNotification: ({ commit }, notificationToRemove) => (commit('REMOVE_NOTIFICATION', notificationToRemove))
  }
}
