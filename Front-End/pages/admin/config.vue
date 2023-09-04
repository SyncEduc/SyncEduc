<template>
    <NuxtLayout name="nav">
        <div class="adminConfigContainer">
            <div class="Categories">
                <h1>Categorias</h1>
                <div class="inputGroup">
                    <input v-model="newCategory" type="text" name="category-name" id="">
                    <button @click="createCategory">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
                <div class="list">
                    <template v-for="category in courseStore.categories" :key="category.id">
                        <div class="category">
                            <p>{{category.name}}</p>
                            <div>
                                <button @click="deleteCategory(category.id)" class="bg-red-300 p-2 text-red-900  border border-red-900 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { useCourseStore } from '~/store/courses';
const courseStore = useCourseStore()
const newCategory = ref('')

async function createCategory(){
    const token = localStorage.getItem("_gtk")
    await fetch(`http://127.0.0.1:5000/registrarCategoria?name=${newCategory.value}&token=${token}`, {method: "POST"})
    .then(res=>res.json()).then(async res=>{
        courseStore.fetchCategories()
    })
}

async function deleteCategory(id){
    const token = localStorage.getItem("_gtk")
    fetch(`http://127.0.0.1:5000/deletarCategoria?id=${id}&token=${token}`, {method: "POST"})
    .then(res=>res.json()).then(async res=>{
        courseStore.fetchCategories()
    })
}

onMounted(async()=>{
    await courseStore.fetchCategories()
    console.log(courseStore.categories)
})


</script>
<style scoped>
.adminConfigContainer{
    @apply w-screen min-h-screen h-max pt-24 px-6 pb-4 flex flex-col gap-12 items-center
}
.adminConfigContainer > .Categories {
    @apply w-full max-w-[40rem] rounded-lg p-4 flex flex-col gap-6 items-center justify-center border border-black/10
}
.adminConfigContainer > .Categories > h1{
    @apply text-2xl
}
.adminConfigContainer > .Categories > .inputGroup {
    @apply w-full max-w-[30rem] flex flex-row gap-2
}
.adminConfigContainer > .Categories > .inputGroup > input{
    @apply w-full rounded-lg border border-black/50 outline-none p-2
}
.adminConfigContainer > .Categories > .inputGroup > button{
    @apply bg-[#50efbcff]/50 border border-[#28a17b] p-2 rounded-lg hover:scale-[1.1]
}
.adminConfigContainer > .Categories > .list{
    @apply w-full flex flex-col gap-2 max-w-[30rem]
}
.adminConfigContainer > .Categories > .list > .category{
    @apply flex flex-row gap-2 items-center justify-between
}
.adminConfigContainer > .Categories > .list > .category > p{
    @apply w-full p-2 border border-[#3e44b8] bg-[#858bfdff]/50 text-[#292d7e] rounded-lg text-center
}
.adminConfigContainer > .Categories > .list > .category > div{
    @apply flex flex-row gap-2 
}
</style>