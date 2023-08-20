<template>
  <div class="cardContainer">
    <img :src="img">
    <div>
      <h1><slot name="title"/></h1>
      <p><slot name="desc"/></p>
      <div>
        <div v-for="category in props.categories" :key="category.id">{{ category.name }}</div>
      </div>
      <button @click="navigateTo(`/cursos/sobre/${id}`)">Inscreva-se</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['img', 'categories', 'id'])
</script>
<style scoped>
.cardContainer{
  @apply w-72 h-max min-h-[20rem] border border-black rounded flex flex-col gap-2 shadow-lg
}
.cardContainer > img{
  @apply w-full
}
.cardContainer > div{
  @apply w-full h-max p-2 flex flex-col gap-2
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
.cardContainer > div > button {
  @apply w-full p-2 rounded-full bg-[#50efbc] 
  border border-[#40c097] text-[#2a705a] hover:scale-105 transition-all shadow-lg
}
</style>