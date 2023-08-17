<template>
    <div class="loginScreenContainer" :id="route.params.id == 1 ? 'student' : 'teatcher'">
        <BackButton route-back="/login"/>
        <LoginCard/>
    </div>
</template>
<script setup>
const route = useRoute()
</script>

<style scoped>
.loginScreenContainer{
    @apply w-full min-h-screen flex flex-col gap-4 items-center 
    justify-center sm:items-start p-4 sm:p-8
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