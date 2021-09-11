<template>
  <div class="task-state-modal">
    <BaseButton
      @click="isActive = !isActive"
      class="bg-black text-xs text-white font-normal uppercase hover:bg-gray-500 px-2 py-1"
    >
      {{ task.state.name }}
    </BaseButton>
    <!-- end base button -->
    <BaseModal
      v-model="isActive"
      title="Task State"
      :on-submit="onSubmit"
    >
      <template #modal-body>
        <StateAutocomplete
          type="text"
          v-model="searchState"
          :selected="selectedState"
          @change="onSelected"
          placeholder="Type in to search state"
          :error="errors.state_id"
          @clear="errors.state_id = undefined"
        />
        <!-- end autocomplete -->
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
            <span :class="{ 'ml-3': isLoading }">Change State</span>
          </span>
        </BaseButton>
        <!-- end submit button -->
      </template>
      <!-- end modal footer -->
    </BaseModal>
    <!-- end base modal -->
  </div>
  <!-- end task state modal -->
</template>

<script>
import { updateTaskState } from '@/api/task'
import { mapActions } from 'vuex'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import StateAutocomplete from '@/components/StateAutocomplete.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'TaskStateModal',

  components: {
    BaseButton,
    BaseModal,
    StateAutocomplete,
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
    isLoading: false,
    searchState: '',
    selectedState: {},
    form: {
      state_id: null
    },
    errors: {}
  }),

  created () {
    this.onSelected(this.task.state)
    this.searchState = this.task.state.name
  },

  methods: {
    ...mapActions({
      updateTaskItem: 'task/updateTaskItem',
      pushNotification: 'ui/pushNotification'
    }),
    onSubmit () {
      this.errors = {}
      this.isLoading = true

      const data = {
        uuid: this.task.uuid,
        state_id: this.form.state_id
      }

      updateTaskState(data)
        .then(({data}) => {
          this.isActive = false
          this.$nextTick(() => {
            this.updateTaskItem(data)
            const notification = {
              type: 'success',
              message: `${this.task.title} task status has been updated!`
            }
            this.pushNotification(notification)
          })
        })
        .catch((error) => (this.errors = error?.response?.data?.errors))
        .finally(() => (this.isLoading = false))
    },
    onSelected (event) {
      if (event.id) {
        this.form.state_id = event.id
      } else {
        this.form.state_id = null
      }
      this.selectedState = event
    },
  },
}
</script>
