<template>
  <div class="flex-grow bg-white shadow rounded p-4">
    <h2 v-text="task.title" />
    <!-- end title -->
    <p
      class="text-sm text-gray-500 mb-2 tracking-wider leading-relaxed truncate max-w-lg"
      v-text="task.body"
    />
    <!-- end description -->
  </div>
</template>

<script>
export default {
  name: 'TaskItem',

  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
