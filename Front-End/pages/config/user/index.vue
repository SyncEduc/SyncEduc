<template>
    <div class="configUserContainer">
        <div class="options">
            <div :class="{ 'unSelected': !option.selected, 'selected': option.selected }" @click="switchSelected(option)" v-for="option in options"
                :key="option">{{ option.name }}</div>
        </div>
        <div class="contentOptions">
            <template v-for="option in options">
                <template v-if="option.selected">
                    <ConfigurationProfile v-if="option.id == 1"/>
                </template>
            </template>
        </div>
    </div>
</template>
<script setup>
const options = ref([
    {
        id: 1,
        name: 'Perfil',
        selected: false
    },
    {
        id: 2,
        name: 'Dados pessoais',
        selected: true
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
    @apply w-full min-h-screen flex flex-col p-2 gap-4
}

.configUserContainer>.options {
    @apply w-full flex flex-row gap-2 items-center overflow-x-scroll
}

.configUserContainer>.options>.unSelected {
    @apply p-2 rounded-full font-bold border border-transparent text-sm text-[#363636] cursor-pointer
}

.configUserContainer>.options>.selected {
    @apply p-2 rounded-full font-bold border border-[#858bfd] text-sm text-[#4e52a8] bg-[#eeeeff] cursor-pointer
}

.configUserContainer>.contentOptions {
    @apply w-full h-max p-2 border-t border-black/50
}
</style>