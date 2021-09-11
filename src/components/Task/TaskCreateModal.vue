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

export default {
  name: 'TaskCreateModal',

  components: {
    BaseButton,
    BaseModal,
    BaseInput,
    BaseTextArea
  },

  data: () => ({
    isActive: false,
    isLoading: false,
    errors: {},
    form: {
      title: '',
      body: '',
      state_id: null
    }
  }),

  methods: {
    onSubmit () {}
  }
}
</script>
