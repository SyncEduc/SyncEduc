<template>
  <div class="NavItemContainer" @click="emit('clickAction')">
    <slot/>
  </div>
</template>
<script setup>
const emit = defineEmits(['clickAction'])
</script>
<style scoped>
.NavItemContainer{
  @apply w-max h-max
  border-b-2 border-transparent hover:border-black/75
  text-black/75 font-bold text-sm
  cursor-pointer transition-all
}
</style>