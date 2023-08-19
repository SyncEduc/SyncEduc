<template>
    <div class="SelectLoginContainer" @click="getClickByOption">
        <img v-if="props.type == 1" src="../assets/images/student.png">
        <img v-else src="../assets/images/teacher.png">
        <span>{{ props.option }}</span>
    </div>
</template>
<script setup>

const props = defineProps(["option", "type"])
function getClickByOption(){
    navigateTo(`/login/${props.type}`)
}
</script>

<style>
.SelectLoginContainer {
    background: linear-gradient(-45deg, rgba(2,0,36,0) 0%, rgba(255,255,255,0.8) 50%, rgba(0,212,255,0) 100%);
    @apply h-max w-max p-5 flex items-center justify-center 
    cursor-pointer
    border-2 border-white/50
    hover:scale-105 transition-all
    flex-col gap-2 rounded-[30px] backdrop-blur-sm 
}
 
.SelectLoginContainer>img {
    @apply w-40 h-40 opacity-75
}

.SelectLoginContainer > span{
    @apply text-xl text-black/75 font-bold
}
</style>