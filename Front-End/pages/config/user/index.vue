<template>
    <div class="configUserContainer">
        <div class="options">
            <div class="selected">Perfil</div>
        </div>
        <div class="contentOptions">
            wdewu
        </div>
    </div>
</template>

<style scoped>
.configUserContainer {
  @apply w-full min-h-screen flex flex-col p-2 gap-4
}
.configUserContainer > .options{
    @apply w-full flex flex-row gap-2 items-center
}
.configUserContainer > .options > .selected {
    @apply p-2 rounded-full font-bold border border-[#858bfd] text-xs text-[#4e52a8] bg-[#eeeeff]
}
.configUserContainer > .contentOptions{
    @apply w-full h-max p-2 border-t border-black/50
}

</style>