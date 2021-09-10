<template>
  <div class="w-full my-2 py-2">
    <input
      :value="value"
      @input="emitValue"
      class="w-full py-3 px-3 border-gray-600 rounded border-2"
      :class="[className, error ? 'border-red-500' : '']"
      v-bind="$attrs"
    >
    <!-- end input -->
    <div
      v-if="error"
      class="text-red-500 mt-2"
      v-text="error[0]"
    />
    <!-- end error -->
  </div>
</template>

<script>
export default {
  name: 'BaseInput',

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    className: {
      type: [String, undefined],
      default: undefined
    },
    error: {
      type: Array,
      default: undefined
    }
  },

  methods: {
    emitValue (event) {
      this.$emit('input', event.target.value)
      if (typeof this.error !== 'undefined') {
        this.$emit('clear')
      }
    }
  }
}
</script>
