<template>
  <div class="RassonItemContainer">
    <div class="imageContainer">
      <slot name="image"/>
    </div>
    <slot name="title"/>
    <div class="descContainer">
      <div class="square"></div>
      <slot name="desc"/>
    </div>
  </div>
</template>

<style scoped>
.RassonItemContainer{
  @apply w-52 h-52 hover:h-max
  flex flex-col items-center justify-center gap-2
  rounded-[25px]
  border border-black
  transition-all
  text-center
  relative
  p-2
}
.RassonItemContainer > div.imageContainer{
  @apply w-32 h-32
}
.RassonItemContainer > #title {
  @apply w-full text-center
}
.RassonItemContainer > div.descContainer{
  box-shadow: 0px 20px 20px -5px rgba(0, 0, 0, 0.40);
  @apply w-52 text-sm hidden 
  top-[110%] z-50
  absolute bg-white
  text-black/50
  rounded-[25px]
  items-center justify-center
  text-center p-2 transition-all border border-black
}
.RassonItemContainer > div.descContainer > div.square{
  @apply w-[16px] h-[16px] -top-[8px] rotate-45
   absolute border-t border-l border-black bg-white
}
.RassonItemContainer:hover > div.descContainer{
  @apply flex text-center 
}
</style>