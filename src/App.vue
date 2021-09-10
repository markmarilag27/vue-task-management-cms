<template>
  <main
    id="app"
    :class="{ 'bg-gray-600 min-h-screen h-full flex justify-center items-center': isAuthPage }"
  >
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',

  computed: {
    isAuthPage () {
      return this.$route.name === 'login'
    }
  }
}
</script>
