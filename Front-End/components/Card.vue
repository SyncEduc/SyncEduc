<template>
  <div class="cardContainer">
    <img :src="img">
    <div>
      <h1><slot name="title"/></h1>
      <p><slot name="desc"/></p>
      <div>
        <template v-for="(category, index) in props.categories" :key="category.id">
          <div v-if="index <= 2">{{ category.name }}</div>
        </template>
      </div>
    </div>
    <button class="delete" v-if="showDeleteButton" @click="emit('deleteClick')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      <span >Deletar</span>
    </button>
    <button @click="navigateTo(`/cursos/sobre/${id}`)">Saiba mais</button>
  </div>
</template>
<script setup>
const categoryLimit = ref(3)
const emit = defineEmits(['deleteClick'])
const props = defineProps(['img', 'categories', 'id', 'showDeleteButton'])
</script>
<style scoped>
.cardContainer{
  @apply w-72 border border-black 
  rounded-xl flex flex-col justify-between gap-2 shadow-lg p-4
}
.cardContainer > img{
  @apply w-full rounded-xl
}
.cardContainer > div{
  @apply w-full h-max flex flex-col flex-1 gap-2 
}
.cardContainer > div > h1{
  @apply text-lg
}
.cardContainer > div > p{
  @apply text-sm text-black/75
}
.cardContainer > div > div{
  @apply flex flex-row gap-2 flex-wrap
}
.cardContainer > div > div > div{
  @apply p-2 rounded-full border border-[#858bfd] text-xs text-[#4e52a8] bg-[#eeeeff]
}
.cardContainer >  button {
  @apply w-full p-2 rounded-xl bg-[#50efbc] 
  border border-[#40c097] text-[#2a705a] hover:scale-105 transition-all shadow-lg
}

.cardContainer > .delete{
  @apply flex flex-row gap-2 items-center justify-center bg-red-400 text-red-800 font-bold border-red-800
}
</style>