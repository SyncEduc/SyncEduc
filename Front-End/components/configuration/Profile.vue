<template>
    <div class="profileContainer">
        <ConfigurationSaveChanges v-if="showSaveChanges" @action-click="receiveSaveChangeEvent"/>
        <Modal v-if="showModalAvatar" @click-close="()=>showModalAvatar = false">
            <div class="flex flex-col gap-2">
                <img :src="form.avatar_url" alt="">
                <input v-model="form.avatar_url" class="p-2 rounded-lg border border-black/50 outline-none" type="text" placeholder="Link da imagem aqui">
                <p class="text-xs text-black/50">Recomendamos links do <a class="text-blue-400" target="_blank" href="https://imgur.com/">imgur.com</a></p>
            </div>
        </Modal>
        <div class="informations">
            <template v-if="loaded">
                <div class="avatarContainer" @click="showModalAvatar = true">
                    <img class="avatar" :src="cacheUser.avatar_url != null ? cacheUser.avatar_url : 'https://i.imgur.com/MB58STs.png'">
                    <div class="updateText" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21V3h11v2H5v14h14v-9h2v11H3ZM17 9V7h-2V5h2V3h2v2h2v2h-2v2h-2ZM6 17h12l-3.75-5l-3 4L9 13l-3 4Zm-1-6v8V5v6Z"/></svg>
                        <span>Atualizar foto de perfil</span>
                    </div>
                    
                </div>
                <div class="edit">
                    <p data-edit="edit" class="name" 
                    @input="(e)=> form.name = e.target.innerText" contenteditable="true">
                        {{ form.name }}
                    </p>
                    <EditIcon/>
                </div>
                <div class="edit">
                    <p class="description" data-edit="edit" contenteditable="true"  placeholder="Sua Descrição aqui"
                    @input="(e)=> form.description = e.target.innerText">{{ form.description}}</p>
                    <EditIcon/>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import { useUserStudentStore } from '../../store/user';
const studentStore = useUserStudentStore();
const loaded = ref(false);
const showSaveChanges = ref(false);
const cacheUser = ref({});
const showModalAvatar = ref(false)
const target = ref('')


async function receiveUser(){
    await studentStore.getUser()
    cacheUser.value = studentStore.user
    cacheUser.value.token = localStorage.getItem("_gtk")
    form.value.name = cacheUser.value.nome
    form.value.description = cacheUser.value.descricao
    form.value.avatar_url = cacheUser.value.avatar_url
}
async function receiveSaveChangeEvent(event){
    if(!event.type){
        await receiveUser()
        showModalAvatar.value = false
        showSaveChanges.value = false
    }else{
        const type = localStorage.getItem("_gtt")
        cacheUser.value.nome = form.value.name
        cacheUser.value.descricao = form.value.description
        cacheUser.value.avatar_url = form.value.avatar_url
        await fetch(`http://127.0.0.1:5000/atualizarDado?opcao=${type}&token=${localStorage.getItem('_gtk')}&target=${target.value}&value=${cacheUser.value[target.value]}`, {
            method: 'POST'
        }).then(res=> res.json()).then(async res=>{
            if('token' in res){
                await receiveUser()
                showSaveChanges.value = false
            }
        })
    }
}


const form = ref({
    name: '',
    description: '',
    avatar_url: ''
})

watch(()=> form.value.avatar_url, ()=>{
    if(form.value.avatar_url != ''){
        target.value = "avatar_url"
        showSaveChanges.value = true
    }else{
        showSaveChanges.value = false
    }
})

watch(()=>form.value.name, ()=>{
    if(form.value.name == cacheUser.value.nome){
        showSaveChanges.value = false
    }else{
        showSaveChanges.value = true
        target.value = "nome"
    }
})

watch(()=>form.value.description, ()=>{
    if(form.value.description == cacheUser.value.description){
        showSaveChanges.value = false
    }else{
        target.value = "descricao"
        showSaveChanges.value = true
    }
})

onMounted(async ()=>{
    await receiveUser()
    loaded.value = true
    showSaveChanges.value = false
    
})
</script>
<style scoped>
.profileContainer{
    @apply w-full h-max flex flex-col gap-6 items-center
}
.profileContainer > .informations{
    @apply w-full flex flex-col gap-2 items-center
}

.profileContainer > .informations > .avatarContainer{
    @apply w-max h-max rounded-full overflow-hidden relative
} 
.profileContainer > .informations > .avatarContainer > .avatar{
    @apply rounded-full h-40 w-40 border border-black/25 cursor-pointer
}
.profileContainer > .informations > .avatarContainer > .updateText{
    transition: all 300ms;
    @apply absolute -bottom-52  bg-black/50 backdrop-blur text-white
    cursor-pointer p-4
    text-center text-xs font-bold text-white/70
    flex flex-col gap-2 items-center justify-center
}
.profileContainer > .informations > .avatarContainer:hover > .updateText{
    @apply bottom-0
}
.profileContainer > .informations > .edit{
    @apply flex flex-row gap-1 items-start max-w-full md:max-w-[450px]
}
.profileContainer > .informations > .edit > *[data-edit="edit"]  {
    @apply p-1 outline-none border transition-all rounded-lg border-black/50 cursor-text
}
.profileContainer > .informations > .edit > *[placeholder]:empty:before {
    content: attr(placeholder);
    color: #555; 
}
.profileContainer > .informations > .edit > .name{
    @apply text-xl text-center
}
.profileContainer > .informations > .edit > .description{
    @apply text-sm min-w-[13rem] w-max h-16
}
</style>../../store/user