<template>
  <main
    v-if="!isAuthenticated"
    id="app"
    class="bg-gray-600 min-h-screen h-full flex justify-center items-center"
  >
    <router-view />
  </main>
  <!-- end login page -->
  <main
    v-else
    id="app"
    class="bg-gray-50 mt-14"
  >
    <TopNavigation />
    <!-- end top navigation -->
    <CompletedUserTaskChart class="max-w-screen-sm mx-auto px-4 py-8" />
    <!-- end completed user task chart -->
    <router-view class="max-w-screen-sm mx-auto px-4 py-8" />
    <!-- end router view -->
    <Notifications />
    <!-- end notifications -->
  </main>
  <!-- end authenticated user -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAuthUserData } from './api/auth'
import TopNavigation from '@/components/TopNavigation.vue'
import Notifications from '@/components/Notifications.vue'
import CompletedUserTaskChart from '@/components/CompletedUserTaskChart.vue'

export default {
  name: 'App',

  components: {
    TopNavigation,
    Notifications,
    CompletedUserTaskChart
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapMutations({
      setAuthUser: 'auth/SET_AUTH_USER'
    }),
    fetchData () {
      if (this.isAuthenticated) {
        getAuthUserData().then(({data}) => {
          // clone data
          const payload = { user: data }
          this.setAuthUser(payload)
        })
      }
    }
  }
}
</script>
