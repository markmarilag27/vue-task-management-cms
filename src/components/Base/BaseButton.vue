<template>
  <button
    type="button"
    v-on="$listeners"
    class="bg-black py-2 px-6 text-white w-full rounded font-bold"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>
