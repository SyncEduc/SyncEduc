<template>
    <div class="saveContainer">
        <div class="saveChanges">
            <div class="text">Tem certeza que deseja atualizar seus dados?</div>
            <div class="buttons">
                <button class="accept" @click="emitAction(true)">Aceitar</button>
                <button class="refused" @click="emitAction(false)">Recusar</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['action-click'])
function emitAction(type){
    emit('action-click', {type})
}
</script>
<style scoped>

@keyframes show {
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
    
}
.saveContainer {
    animation: show 0.3s linear;
    @apply w-full flex h-max items-center justify-center p-5 fixed bottom-0
}

.saveContainer>.saveChanges {
    @apply w-max h-full flex flex-row gap-6 rounded-xl shadow-xl p-4
}
.saveContainer>.saveChanges > .text{
    @apply text-center flex items-center text-black/75
}
.saveContainer>.saveChanges>.buttons{
    @apply flex flex-col gap-2
}
.saveContainer>.saveChanges>.buttons>button {
    @apply p-2 rounded-xl h-max w-max transition-all hover:scale-[1.1] hover:shadow-lg text-white 
}

.saveContainer>.saveChanges>.buttons>.accept {
    @apply bg-[#8e93ed] border border-[#343bbe]
}

.saveContainer>.saveChanges>.buttons>.refused {
    @apply bg-red-400 border border-red-500
}</style>