<template>
  <button
    type="button"
    v-on="$listeners"
    class="bg-black py-3 px-4 text-white w-full rounded font-bold"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>
