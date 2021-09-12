<template>
  <div class="task-restore-modal">
    <BaseButton
      @click="isActive = !isActive"
      class="w-auto py-2 text-sm font-normal border-2 border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white"
    >
      Restore Task
    </BaseButton>
    <!-- end base button -->

    <BaseModal
      v-model="isActive"
      title="Restore Task"
      :on-submit="onSubmit"
    >
      <template #modal-body>
        <p class="mb-4">
          This <span class="font-bold">{{ task.is_subtask ? 'sub task' : 'task' }}</span> will moved out to trashed section.
        </p>
      </template>
      <!-- end modal body -->
      <template #modal-footer>
        <BaseButton
          type="submit"
          class="w-auto bg-green-500 text-white"
          :disabled="isLoading"
        >
          <span class="flex justify-center items-center">
            <SVGAnimateSpin v-if="isLoading" />
            <span :class="{ 'ml-3': isLoading }">Restore Task</span>
          </span>
        </BaseButton>
        <!-- end submit button -->
      </template>
      <!-- end modal-footer -->
    </BaseModal>
    <!-- end base modal -->
  </div>
  <!-- end task restore modal -->
</template>

<script>
import { restoreTask } from '@/api/task'
import { mapActions } from 'vuex'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'TaskRestoreModal',

  components: {
    BaseButton,
    BaseModal,
    SVGAnimateSpin
  },

  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    isActive: false,
    isLoading: false
  }),

  methods: {
    ...mapActions({
      removeTaskItem: 'task/removeTaskItem',
      pushNotification: 'ui/pushNotification'
    }),
    onSubmit () {
      this.isLoading = true

      restoreTask(this.task)
        .then(() => {
          this.isActive = false
          this.$nextTick(() => {
            this.removeTaskItem(this.task)
            const notification = {
              type: 'success',
              message: `${this.task.title} task has been restored!`
            }
            this.pushNotification(notification)
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
