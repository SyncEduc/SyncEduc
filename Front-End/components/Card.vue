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
    <button @click="navigateTo(`/cursos/sobre/${id}`)">Inscreva-se</button>
  </div>
</template>
<script setup>
const categoryLimit = ref(3)
const props = defineProps(['img', 'categories', 'id'])
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
</style>