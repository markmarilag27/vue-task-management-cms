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
import { mapState } from 'vuex'
import { getCompletedTask } from '@/api/auth'

export default {
  name: 'CompletedUserTaskChart',

  data () {
    return {
      list: null,
      isLoading: false,
      chartData: {
        type: "line",
        height: "360px",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          legend: {
            position: false
          }
        }
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
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
    createChart (chartData) {
      const ctx = this.$refs.chart
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      })
    },
    fetchData () {
      this.isLoading = true

      getCompletedTask()
        .then(({ data }) => {
          const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          const values = Object.values(data).map(result => result.length)
          const mergeKeyValues = Object.keys(data).map((label, key) => {
            return {
              label: label,
              value: values[key]
            }
          })
          const newValues = labels.map(label => {
            if (mergeKeyValues.some(originData => label === originData.label)) {
              return mergeKeyValues.find(origin => origin.label === label).value
            }
            return 0
          })
          this.chartData.data.labels = labels
          this.chartData.data.datasets = [
            {
              label: 'Completed Task',
              borderColor: "#4A5568",
              data: newValues,
              fill: false,
              pointBackgroundColor: "#4A5568",
              borderWidth: "3",
              pointBorderWidth: "4",
              pointHoverRadius: "6",
              pointHoverBorderWidth: "8",
              pointHoverBorderColor: "rgb(74,85,104,0.2)"
            }
          ]
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
