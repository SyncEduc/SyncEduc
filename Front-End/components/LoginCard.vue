<template>
  <div class="CardContainer">
    <img src="../assets/images/logo.png" alt="logo">
    <div class="InputGroup">
      <input v-model="form.name" v-show="isRegister" type="text" name="name" placeholder="Nome Completo">
      <input v-model="form.email" type="email" name="email" placeholder="Seu email">
      <input v-model="form.birth" v-show="isRegister" type="date" name="birth" placeholder="Data de nascimento">
      <input v-model="form.password" type="password" name="password" placeholder="Sua senha">
      <p v-if="route.params.id == 1">
        {{isRegister ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}} 
        <span @click="isRegister = !isRegister">{{ isRegister ? 'Fazer login' : 'Registre-se!' }}</span>
      </p>
      <p v-else>
        Problemas ao efetuar login?
        <span @click="redirectTeatcherToSupport()">Entre em contato com o suporte!</span>
      </p>
    </div>
    <button @click="emit('get-data', form)">{{ !isRegister ? 'Login' : 'Registrar' }}</button>
  </div>
</template>
<script setup>
const isRegister = ref(false)
const route = useRoute()

const form = ref({
  name: "",
  email:"",
  birth: "",
  password: "",
  isRegister: isRegister.value
})

const emit = defineEmits(['get-data'])

function redirectTeatcherToSupport(){
  window.location.href = 'mailto:synceduc@gmail.com'
}
</script>

<style scoped>
.CardContainer{
  @apply w-72 sm:w-96 h-max flex flex-col items-center justify-center p-8 
  gap-8 rounded-[30px] backdrop-blur-lg bg-[#595959]/50 border border-[#909090]
}
.CardContainer > img{
  @apply w-32 h-32 rounded-full
}
.InputGroup{
  @apply w-full h-max flex flex-col gap-2 transition-all
}
.InputGroup > input{
  @apply pl-4 rounded-full bg-[#595959]/75 border outline-none
  border-[#BEBEBE] h-10 text-white transition-all 
  focus:border-2 focus:bg-[#373737] 
}
.InputGroup > input[type=date]{
  color-scheme: dark;
  @apply px-4
}
.InputGroup > p{
  @apply text-white
}
.InputGroup > p > span{
  @apply text-[#00C2FF] cursor-pointer border-b border-transparent 
  hover:border-[#00C2FF]
}
.CardContainer > button{
 @apply w-full h-10 rounded-[25px] bg-[#1C1C1C]/75 
 text-white text-xl hover:scale-105 transition-all
}
</style>