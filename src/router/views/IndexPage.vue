<template>
  <div
    id="index-page"
    class="min-h-screen h-full"
  >
    <div class="flex flex-wrap justify-between items-center py-8">
      <TaskCreateModal
        :uuid="uuid"
        :disabled="trashed"
      />
      <!-- end task create modal -->
      <BaseButton
        v-if="uuid"
        @click="backRoute"
        class="w-auto flex items-center gap-2 hover:bg-black hover:text-white"
      >
        <SVGArrowLeft />
        <span>Back</span>
      </BaseButton>
      <!-- end back btn -->
    </div>
    <!-- end flex -->
    <BaseTabs>
      <template v-slot="{ props }">
        <TaskList
          v-if="props === 0"
          :current-tab="determineIndex(props)"
          :uuid="uuid"
        />
        <!-- end task list -->
        <TaskList
          v-else
          :only-trashed="props === 1"
          :current-tab="determineIndex(props)"
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
import BaseButton from '@/components/Base/BaseButton.vue'
import SVGArrowLeft from '@/components/SVG/SVGArrowLeft.vue'

export default {
  name: 'IndexPage',

  components: {
    TaskList,
    TaskCreateModal,
    BaseTabs,
    BaseButton,
    SVGArrowLeft
  },

  data: () => ({
    trashed: false
  }),

  computed: {
    uuid () {
      return this.$route.params?.uuid
    }
  },

  methods: {
    backRoute () {
      if (this.uuid) {
        this.$router.go(-1)
      }
      return
    },
    determineIndex (index) {
      this.trashed = !!index
      return index
    }
  }
}
</script>
