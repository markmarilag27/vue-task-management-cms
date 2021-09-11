<template>
  <div class="w-full my-2 py-2">
    <textarea
      :value="value"
      @input="emitValue"
      class="w-full py-3 px-3 border-gray-600 rounded border-2"
      :class="[ className, error ? 'border-red-500' : '' ]"
      v-bind="$attrs"
    />
    <!-- end textarea -->
    <div
      v-if="error"
      class="text-red-500 mt-2"
      v-text="error[0]"
    />
    <!-- end error -->
  </div>
</template>

<script>
import BaseInputMixin from './mixin/base-input-mixin'

export default {
  name: 'BaseTextArea',

  mixins: [BaseInputMixin]
}
</script>
