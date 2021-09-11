<template>
  <div
    id="index-page"
    class="min-h-screen h-full"
  >
    <div class="flex flex-wrap justify-between py-8">
      <TaskCreateModal />
    </div>
    <!-- end flex -->
    <TaskList />
    <!-- end task list -->
  </div>
</template>

<script>
import TaskList from '@/components/Task/TaskList.vue'
import TaskCreateModal from '@/components/Task/TaskCreateModal.vue'

export default {
  name: 'IndexPage',

  components: {
    TaskList,
    TaskCreateModal,
  }
}
</script>
