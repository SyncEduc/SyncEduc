<template>
  <div class="CardContainer">
    <BackButton class="absolute left-5 top-5"/>
    <img src="../assets/images/logo.webp" alt="logo">
    <div class="InputGroup">
      <input v-if="!admin" v-model="form.name" :class="{'border-green-500': form.name.length >=1 && isRegister}" class="border-gray-300 focus:border-black" v-show="isRegister" type="text" name="name" placeholder="Nome Completo">
      <input v-model="form.email" :class="{
        'border-red-300':emailTest == false && isRegister,
        'border-gray-300 focus:border-black': !isRegister,
       'border-green-500': emailTest == true && isRegister}"
      v-on:input="checkEmail" type="email" name="email" placeholder="Seu email">
      <input v-model="form.birth" :class="{'border-green-500': form.birth.length >=1 && isRegister}" class="border-gray-300 focus:border-black" v-show="isRegister" type="date" name="birth" placeholder="Data de nascimento">
      <div class="passwordInput"
      :class="{'border-2 border-red-300':passwordTest == false && isRegister, 'border-gray-300 notRegister': !isRegister, 'border-green-500': passwordTest && isRegister}">
        <input v-model="form.password" v-on:input="checkPassword" :type="seePassword ? 'text':'password'" name="password" placeholder="Sua senha">
        <svg @click="seePassword = !seePassword" v-if="seePassword" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
        <svg @click="seePassword = !seePassword" v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5Z"/></svg>
      </div>
      <span class="text-red-500 text-xs" >{{ message }}</span>
      <div class="flex flex-row gap-2" v-if="!isRegister && !admin" >
        <Switch  @click-action="getSWitchValue"/>
        <p>Entrar como professor</p>
      </div>
      <div class="optionText" v-if="!admin">
        <p v-if="!isTeacher">
          {{isRegister ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}} 
          <span @click="switchMode">{{ isRegister ? 'Fazer login' : 'Registre-se!' }}</span>
        </p>
        <p v-else>
          Gostaria de fazer parte da nossa equipe de professores?
          <span @click="redirectTeatcherToSupport()">Clique aqui!</span>
        </p>
      </div>
    </div>
    <button class="submitButton" @click="sendForm">{{ !isRegister ? 'Login' : 'Registrar' }}</button>
  </div>
</template>
<script setup>
import { useUserStudentStore } from '~/store/user'
const studentStore = useUserStudentStore()
const props = defineProps(["admin"])

const isRegister = ref(false)
const passwordTest = ref(false)
const emailTest = ref(false)
const isTeacher = ref(false)
const seePassword = ref(false)
const message = ref('')
function switchMode(){
  message.value = ''
  isRegister.value = !isRegister.value
}
function getSWitchValue(event){
  isTeacher.value = event.value
  localStorage.setItem("_gtt", isTeacher.value ? "professor" : "aluno")
  emit('get-switch', isTeacher.value)
}
const form = ref({
  name: "",
  email:"",
  birth: "",
  password: "",
  isRegister: isRegister.value
})

async function sendForm(){
  form.value.isRegister = isRegister.value
  if(!props.admin){
    if(isRegister.value){
      if(form.value.name && form.value.email && form.value.birth &&  form.value.password && passwordTest.value && emailTest.value){
        await fetch(`http://127.0.0.1:5000/registro?nome=${form.value.name}&email=${form.value.email}&senha=${form.value.password}&nascimento=${form.value.birth}`, {
          method: 'POST'
        }).then(res=>res.json()).then(res=>{
          if("message" in res){
            message.value = res.message
            emailTest.value = false
          }else{
            localStorage.setItem("_gtk", res.token)
            localStorage.setItem("_gtt", res.target)
            navigateTo('/')
          }
        })
      }else{
        message.value = 'Complete todos os dados!'
      }
    }else{
      if(form.value.email && form.value.password){
        if(isTeacher.value == false){
          await fetch(`http://127.0.0.1:5000/login?opcao=aluno&email=${form.value.email}&senha=${form.value.password}`, {
          method: "POST"
          }).then(res=> res.json()).then(async res=>{
            if(Object.keys(res).includes("message")){
              message.value = res.message
            }else{
              localStorage.setItem("_gtk", res.token)
              localStorage.setItem("_gtt", res.target)
              await studentStore.getUser()
              navigateTo('/')
            }
          })
        }else{
          await fetch(`http://127.0.0.1:5000/login?opcao=professor&email=${form.value.email}&senha=${form.value.password}`, {
          method: "POST"
          }).then(res=> res.json()).then(async res=>{
            if(Object.keys(res).includes("message")){
              message.value = res.message
            }else{
              localStorage.setItem("_gtk", res.token)
              localStorage.setItem("_gtt", res.target)
              await studentStore.getUser()
              navigateTo('/')
            }
          })
        }
      }else{
        message.value = 'Complete todos os dados!'
      }
    }
  }else{
    await fetch(`http://127.0.0.1:5000/login?email=${form.value.email}&senha=${form.value.password}&opcao=admin`, {
      method: 'POST'
    }).then(res=> res.json()).then(async res=>{
      if(Object.keys(res).includes("message")){
        message.value = res.message
      }else{
        localStorage.setItem("_gtk", res.token)
        localStorage.setItem("_gtt", res.target)
        await studentStore.getUser()
        navigateTo('/')
      }
    })
  }
  

}
function checkPassword(){
  if(isRegister){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const check = regex.test(form.value.password)
    passwordTest.value = check ? true : false
  }
}

function checkEmail(){
  if(isRegister){
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const check = regex.test(form.value.email)
    emailTest.value = check ? true : false
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
  @apply w-[90vw] sm:w-96 h-[506px] flex flex-col items-center justify-center p-8  relative
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
  pl-4  rounded-full bg-gray-200/75 border
   h-10 text-black/75 transition-all 
}

.notRegister:has(input:focus){
  @apply border-black
}
.passwordInput > svg{
  @apply mr-4 text-black/50 cursor-pointer
}
.passwordInput > input{
  @apply w-full bg-transparent outline-none 
}
.InputGroup > input{
  @apply pl-4 w-full rounded-full bg-gray-200/75 border outline-none
     h-10 text-black/75 transition-all 
      
}
.InputGroup > input[type=date]{
  @apply px-4
}
.InputGroup > div.optionText { 
  @apply h-max
}
.InputGroup > div.optionText> p{
  @apply text-black
}
.InputGroup > div.optionText> p > span{
  @apply text-[#2f8ca9] cursor-pointer border-b border-transparent 
  hover:border-[#2d9dff]
}
.CardContainer > button.submitButton{
 @apply w-full h-max py-2 rounded-[25px] bg-[#6b70d6] 
 text-white text-xl hover:scale-105 transition-all
}
</style>~/store/user