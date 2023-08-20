<template>
  <div class="nav" :class="drawerActived">
    <slot />
  </div>
</template>
<script setup>
import { useDrawerStore } from "~/store/drawer";
const drawerStore = useDrawerStore();

const drawerActived = computed(()=>{
  return {
    'fixed': drawerStore.getActiveState,
    'absolute': !drawerStore.getActiveState
  }
})
</script>
<style scoped>
div.nav {
  @apply w-full h-max py-2 px-8 flex flex-row items-center 
  justify-between z-10 top-0 backdrop-blur-sm
}
</style>