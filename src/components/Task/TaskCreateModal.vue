<template>
  <div class="create-modal">
    <BaseButton
      class="bg-black text-white"
      @click="isActive = !isActive"
    >
      Create New Task
    </BaseButton>
    <!-- end base button -->
    <BaseModal
      v-model="isActive"
      title="Create New Task"
      class-name="max-w-lg"
      :on-submit="onSubmit"
    >
      <template #modal-body>
        <BaseInput
          type="text"
          v-model="form.title"
          placeholder="Type in task title..."
          :error="errors.title"
          @clear="errors.title = undefined"
        />
        <!-- end base input -->
        <BaseTextArea
          v-model="form.body"
          placeholder="Type in task description"
          :error="errors.body"
          @clear="errors.body = undefined"
        />
        <!-- end base text area -->
        <StateAutocomplete
          type="text"
          v-model="searchState"
          :selected="selectedState"
          @change="onSelected"
          placeholder="Type in to search state"
          :error="errors.state_id"
          @clear="errors.state_id = undefined"
        />
        <!-- end state autocomplete -->
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
            <span :class="{ 'ml-3': isLoading }">Create Task</span>
          </span>
        </BaseButton>
        <!-- end submit button -->
      </template>
      <!-- end modal footer -->
    </BaseModal>
    <!-- end base modal -->
  </div>
  <!-- end create modal -->
</template>

<script>
import { postTask } from '@/api/task'
import { mapActions } from 'vuex'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseTextArea from '@/components/Base/BaseTextArea.vue'
import StateAutocomplete from '@/components/StateAutocomplete.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'TaskCreateModal',

  components: {
    BaseButton,
    BaseModal,
    BaseInput,
    BaseTextArea,
    StateAutocomplete,
    SVGAnimateSpin
  },

  props: {
    uuid: {
      type: [String, undefined],
      default: undefined
    }
  },

  data: () => ({
    isActive: false,
    isLoading: false,
    errors: {},
    searchState: '',
    selectedState: {},
    form: {
      title: '',
      body: '',
      state_id: null
    }
  }),

  watch: {
    isActive (value) {
      if (!value && Object.keys(this.errors).length > 0) {
        this.errors = {}
      }
    }
  },

  methods: {
    ...mapActions({
      setTaskItem: 'task/setTaskItem',
      pushNotification: 'ui/pushNotification'
    }),
    onSubmit () {
      this.errors = {}
      this.isLoading = true

      let form = typeof this.uuid === 'undefined' ? this.form : {...this.form, uuid: this.uuid}

      postTask(form)
        .then(({data}) => {
          this.isActive = false
          this.$nextTick(() => {
            this.clearForm()
            this.setTaskItem(data)
            const notification = {
              type: 'success',
              message: `${data.title} task has been created!`
            }
            this.pushNotification(notification)
          })
        })
        .catch((error) => {
          this.errors = error?.response?.data?.errors
          const notification = {
            type: 'error',
            message: 'Creating new task failed!'
          }
          this.pushNotification(notification)
        })
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
    clearForm () {
      this.searchState = '',
      this.selectedState = {}
      this.form = {
        title: '',
        body: '',
        state_id: null
      }
    }
  }
}
</script>
