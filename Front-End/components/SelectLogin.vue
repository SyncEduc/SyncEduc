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
    @apply h-max w-max p-5 flex items-center justify-center 
    cursor-pointer
    hover:scale-110 border border-gray-400 transition-all
    flex-col gap-2 rounded-[30px] backdrop-blur-lg bg-[#595959]/50
}
 
.SelectLoginContainer>img {
    @apply w-40 h-40 opacity-50
}

.SelectLoginContainer > span{
    @apply text-xl text-white/50
}
</style>