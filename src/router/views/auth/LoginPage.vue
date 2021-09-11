<template>
  <div
    id="login-page"
    class="flex-grow max-w-sm bg-white rounded shadow py-8 px-6"
  >
    <h1 class="text-3xl font-bold mb-1">
      Task Management
    </h1>
    <!-- end title -->
    <p class="text-gray-500 mb-4">
      Sign in to continue
    </p>
    <!-- end subtitle -->

    <form @submit.prevent="onSubmit">
      <BaseInput
        v-model="form.email"
        type="email"
        placeholder="Type in email..."
        :error="errors.email"
        @clear="errors.email = undefined"
      />
      <!-- end email -->
      <BaseInput
        v-model="form.password"
        type="password"
        placeholder="Type in password..."
        :error="errors.password"
        @clear="errors.password = undefined"
      />
      <!-- end password -->
      <BaseButton
        type="submit"
        class="mt-2"
        :disabled="isLoading"
      >
        <span class="flex justify-center items-center">
          <SVGAnimateSpin v-if="isLoading" />
          <span :class="{ 'ml-3': isLoading }">Login</span>
        </span>
      </BaseButton>
      <!-- end button -->
    </form>
    <!-- end form -->
  </div>
</template>

<script>
import { postLogin } from '@/api/auth'
import { mapActions } from 'vuex'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'LoginPage',

  components: {
    BaseInput,
    BaseButton,
    SVGAnimateSpin
  },

  data: () => ({
    isLoading: false,
    form: {
      email: 'john.doe@laravel.com',
      password: 'password'
    },
    errors: {}
  }),

  methods: {
    ...mapActions({
      setUser: 'auth/setUser'
    }),
    onSubmit () {
      this.errors = {}
      this.isLoading = true

      postLogin(this.form)
        .then(({data}) => {
          this.setUser(data)
          this.$router.push({ name: 'home' })
        })
        .catch((error) => this.errors = error?.response?.data?.errors)
        .finally(() => this.isLoading = false)
    }
  }
}
</script>
