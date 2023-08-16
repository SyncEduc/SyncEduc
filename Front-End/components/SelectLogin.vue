<template>
    <div class="h-max w-max p-2 flex items-center justify-center hover:scale-110 transition-all flex-col gap-2 rounded-[30px] backdrop-blur-lg bg-[#595959]/50">
        <img src="../assets/images/student.png" class="w-32 h-32">
        <span class="text-">{{ props.option }}</span>
    </div>
</template>
<script setup>

const props = defineProps(["option", "type"])
</script>