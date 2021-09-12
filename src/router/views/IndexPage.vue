<template>
  <div
    id="index-page"
    class="min-h-screen h-full"
  >
    <div class="flex flex-wrap justify-between py-8">
      <TaskCreateModal :uuid="uuid" />
    </div>
    <!-- end flex -->
    <BaseTabs>
      <template v-slot="{ props }">
        <TaskList
          v-if="props === 0"
          :current-tab="props"
          :uuid="uuid"
        />
        <!-- end task list -->
        <TaskList
          v-else
          :only-trashed="props === 1"
          :current-tab="props"
          :uuid="uuid"
        />
        <!-- end task list -->
      </template>
      <!-- end template -->
    </BaseTabs>
    <!-- end base tabs -->
  </div>
</template>

<script>
import TaskList from '@/components/Task/TaskList.vue'
import TaskCreateModal from '@/components/Task/TaskCreateModal.vue'
import BaseTabs from '@/components/Base/BaseTabs.vue'

export default {
  name: 'IndexPage',

  components: {
    TaskList,
    TaskCreateModal,
    BaseTabs
  },

  computed: {
    uuid () {
      return this.$route.params?.uuid
    }
  }
}
</script>
