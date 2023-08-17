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
  border-b border-transparent hover:border-white 
  text-white text-lg
  cursor-pointer transition-all
}
</style>