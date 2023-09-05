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
            <div class="teacher">
                <h1 class="w-full text-center text-2xl"> Adicionar professor</h1>
                <input v-model="newTeacher.name" type="text" placeholder="Nome do professor">
                <input v-model="newTeacher.email" type="email" placeholder="Email">
                <input v-model="newTeacher.password" type="text" placeholder="Senha">
                <input v-model="newTeacher.imgURL" type="text" placeholder="Link para foto de perfil">
                <Dropdown @get-select="(event) => selectedCategory = event" :list="courseStore.getCategoriesList">{{ selectedCategory.name }}</Dropdown>
                <p>{{ selectedCategory.name }}</p>
                <button @click="sendNewTeacher">Enviar</button>
                <div v-if="showAlert" class="alert" :class="alertType">{{ alertMessage }}</div>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { useCourseStore } from '~/store/courses';
import { useLoginStore } from '~/store/login';
definePageMeta({
    middleware: ()=>{
        const loginStore = useLoginStore()
        if(process.client){
            if(loginStore.isLogged && localStorage.getItem("_gtt") == "admin"){
                return true
            }else{
                return navigateTo('/')
            }
        }
    }
})

const courseStore = useCourseStore()
const newCategory = ref('')
const newTeacher = ref({
    name: '',
    email: '',
    password: '',
    imgURL: ''
})

const selectedCategory = ref({
    name: 'Selecione uma categoria',
    id: 12301273012
})



async function sendNewTeacher(){
    const token = localStorage.getItem("_gtk")
    await fetch(`http://127.0.0.1:5000/registrarProfessor?category=${selectedCategory.value.id}&token=${token}&name=${newTeacher.value.name}&email=${newTeacher.value.email}&password=${newTeacher.value.password}&imageURL=${newTeacher.value.imgURL}`, {method: "POST"}).then(res=>{
        return res.json()
    }).then(res=>{
        if("message" in res){
            activateAlert(res.message)
        }
    })
}

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')
function activateAlert(message){
    alertMessage.value = message,
    showAlert.value = true
    setTimeout(()=>{
        showAlert.value = false
    }, 5000)
}
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
})


</script>
<style scoped>
.adminConfigContainer{
    @apply w-full min-h-screen h-max mt-20 p-4 flex flex-col gap-12 items-center
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
    @apply bg-[#50efbcff]/50 border border-[#28a17b] p-2 rounded-lg hover:scale-[1.1] transition-all
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

.adminConfigContainer > .teacher{
    @apply w-full max-w-[40rem] rounded-lg p-4 flex flex-row flex-wrap gap-6 items-center justify-center sm:justify-between border border-black/10
}

.adminConfigContainer > .teacher > input{
    @apply max-w-full w-[48%] min-w-[47%] p-2 border border-black/50 rounded-lg outline-none
}
.adminConfigContainer > .teacher > p{
    @apply max-w-full w-[48%] min-w-[47%] border p-2 border-[#3e44b8] bg-[#858bfdff]/50 text-[#292d7e] rounded-lg text-center
}
.adminConfigContainer > .teacher > button{
    @apply w-full bg-[#50efbcff]/50 border border-[#28a17b] text-[#154133] p-2 rounded-lg hover:scale-[1.03] transition-all 
}
.adminConfigContainer > .teacher > .alert{
    @apply w-full p-6 rounded-lg text-lg text-center
}
.adminConfigContainer > .teacher > .alert.success{
    @apply bg-[#50efbcff]/20 border border-[#28a17b]/75 p-2 rounded-lg transition-all  text-[#28a17b]
}
.adminConfigContainer > .teacher > .alert.error{
    @apply bg-[#a12828]/20 border border-[#a12828]/75 p-2 rounded-lg transition-all  text-[#a12828]
}
</style>