<template>
    <div class="LoginContainer" >
        <img class="w-full min-h-screen" id="background">
        <h1>Escolha a forma de Login!</h1>
        <div>
            <SelectLogin option="Aluno(a)" :type="1"/>
            <SelectLogin option="Professor(a)" :type="2"/>
        </div>
    </div>
</template>

<style scoped>
.LoginContainer{
    z-index: 20;
    @apply w-full min-h-screen flex items-center justify-center flex-col gap-6 bg-black/50
}
.LoginContainer > h1{
    @apply text-2xl sm:text-4xl text-white
}
.LoginContainer > div{
    @apply flex flex-col sm:flex-row  items-center justify-center gap-6
}
#background{
    position: absolute;
    z-index: -10;
    background-image: url('../../assets/images/loginBackground.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}

</style>