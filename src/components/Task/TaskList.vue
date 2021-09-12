<template>
  <TaskListLoading v-if="isLoading" />
  <!-- end task list loading -->
  <NoData v-else-if="clonedList.length === 0" />
  <!-- end no data -->
  <draggable
    v-else
    v-model="clonedList"
    group="task"
    @start="drag=true"
    @end="drag=false"
    class="flex flex-wrap gap-4 flex-col"
    :animation="200"
    ghost-class="ghost"
  >
    <TaskItem
      v-for="task in clonedList"
      :key="task.sort_order"
      :task="task"
      :trashed="onlyTrashed"
    />
    <!-- end task item -->
  </draggable>
</template>

<script>
import { reOrderTasks } from '@/api/task'
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'
import draggable from 'vuedraggable'
import TaskItem from './TaskItem.vue'
import NoData from '@/components/NoData.vue'
import TaskListLoading from './TaskListLoading.vue'

export default {
  name: 'TaskList',

  components: {
    TaskItem,
    draggable,
    NoData,
    TaskListLoading
  },

  props: {
    onlyTrashed: {
      type: Boolean,
      default: false
    },
    currentTab: {
      type: Number,
      default: 0
    },
    uuid: {
      type: [String, undefined],
      default: undefined
    }
  },

  data () {
    return {
      clonedList: []
    }
  },

  computed: {
    ...mapState({
      isLoading: state => state.task.isLoading,
      list: state => state.task.list,
      links: state => state.task.links,
      meta: state => state.task.meta,
      filter: state => state.task.filter
    })
  },

  created () {
    this.requestData()
  },

  watch: {
    '$route': 'requestData',
    list (value) {
      this.clonedList = value
    },
    clonedList (value) {
      if (!isEqual(this.list, value)) {
        const cloneValue = [...value]
        const newCloneValue = cloneValue.map(item => ({ sort_order: item.sort_order }))
        const cloneList = [...this.list]
        const newCloneList = cloneList.map((item, index) => {
          return {
            uuid: item.uuid,
            ...newCloneValue[index]
          }
        })

        this.setTaskLoadingState(true)

        reOrderTasks({ tasks: newCloneList })
          .then(() => {
            const notification = {
              type: 'success',
              message: `Tasks has been re-ordered!`
            }
            this.pushNotification(notification)
            this.setTaskList(value)
          })
          .finally(() => (this.setTaskLoadingState(false)))
      }
    },
    currentTab () {
      this.requestData()
    }
  },

  methods: {
    ...mapActions({
      fetchData: 'task/fetchData',
      setTaskList: 'task/setTaskList',
      setTaskLoadingState: 'task/setTaskLoadingState',
      setFilter: 'task/setFilter',
      pushNotification: 'ui/pushNotification'
    }),
    requestData () {
      this.setFilter({ only_trashed: this.onlyTrashed })
      this.fetchData(this.uuid).then(() => (this.clonedList = cloneDeep(this.list)))
    }
  }
}
</script>

<style scoped>
.ghost {
  opacity: 0.45;
  background-color: rgb(107, 114, 128);
}
</style>
