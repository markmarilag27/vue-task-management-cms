<template>
  <div class="relative">
    <nav class="flex">
      <button
        @click="selected(index)"
        type="button"
        v-for="(tab, index) in tabs"
        :key="index"
        class="border-b-2 py-4 px-6 mb-4 text-xl flex-grow"
        :class="[ currentIndex === index ? 'border-black' : 'opacity-50' ]"
        v-text="tab"
      />
      <!-- end buttons -->
    </nav>
    <!-- end nav -->
    <slot :props="currentIndex" />
    <!-- end slot -->
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',

  props: {
    uuid: {
      type: [String, undefined],
      default: undefined
    },
    tabs: {
      type: Array,
      default: () => (['Tasks', 'Trashed'])
    }
  },

  data: () => ({
    currentIndex: 0
  }),

  computed: {
    localStorageName () {
      const defaultLocalStorageName = this.$appName.replace(/\s+/g, '-').toLowerCase() + '-current-tab'
      return typeof this.uuid === 'undefined' ? defaultLocalStorageName : defaultLocalStorageName + '-' + this.uuid
    }
  },

  created () {
    const storedCurrentIndex = localStorage.getItem(this.localStorageName)

    if (typeof storedCurrentIndex !== 'undefined') {
      this.currentIndex = Number(storedCurrentIndex)
    }
  },

  methods: {
    selected (index) {
      localStorage.setItem(this.localStorageName, index)
      this.currentIndex = index
    }
  }
}
</script>
