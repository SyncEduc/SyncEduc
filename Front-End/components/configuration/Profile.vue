<template>
    <div class="profileContainer">
        <h1>Informações do seu perfil</h1>
        <ConfigurationSaveChanges v-if="showSaveChanges" @action-click="receiveSaveChangeEvent"/>
        <div class="informations">
            <template v-if="loaded">
                <img class="avatar" :src="cacheUser.picture.large" alt="">
                <input class="name" v-model="form.name" type="text"/>
            </template>
        </div>
    </div>
</template>
<script setup>
import {useUserStudentStore} from '../../store/userStudent'
const studentStore = useUserStudentStore()
const loaded = ref(false)
const showSaveChanges = ref(false)
const cacheUser = ref({})
async function receiveUser(){
    await studentStore.getUser()
    cacheUser.value = studentStore.user
    form.value.name = `${cacheUser.value.name.first} ${cacheUser.value.name.last}`
}
async function receiveSaveChangeEvent(event){
    if(!event.type){
        await receiveUser()
    }
}

const form = ref({
    name: '',
})

watch(()=>form.value.name, ()=>{
    if(form.value.name == `${cacheUser.value.name.first} ${cacheUser.value.name.last}`){
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
.profileContainer > h1{
    @apply break-words text-xl
}
.profileContainer > .informations{
    @apply w-full flex flex-col gap-2 items-center
}
.profileContainer > .informations > .avatar{
    @apply rounded-full h-40 w-40
}
.profileContainer > .informations > .name{
    @apply text-xl text-center
}
</style>