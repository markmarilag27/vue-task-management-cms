<template>
  <button
    type="button"
    v-on="$listeners"
    class="py-2 px-6 w-full rounded font-bold"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>
