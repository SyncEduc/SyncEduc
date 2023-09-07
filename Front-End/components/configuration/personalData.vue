<template>
    <div class="personalDataContainer">
        <ConfigurationSaveChanges v-if="showSaveChanges" @action-click="receiveSaveChangesEvent"/>
        <div class="informations">
            <div class="edit">
                <svg class="text-black/50" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7l8-5V6l-8 5l-8-5v2l8 5Z"/></svg>
                <p data-edit="edit" contenteditable="true" @input="updateEmail" placeholder="Email"> {{ cacheUser.email }}</p>
                <EditIcon/>
            </div>
            <div class="edit">
                <svg class="text-black/50" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor"><path stroke-width="1.5" d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"/><path stroke-linecap="round" stroke-width="1.5" d="M6 10V8a6 6 0 0 1 11.811-1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h.009m3.982 0H12m3.991 0H16"/></g></svg>
                <input :type="passwordType" data-edit="edit" contenteditable="true" 
                @input="updatePassword" v-model="newPassword" placeholder="Senha"/> 
                <EditIcon @click="passwordType = passwordType == 'password' ? 'text': 'password'"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useUserStudentStore} from '../../store/user';
const studentStore = useUserStudentStore();
const cacheUser = ref({})
const showSaveChanges = ref(false)
const newPassword = ref('')
const passwordType = ref('password')
const newEmail = ref('')
const target = ref('')

async function receiveUser(){
    await studentStore.getUser()
    cacheUser.value = studentStore.user
}
onMounted(async ()=>{
    await studentStore.getUser();
    cacheUser.value = studentStore.user
})
async function receiveSaveChangesEvent(e){
    if(e.type){
        const type = localStorage.getItem("_gtt")
        cacheUser.value.email = newEmail.value
        cacheUser.value.senha = newPassword.value
        await fetch(`http://127.0.0.1:5000/atualizarDado?opcao=${type}&token=${localStorage.getItem('_gtk')}&target=${target.value}&value=${cacheUser.value[target.value]}`, {
            method: 'POST'
        }).then(res=> res.json()).then(async res=>{
            if('token' in res){
                await receiveUser()
                showSaveChanges.value = false
            }
        })
    }else{
        await receiveUser()
        showSaveChanges.value = false
    }
}

function updateEmail(e){
    newEmail.value = e.target.innerText
    target.value = 'email'
    showSaveChanges.value = e.target.innerText == cacheUser.value.email ? false : true;
}
function updatePassword(e){
    target.value = 'senha'
    showSaveChanges.value = e.target.innerText == cacheUser.value.senha ? false: true;
}
</script>

<style scoped>
.personalDataContainer{
    @apply w-full h-full flex flex-row gap-6 items-center
}
.personalDataContainer > .informations{
    @apply w-full h-full flex flex-row flex-wrap gap-24 justify-center
}
.personalDataContainer >  .informations > .edit{
    @apply flex flex-row gap-1 items-center max-w-full md:max-w-[450px]
}
.personalDataContainer > .informations > .edit > *[data-edit="edit"]  {
    @apply w-max min-w-[13rem] p-1 outline-none border transition-all rounded-lg border-black/50
}

.personalDataContainer > .informations >.edit > *[placeholder]:empty:before {
    content: attr(placeholder);
    color: #555; 
}

</style>