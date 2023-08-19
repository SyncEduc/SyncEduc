<template>
  <div class="HightlightContainer">
    <img :src="img">
    <div>
      <div class="Title">
        <slot name="title"/>
      </div>
      <div class="Desc">
        <slot name="desc"/>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['img'])
</script>
<style scoped>
.HightlightContainer {
  background: linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255,255,255,0.6) 50%, rgba(255, 255, 255, 0.1) 100%);
  @apply w-72 sm:w-96 h-max p-2 flex flex-row items-center justify-center gap-4
   backdrop-blur-md
  rounded-[25px] border border-white/50 shadow-xl
}
.HightlightContainer > img {
  @apply w-24 h-24 p-4 
}
.HightlightContainer > div{
  @apply flex flex-col gap-2 text-left
}
.HightlightContainer > div > .Title{
  @apply text-xs sm:text-sm font-bold
}
.HightlightContainer > div > .Desc{
  @apply text-xs sm:text-sm opacity-50 font-bold
}
</style>