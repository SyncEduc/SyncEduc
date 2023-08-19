<template>
  <div @click="updateActive()" class="switchContainer" 
    :class="{'justify-end':isActive, 'justify-start ':!isActive,'bg-purple-theme':isActive, 'bg-gray-400': !isActive}">
    <div class="h-4 w-4 rounded-full shadow bg-white"
    :class="{'actived': isActive, 'disable': !isActive}"
    ></div>
  </div>
</template>
<script setup>
const isActive = ref(false)
const emit = defineEmits(['click-action'])
function updateActive(){
  isActive.value = !isActive.value
  emit('click-action', isActive)
}
</script>

<style>
@keyframes backToFalse {
  from{
    transform: translateX(1.5rem);
  }to{
    transform: translateX(-0.1rem);
  }
}
@keyframes goToTrue {
  from{
    transform: translateX(-1.5rem);
  }to{
    transform: translateX(0.1rem);
  }
}
.actived{
  animation: goToTrue 100ms linear;
}
.disable{
  animation: backToFalse 100ms linear;
}
.bg-purple-theme{
  background-color: #6b70d6;
}
.switchContainer{
  @apply w-12 h-6 rounded-full flex items-center p-1 transition-all cursor-pointer
}

</style>