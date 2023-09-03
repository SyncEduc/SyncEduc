<template>
    <div class="logonContainer">
        <h1>Deseja se desconectar da sua conta?</h1>
        <button @click="logout">⤶ Sair</button>
    </div>
</template>
<script setup>
function logout(){
    localStorage.removeItem("_gtk")
    navigateTo("/")
}
</script>

<style scoped>
.logonContainer{
    @apply w-full h-max flex flex-col gap-6 items-center
}
.logonContainer > h1{
    @apply text-center text-xl
}
.logonContainer > button{
    @apply bg-red-300 border border-red-800  
    text-red-800 px-4 py-3 rounded-xl hover:scale-[1.1] transition-all
}
</style>