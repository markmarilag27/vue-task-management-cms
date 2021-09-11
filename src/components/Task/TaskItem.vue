<template>
  <div class="flex-grow bg-white shadow rounded p-4">
    <div class="flex flex-wrap justify-between items-center mb-4">
      <h2 v-text="task.title" />
      <!-- end title -->
      <TaskStateModal :task="task" />
      <!-- end task state modal -->
    </div>
    <p
      class="text-sm text-gray-500 mb-2 tracking-wider leading-relaxed truncate max-w-lg"
      v-text="task.body"
    />
    <!-- end description -->
    <div class="flex flex-wrap gap-4 mt-8">
      <BaseButton class="w-auto py-2 text-sm font-normal border-2 border-black bg-transparent text-black hover:bg-black hover:text-white">
        View ({{ task.total_subtask }}) Sub {{ task.total_subtask > 1 ? 'Tasks' : 'Task' }}
      </BaseButton>
      <!-- end button -->
      <TaskDeleteModal :task="task" />
      <!-- end task modal delete -->
    </div>
    <!-- end flex -->
  </div>
</template>

<script>
import TaskStateModal from './TaskStateModal.vue'
import TaskDeleteModal from './TaskDeleteModal.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

export default {
  name: 'TaskItem',

  components: {
    TaskStateModal,
    TaskDeleteModal,
    BaseButton
  },

  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
