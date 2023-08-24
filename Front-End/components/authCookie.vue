<template>
    <div class="cookieContainer" v-if="showCookie">
        <div class="text">
            Este site utiliza cookies para garantir a melhor experiência possível. Ao continuar navegando, você concorda com o uso de cookies de acordo com nossa Política de Privacidade. Suas preferências podem ser ajustadas a qualquer momento nas configurações do seu navegador.
        </div>
        <div class="authButton">
            <button class="accept" @click="setCookie">Aceitar</button>
            <button class="refused" @click="refusedCookie">Recusar</button>
        </div>
    </div>
</template>
<script setup>
// import { json } from 'stream/consumers';

const showCookie = ref(false)

function setCookie(){
    localStorage.setItem('_gck', JSON.stringify(true))
    showCookie.value = false
}
function refusedCookie(){
    localStorage.setItem('_gck', JSON.stringify(false))
    showCookie.value = false
}

onMounted(() => {
    const _gck = localStorage.getItem('_gck')
    if(_gck != null){
        if(JSON.parse(_gck)){
            showCookie.value = false
        }else{
            showCookie.value = false
        }
    }else{
        showCookie.value = true
    }
})
</script>

<style scoped>
.cookieContainer{
    @apply fixed bottom-5 left-0 sm:left-10 w-[100%] sm:w-max justify-self-center flex flex-row justify-between gap-2 h-max 
    bg-[#ffffffda] backdrop-blur shadow-lg p-4 rounded-xl
}
.cookieContainer > div.text{
    @apply break-words max-w-[24rem] text-center text-black/75 text-sm
}
.cookieContainer > div.authButton{
    @apply flex flex-col gap-5  p-4
}
.cookieContainer > div.authButton > button{
    @apply p-2 rounded-xl bg-green-400 h-max w-max transition-all hover:scale-[1.1] hover:shadow-lg text-white
}
.cookieContainer > div.authButton > button.accept{
    @apply bg-[#8e93ed] border border-[#343bbe] 
}
.cookieContainer > div.authButton > button.refused{
    @apply bg-red-400 border border-red-500 
}
</style>