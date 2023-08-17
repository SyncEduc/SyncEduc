<template>
    <div class="loginScreenContainer" :id="route.params.id == 1 ? 'student' : 'teatcher'">
        <button @click="navigateTo('/login')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar
        </button>
        <LoginCard/>
    </div>
</template>
<script setup>
const route = useRoute()
</script>

<style scoped>
.loginScreenContainer{
    @apply w-full min-h-screen flex flex-col gap-4 items-center justify-center sm:items-start sm:px-8
}
.loginScreenContainer > button{
    @apply w-max flex flex-row gap-2 text-white border 
    border-[#909090] rounded-[10px] backdrop-blur-lg bg-[#595959]/50 p-4
}
#student{
    position: absolute;
    background-image: url('../../assets/images/studentBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
}
#teatcher{
    position: absolute;
    background-image: url('../../assets/images/teatcherBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
}

</style>