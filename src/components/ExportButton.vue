<template>
  <button
    @click="download"
    type="button"
    class="text-white"
  >
    <span class="flex justify-center items-center">
      <SVGAnimateSpin v-if="isLoading" />
      <span
        :class="{ 'ml-3': isLoading }"
        v-text="exportable.text"
      />
    </span>
  </button>
</template>

<script>
import { exportTasks } from '@/api/export'
import SVGAnimateSpin from './SVG/SVGAnimateSpin.vue'

export default {
  name: 'ExportButton',

  components: {
    SVGAnimateSpin
  },

  props: {
    exportable: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    isLoading: false,
    listExtension: [
      {
        text: 'excel',
        ext: '.xlsx'
      },
      {
        text: 'csv',
        ext: '.csv'
      },
      {
        text: 'json',
        ext: '.json'
      }
    ]
  }),

  computed: {
    querySearchParams () {
      return new URLSearchParams({ type: this.exportable.query })
    }
  },

  methods: {
    download () {
      this.isLoading = true

      exportTasks(this.querySearchParams)
        .then(({ data }) => {
          const ext = this.listExtension.find(ext => this.exportable.query === ext.text).ext
          const blob = new Blob([data], { type: data.type })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `task-${Date.now()}-${ext}`
          link.click()
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
