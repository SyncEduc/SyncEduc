<template>
  <button @click="navigateTo(props.routeBack)">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
    Voltar
  </button>

  

</template>
<script setup>
const props = defineProps(['routeBack'])
</script>
<style scoped>
button{
    @apply w-max flex flex-row items-center justify-center gap-2 text-black/75
    transition-all hover:scale-105
}

</style>