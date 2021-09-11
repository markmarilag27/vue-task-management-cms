<template>
  <div class="fixed bottom-8 right-8">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
    <!-- end notification -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationItem from './NotificationItem.vue'

export default {
  name: 'Notifications',

  components: {
    NotificationItem
  },

  computed: {
    ...mapState({
      notifications: state => state.ui.notifications
    })
  }
}
</script>

<style scoped>
.fixed {
  z-index: 99999;
}
</style>
