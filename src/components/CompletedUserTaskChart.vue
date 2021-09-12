<template>
  <div class="relative block">
    <div class="text-5xl text-gray-600 font-bold">
      Welcome, {{ user.name }}
    </div>
    <!-- end user name -->
    <div class="my-8">
      <canvas
        ref="chart"
        width="640"
        height="360"
      />
      <!-- end canvas -->
    </div>
    <!-- end wrapper -->
  </div>
  <!-- end chart user -->
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CompletedUserTaskChart',

  computed: {
    ...mapState({
      user: state => state.auth.user,
      isLoading: state => state.chart.isLoading,
      chartData: state => state.chart.chartData
    })
  },

  created () {
    this.fetchData()
    Chart.register(...registerables)
  },

  watch: {
    isLoading (value) {
      if (!value) {
        this.$nextTick(() => {
          this.createChart(this.chartData)
        })
      }
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'chart/fetchData'
    }),
    createChart (chartData) {
      const ctx = this.$refs.chart
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    }
  }
}
</script>
