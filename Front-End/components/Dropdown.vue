<template>
  <div class="dropdownContainer">
    <button @click="seeList = !seeList">
      <span><slot/></span>
      <svg :class="{'rotate-90':seeList}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"/></svg>
    </button>
    <ul v-if="seeList" class="listContainer">
      <li v-for="(item, index) in list" :key="index" @click="emitValues(item, index)">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps(['list'])
const emit = defineEmits(['get-select'])
const seeList = ref(false)
function emitValues(item){
  emit('get-select', item)
}
</script>

<style scoped>
.dropdownContainer{
  @apply w-max min-w-[10rem] h-max p-2 rounded border border-black flex flex-col gap-2 relative
}
.dropdownContainer > button{
  @apply flex flex-row items-center justify-between gap-2 transition-all
}
.dropdownContainer > button > * {
  transition:  all 300ms;
}
.dropdownContainer > .listContainer{
  @apply  flex-col gap-2 flex absolute mt-12 w-max bg-white border border-black p-2 -ml-2
  rounded z-20
}
.listContainer > li{
  @apply cursor-pointer
}
</style>