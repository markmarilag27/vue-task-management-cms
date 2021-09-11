<template>
  <div
    class="relative inline-block w-full"
    :class="rootClassName"
  >
    <input
      :value="value"
      @input="emitValueDebounce"
      class="w-full py-3 px-3 border-gray-600 rounded border-2"
      :class="[className, error ? 'border-red-500' : '']"
      v-bind="$attrs"
      @focus="isFocus = true"
    >
    <!-- end input -->
    <div
      v-if="error"
      class="text-red-500 mt-2"
      v-text="error[0]"
    />
    <!-- end error -->
    <StateAutocompleteResult
      v-if="isFocus"
      :is-loading="isLoading"
      :selected="selected"
      :value="value"
      :list="list"
      @on-selected="onSelected"
    />
    <!-- end result -->
    <div
      v-if="isFocus"
      @click="isFocus = false"
      class="fixed block top-0 left-0 right-0 bottom-0 bg-transparent"
    />
    <!-- end drop -->
  </div>
</template>

<script>
import { getAllStates } from '@/api/state'
import BaseInputMixin from './Base/mixin/base-input-mixin'
import StateAutocompleteResult from './StateAutocompleteResult.vue'

export default {
  name: 'StateAutocomplete',

  components: {
    StateAutocompleteResult
  },

  mixins: [BaseInputMixin],

  props: {
    selected: {
      type: Object,
      default: () => ({})
    },
    rootClassName: {
      type: [String, undefined],
      default: undefined
    }
  },

  data: () => ({
    isLoading: false,
    isFocus: false,
    errors: {},
    list: [],
    links: {},
    meta: {},
    filter: {
      page: 1,
      per_page: 10
    }
  }),

  computed: {
    querySearchParams () {
      return new URLSearchParams(this.filter)
    }
  },

  watch: {
    value (value) {
      if (value.length === 0 && value !== this.selected.name) {
        this.$nextTick(() => {
          this.fetchData()
        })
      }
      if (value.length > 0 && value !== this.selected.name) {
        this.$emit('change', {})
      }
    },
    isFocus (value) {
      if (value && this.value.length === 0 && this.list.length === 0 || value && this.value.length !== 0 && this.value === this.selected.name && this.list.length === 0) {
        this.$nextTick(() => {
          this.fetchData()
        })
      }
    }
  },

  methods: {
    fetchData () {
      this.isLoading = true

      if (this.value !== '') {
        const cloneFilter = {...this.filter}
        const newFilter = {...cloneFilter, name: this.value }
        this.filter = newFilter
      }

      if (this.value === this.selected.name) {
        delete this.filter.name
      }

      getAllStates(this.querySearchParams)
        .then((response) => {
          this.list = response.data
          this.links = response.links
          this.meta = response.meta
        })
        .catch((error) => (this.errors = error?.response?.data))
        .finally(() => (this.isLoading = false))
    },
    onSelected (value) {
      this.$emit('input', value.name)
      this.$emit('change', value)
      this.$emit('clear')
      this.isFocus = false
    }
  }
}
</script>

<style scoped>
.fixed {
  z-index: 9998;
}
</style>
