<template>
  <div
    class="rounded shadow mt-4 px-6 py-4"
    :class="[ notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white' ]"
  >
    <div class="flex items-center gap-4">
      <SVGCheck v-if="notification.type === 'success'" />
      <SVGInfo v-if="notification.type === 'error'" />
      {{ notification.message }}
    </div>
    <!-- end flex -->
  </div>
  <!-- end notification item -->
</template>

<script>
import { mapActions } from 'vuex'
import SVGCheck from '@/components/SVG/SVGCheck'
import SVGInfo from '@/components/SVG/SVGInfo'

export default {
  name: 'NotificationItem',

  components: {
    SVGCheck,
    SVGInfo
  },

  props: {
    notification: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    timeout: null
  }),

  mounted () {
    this.timeout = setTimeout(() => (this.removeNotification(this.notification)), 5000)
  },

  beforeDestroy () {
    clearTimeout(this.timeout)
  },

  methods: mapActions('ui', ['removeNotification'])
}
</script>
