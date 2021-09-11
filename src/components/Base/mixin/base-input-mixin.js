import debounce from 'lodash.debounce'

export default {
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
      type: [Array, undefined],
      default: undefined
    }
  },

  methods: {
    emitValue (event) {
      this.$emit('input', event.target.value)
      if (typeof this.error !== 'undefined') {
        this.$emit('clear')
      }
    },
    emitValueDebounce: debounce(function (event) {
      this.emitValue(event)
    }, 500)
  }
}
