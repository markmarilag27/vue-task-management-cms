<template>
  <div class="create-modal">
    <BaseButton
      @click="isActive = !isActive"
      type="button"
      class="bg-gray-500"
    >
      Create Task
    </BaseButton>
    <!-- end base button -->
    <BaseModal
      v-model="isActive"
      title="Create Task"
      class-name="max-w-lg"
    >
      <template #modal-body>
        <form @submit.prevent="onSubmit">
          <BaseInput
            type="text"
            v-model="form.title"
            placeholder="Type in task title..."
          />
          <!-- end base input -->
          <BaseTextArea
            v-model="form.body"
            placeholder="Type in task description"
          />
          <!-- end base text area -->
          <StateAutocomplete
            type="text"
            v-model="searchState"
            :selected="selectedState"
            @change="onSelected"
            placeholder="Type in to search state"
          />
          <!-- end state autocomplete -->
        </form>
        <!-- end form -->
      </template>
      <!-- end modal body -->
    </BaseModal>
    <!-- end base modal -->
  </div>
  <!-- end create modal -->
</template>

<script>
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModal from '@/components/Base/BaseModal.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseTextArea from '@/components/Base/BaseTextArea.vue'
import StateAutocomplete from '@/components/StateAutocomplete.vue'

export default {
  name: 'TaskCreateModal',

  components: {
    BaseButton,
    BaseModal,
    BaseInput,
    BaseTextArea,
    StateAutocomplete
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

  methods: {
    onSubmit () {},
    onSelected (event) {
      if (event.id) {
        this.form.state_id = event.id
      } else {
        this.form.state_id = null
      }
      this.selectedState = event
    }
  }
}
</script>
