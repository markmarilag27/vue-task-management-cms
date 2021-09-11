<template>
  <div class="flex flex-wrap gap-4 flex-col">
    <TaskItem
      v-for="task in list"
      :key="task.sort_order"
      :task="task"
    />
    <!-- end task item -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',

  components: {
    TaskItem
  },

  computed: {
    ...mapState({
      isLoading: state => state.task.isLoading,
      list: state => state.task.list,
      links: state => state.task.links,
      meta: state => state.task.meta,
      filter: state => state.task.filterj
    })
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions({
      fetchData: 'task/fetchData'
    })
  }
}
</script>
