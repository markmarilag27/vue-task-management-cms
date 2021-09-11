<template>
  <main
    id="app"
    :class="{ 'bg-gray-600 min-h-screen h-full flex justify-center items-center': isAuthPage }"
  >
    <router-view />
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAuthUserData } from './api/auth'

export default {
  name: 'App',

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    isAuthPage () {
      return this.$route.name === 'login'
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapMutations({
      SET_AUTH_USER: 'auth/SET_AUTH_USER'
    }),
    fetchData () {
      if (this.isAuthenticated) {
        getAuthUserData().then(({data}) => {
          // clone data
          const payload = { user: data }
          this.SET_AUTH_USER(payload)
        })
      }
    }
  }
}
</script>
