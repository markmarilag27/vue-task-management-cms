<template>
  <ul class="absolute block w-full mt-1 shadow rounded">
    <li
      v-if="isLoading"
      class="bg-white py-2 px-4 border-b flex items-center gap-4 cursor-wait"
    >
      <SVGAnimateSpin class="text-black" />
      Searching...
    </li>
    <!-- end searching -->
    <li
      v-else-if="value.length !== 0 && list.length === 0"
      class="bg-white py-2 px-4 border-b"
    >
      No result has been found for `<span
        class="font-bold"
        v-text="value"
      />` keywords.
    </li>
    <!-- end no result -->
    <template v-else>
      <li
        @click="onSelected(result)"
        v-for="result in list"
        :key="result.uuid"
        class="py-2 px-4 capitalize border-b cursor-pointer hover:bg-gray-50 hover:text-black"
        :class="[ selected.uuid === result.uuid ? 'text-black bg-gray-50' : 'text-gray-600 bg-white', value === result.name ? 'hidden' : 'block' ]"
        v-text="result.name"
      />
      <!-- end list -->
    </template>
    <!-- end result -->
  </ul>
  <!-- end unordered list -->
</template>

<script>
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'StateAutocompleteResult',

  components: {
    SVGAnimateSpin
  },

  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    selected: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onSelected (value) {
      this.$emit('on-selected', value)
    }
  }
}
</script>

<style scoped>
.absolute {
  z-index: 9999;
}
</style>
