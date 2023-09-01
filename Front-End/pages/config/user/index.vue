<template>
    <NuxtLayout name="nav">
        <div class="configUserContainer">
            <div class="options">
                <div :class="{ 'unSelected': !option.selected, 'selected': option.selected }" @click="switchSelected(option)" v-for="option in options"
                    :key="option">{{ option.name }}</div>
            </div>
            <div class="contentOptions">
                <template v-for="option in options">
                    <template v-if="option.selected">
                        <ConfigurationProfile v-if="option.id == 1"/>
                        <ConfigurationLogon v-if="option.id == 3"/>
                    </template>
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
const options = ref([
    {
        id: 1,
        name: 'Perfil',
        selected: true
    },
    {
        id: 2,
        name: 'Dados pessoais',
        selected: false
    },
    {
        id: 3,
        name: '⤶ Sair',
        selected: false
    }
])



function switchSelected(option) {
    const currentSelected = options.value.findIndex(o => o.selected == true);
    options.value[currentSelected].selected = false
    option.selected = true
}
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace;
}
.configUserContainer {
    @apply w-full min-h-screen flex flex-col p-2 gap-4 md:flex-row md:px-6 md:pb-6 pt-24
}

.configUserContainer>.options {
    @apply w-full flex flex-row gap-2 items-center md:flex-col md:w-max px-4  md:border-r md:border-black/10
}
@media (min-width: 768px) {
    .options {
        overflow-x: unset;
    }
}
@media (max-width: 768px) {
    .options {
        overflow-x: scroll;
    }
}
.configUserContainer>.options>.unSelected {
    @apply p-2 rounded-full font-bold border border-transparent text-sm text-[#363636] 
    cursor-pointer w-max text-center
    md:w-full md:rounded-lg
}

.configUserContainer>.options>.selected {
    @apply p-2 rounded-full font-bold border border-[#858bfd] text-sm text-[#4e52a8] 
    bg-[#eeeeff] cursor-pointer w-max text-center
    md:w-full md:rounded-lg 
}

.configUserContainer>.contentOptions {
    @apply w-full min-h-full h-max flex-1 p-2 border-t border-black/50 md:border-0
}
</style>