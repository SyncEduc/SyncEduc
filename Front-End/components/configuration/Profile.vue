<template>
    <div class="profileContainer">
        <ConfigurationSaveChanges v-if="showSaveChanges" @action-click="receiveSaveChangeEvent"/>
        <Modal v-if="showModalAvatar" @click-close="()=>showModalAvatar = false">
            <img :src="viewImageSoruce" class="max-w-[250px] w-full max-h-[250px] rounded-lg" alt="">
            <p v-if="viewImageSoruce != ''" class="text-center break-words">{{ nameAvatarFile }}</p>
            <label v-if="viewImageSoruce == ''" for="dropzone-file" class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>

                <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Payment File</h2>

                <p class="mt-2 text-gray-500 tracking-wide">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>

                <input id="dropzone-file" @change="loadAvatarImage" type="file" class="hidden" />
            </label>
        </Modal>
        <div class="informations">
            <template v-if="loaded">
                <div class="avatarContainer" @click="showModalAvatar = true">
                    <img class="avatar" :src="cacheUser.picture.large">
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
                    <p class="description" data-edit="edit" contenteditable="true" 
                    @input="(e)=> form.description = e.target.innerText">{{ cacheUser.description }}</p>
                    <EditIcon/>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import {useUserStudentStore} from '../../store/userStudent';
const studentStore = useUserStudentStore();
const loaded = ref(false);
const showSaveChanges = ref(false);
const cacheUser = ref({});
const nameAvatarFile = ref('')
const viewImageSoruce = ref('')
const showModalAvatar = ref(false)
function loadAvatarImage(e){
    const file = e.target.files[0];
    viewImageSoruce.value = URL.createObjectURL(file)
    nameAvatarFile.value = file.name
    
}

async function receiveUser(){
    await studentStore.getUser()
    cacheUser.value = studentStore.user
    form.value.name = `${cacheUser.value.name.first} ${cacheUser.value.name.last}`
}
async function receiveSaveChangeEvent(event){
    if(!event.type){
        await receiveUser()
        showModalAvatar.value = false
        viewImageSoruce.value = ''
        nameAvatarFile.value = ''
    }
}

const form = ref({
    name: '',
    description: '',
})

watch(viewImageSoruce, ()=>{
    if(viewImageSoruce.value!= ''){
        showSaveChanges.value = true
    }else{
        showSaveChanges.value = false
    }
})

watch(()=>form.value.name, ()=>{
    if(form.value.name == `${cacheUser.value.name.first} ${cacheUser.value.name.last}`){
        showSaveChanges.value = false
    }else{
        showSaveChanges.value = true
    }
})

watch(()=>form.value.description, ()=>{
    console.log(form.value.description)
    console.log(cacheUser.value.description)
    if(form.value.description == cacheUser.value.description){
        showSaveChanges.value = false
    }else{
        showSaveChanges.value = true
    }
})

onMounted(async ()=>{
    await receiveUser()
    loaded.value = true
    
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
    @apply flex flex-row gap-1 items-center max-w-full md:max-w-[450px]
}
.profileContainer > .informations > .edit > *[data-edit="edit"]  {
    @apply p-1 outline-none border border-transparent transition-all rounded-lg focus:border-black/50
}
.profileContainer > .informations > .edit > .name{
    @apply text-xl text-center
}
.profileContainer > .informations > .edit > .description{
    @apply text-sm w-max
}
</style>