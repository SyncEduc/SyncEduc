<template>
  <div class="nav">
    <slot />
  </div>
</template>

<style scoped>
div.nav {
  @apply w-full h-max py-4 px-8 flex flex-row items-center 
  justify-between z-10 fixed lg:absolute top-0 backdrop-blur-sm
}
</style>