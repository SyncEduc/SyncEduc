<template>
    <div class="loginScreenContainer" >
        <div class="bg-white">
            <LoginCard @get-switch="getSwitch" @get-data="getData"/>
        </div>
        <div :id="!swi ? 'student' : 'teatcher'"></div>
        
    </div>
</template>
<script setup>
const swi = ref(false)
function getSwitch(event){
    swi.value = event
}

function getData(form){
    console.log(form)
}

</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace;
}
.loginScreenContainer{
    @apply min-w-full min-h-screen flex items-center justify-center lg:justify-between
} 
.loginScreenContainer > div{
    @apply w-2/4 min-h-screen flex flex-col items-center justify-center gap-4
}
#student{
    background-image: url('../../assets/images/studentOption.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: -100px;
    @apply hidden lg:flex
    
}
#teatcher{
    background-image: url('../../assets/images/teacherOption.webp');
    background-position-x: -100px;
    background-size: cover;
    background-repeat: no-repeat;
    @apply hidden lg:flex
}

</style>