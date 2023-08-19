<template>
  <div class="CardContainer">
    <BackButton class="absolute left-5 top-5"/>
    <img src="../assets/images/logo.png" alt="logo">
    <div class="InputGroup">
      <input v-model="form.name" v-show="isRegister" type="text" name="name" placeholder="Nome Completo">
      <input v-model="form.email" type="email" name="email" placeholder="Seu email">
      <input v-model="form.birth" v-show="isRegister" type="date" name="birth" placeholder="Data de nascimento">
      <div class="passwordInput" 
      :class="{'border-2 border-red-300':passwordTest == false && isRegister, 'border-green-500': passwordTest && isRegister}">
        <input v-model="form.password" v-on:input="checkPassword" :type="seePassword ? 'text':'password'" name="password" placeholder="Sua senha">
        <svg @click="seePassword = !seePassword" v-if="seePassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
        <svg @click="seePassword = !seePassword" v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5Z"/></svg>
      </div>
      <div class="flex flex-row gap-2" v-if="!isRegister">
        <Switch @click-action="getSWitchValue"/>
        <p>Entrar como professor</p>
      </div>
      <p v-if="!isTeacher">
        {{isRegister ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}} 
        <span @click="isRegister = !isRegister">{{ isRegister ? 'Fazer login' : 'Registre-se!' }}</span>
      </p>
      <p v-else>
        Gostaria de fazer parte da nossa equipe de professores?
        <span @click="redirectTeatcherToSupport()">Click aqui!</span>
      </p>
    </div>
    <button class="submitButton" @click="emit('get-data', form)">{{ !isRegister ? 'Login' : 'Registrar' }}</button>
  </div>
</template>
<script setup>
const isRegister = ref(false)
const passwordTest = ref(false)
const isTeacher = ref(false)
const seePassword = ref(false)
function getSWitchValue(event){
  isTeacher.value = event.value
  emit('get-switch', isTeacher.value)
}
const form = ref({
  name: "",
  email:"",
  birth: "",
  password: "",
  isRegister: isRegister.value
})

function checkPassword(){
  if(isRegister){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const check = regex.test(form.value.password)
    passwordTest.value = check ? true : false
  }
}

const emit = defineEmits(['get-data', 'get-switch'])

function redirectTeatcherToSupport(){
  window.location.href = 'mailto:synceduc@gmail.com'
}
</script>

<style scoped>
@import url('../assets/css/variables.css');
.CardContainer{
  @apply w-72 sm:w-96 h-max flex flex-col items-center justify-center p-8  relative
  gap-8 rounded-[30px] bg-white/50 backdrop-blur-lg shadow-lg border border-black/25
}
.CardContainer > img{
  @apply w-32 h-32 opacity-75
}
.InputGroup{
  @apply w-full h-max flex flex-col gap-2 transition-all
}
.passwordInput{
  @apply w-full relative flex items-center justify-between gap-2
  pl-4 w-full rounded-full bg-gray-200/75 border outline-none
   h-10 text-black/75 transition-all 
    focus:border-black
}
.passwordInput > svg{
  @apply mr-4 text-black/50 cursor-pointer
}
.passwordInput > input{
  @apply w-full bg-transparent outline-none  
}
.inputBorderGray{
  @apply border-[#BEBEBE] focus:border-black
}
.InputGroup > input{
  @apply pl-4 w-full rounded-full bg-gray-200/75 border outline-none
     h-10 text-black/75 transition-all 
     border-[#BEBEBE] focus:border-black
}
.InputGroup > input[type=date]{
  @apply px-4
}
.InputGroup > p{
  @apply text-black
}
.InputGroup > p > span{
  @apply text-[#2f8ca9] cursor-pointer border-b border-transparent 
  hover:border-[#2d9dff]
}
.CardContainer > button.submitButton{
 @apply w-full h-10 rounded-[25px] bg-[#6b70d6] 
 text-white text-xl hover:scale-105 transition-all
}
</style>