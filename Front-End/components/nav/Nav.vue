<template>
  <div class="nav">
    <slot />
  </div>
</template>

<style scoped>
div.nav {
  @apply w-full h-max px-8 py-2 
  fixed top-0 z-50 
  bg-white/50
  border-b border-l border-r border-[#BEBEBE] 
  rounded-b-[25px]
  backdrop-blur-md
}
</style>