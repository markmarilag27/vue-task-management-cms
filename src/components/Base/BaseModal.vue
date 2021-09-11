<template>
  <div
    v-if="value"
    class="fixed top-0 left-0 flex justify-center items-center right-0 bottom-0"
  >
    <div
      class="bg-black absolute top-0 left-0 right-0 bottom-0 opacity-20"
      @click="closeModal"
    />
    <!-- end zone -->
    <div
      class="bg-white shadow rounded py-4 px-4 w-full"
      :class="className"
    >
      <header class="flex justify-between items-center">
        <div
          class="text-xl font-bold"
          v-text="title"
        />
        <!-- end title -->
        <BaseButton
          @click="closeModal"
          type="button"
          class="w-auto px-0 py-0 bg-transparent text-black"
        >
          <SVGClose />
        </BaseButton>
      </header>
      <!-- end header -->
      <main :class="[ withFooter ? 'py-4' : 'pt-4' ]">
        <slot name="modal-body" />
      </main>
      <!-- end body -->
      <footer
        v-if="withFooter"
        class="flex flex-wrap justify-end gap-4"
      >
        <BaseButton
          v-if="closeBtn"
          @click="closeModal"
          type="button"
          class="w-auto py-2"
        >
          Close
        </BaseButton>
        <slot name="modal-footer" />
      </footer>
      <!-- end with footer -->
    </div>
    <!-- end body -->
  </div>
  <!-- end modal -->
</template>

<script>
import BaseButton from './BaseButton.vue'
import SVGClose from '@/components/SVG/SVGClose.vue'

export default {
  name: 'BaseModal',

  components: {
    BaseButton,
    SVGClose
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: 'max-w-md'
    },
    title: {
      type: String,
      default: 'Modal Title'
    },
    withFooter: {
      type: Boolean,
      default: true
    },
    closeBtn: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    html: null,
    body: null
  }),

  watch: {
    value (value) {
      this.$nextTick(() => {
        this.onAppendToElement(value)
      })
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.html = document.querySelector('html')
      this.body = document.querySelector('body')
    })
  },

  methods: {
    closeModal () {
      this.$emit('input', false)
    },
    onAppendToElement (isActive) {
      if (isActive) {
        this.html.classList.add('overflow-hidden')
        this.body.appendChild(this.$el)
      } else {
        this.html.classList.remove('overflow-hidden')
      }
    }
  }
}
</script>

<style scoped>
.fixed {
  z-index: 1024;
}
.fixed .absolute {
  z-index: 1025;
}
.fixed .bg-white {
  z-index: 1026;
}
</style>
