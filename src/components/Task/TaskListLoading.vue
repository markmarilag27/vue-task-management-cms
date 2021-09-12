<template>
  <div class="flex flex-col gap-4 cursor-wait">
    <div
      v-for="index in 5"
      :key="index"
      class="border border-gray-300 shadow rounded-md p-4 w-full mx-auto"
    >
      <div class="animate-pulse space-x-4">
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-400 rounded w-3/4" />
          <div class="space-y-2">
            <div class="h-4 bg-gray-400 rounded" />
            <div class="h-4 bg-gray-400 rounded w-5/6" />
          </div>
          <div class="flex gap-4">
            <div class="h-8 bg-gray-400 rounded w-40" />
            <div class="h-8 bg-gray-400 rounded w-40" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskListLoading'
}
</script>
