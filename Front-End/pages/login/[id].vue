<template>
    <div class="loginScreenContainer" :id="route.params.id == 1 ? 'student' : 'teatcher'">
        <BackButton route-back="/login"/>
        <LoginCard @get-data="getData"/>
    </div>
</template>
<script setup>
const route = useRoute()
function getData(form){
    console.log(form)
}
</script>

<style scoped>
.loginScreenContainer{
    @apply w-full min-h-screen flex flex-col gap-4 items-center 
    justify-center sm:items-center p-4 sm:p-8
} 
#student{
    position: absolute;
    background-image: url('../../assets/images/studentBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
}
#teatcher{
    position: absolute;
    background-image: url('../../assets/images/teacherBackground.png');
    background-size: cover;
    background-repeat: no-repeat;
}

</style>