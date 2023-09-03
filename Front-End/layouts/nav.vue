<template>
  <div class="NavContainer">
    <Nav>
      <div class="SeparatorContainer">
          <div>
            <img src="../assets/images/HorizontalLogo.webp" class="w-[120px] h-[56px]"/>
          </div>
          <div class="NavPcResolution">
            <NavItem @click-action="redirect('/')">Inicio</NavItem>
            <NavItem @click-action="redirect('/cursos')">Cursos</NavItem>
            <NavItem @click-action="redirect('/professores')">Conheça os professores</NavItem>
            <NavItem v-if="!loginStore.isLogged" @click-action="redirect('/login')">Login/Registro</NavItem>
            <NavItem v-else>
              <img @click="navigateTo('/config/user')" class="h-6 w-6 rounded-full border border-black/50 p-[0.5px] hover:scale-[1.1] transition-all" :src="studentStore.user.avatar_url == null ? 'https://i.imgur.com/MB58STs.png': studentStore.user.avatar_url">
            </NavItem>
          </div>
          <div class="menuButton" v-if="windowWidth < 1024">
            <NavItem @click-action="drawerStore.updateActiveState">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </NavItem>
          </div>
          <div class="drawer" v-if="drawerStore.getActiveState">
            <NavItem @click-action="drawerStore.updateActiveState">
              <div class="flex flex-row gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>fechar</span>
              </div>
            </NavItem>
            <NavItem v-if="!loginStore.isLogged" @click-action="redirect('/login')">Login/Registro</NavItem>
            <NavItem @click-action="redirect('/cursos')">Cursos</NavItem>
            <NavItem @click-action="redirect('/professores')">Conheça os professores</NavItem>
            <NavItem @click-action="redirect('/')">Inicio</NavItem>
          </div>
      </div>
    </Nav>
    <slot/>
    <AuthCookie></AuthCookie>
  </div>
</template>
<script setup>
import AuthCookie from '~/components/authCookie.vue';
import {useDrawerStore} from '../store/drawer'
import { useLoginStore } from '~/store/login';
import { useUserStudentStore } from '~/store/userStudent';
const studentStore = useUserStudentStore()
const loginStore = useLoginStore()
const drawerStore = useDrawerStore()
function redirect(route){
  navigateTo(route)
}

const windowWidth = ref(0)
onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', ()=>{
      windowWidth.value = window.innerWidth
    })
})
</script>
<style scoped>
@keyframes drawer {
  from{
    transform: translateX(100vw);
  }to{
    transform: translateX(0);
  }
  
}
* {
    font-family: 'JetBrains Mono', monospace;
}
div.NavContainter{
  @apply w-full min-h-screen relative flex items-center justify-center
}
div.SeparatorContainer{
  @apply w-full h-full flex flex-row items-center justify-between
}
div.SeparatorContainer > div{
  @apply flex flex-row gap-6
}

div.SeparatorContainer > div.NavPcResolution{
  @apply hidden lg:flex
}
@media (min-width: 1024px) {
  .menuButton{
    display: none;
  }
}
div.SeparatorContainer > div.drawer{
  animation: drawer 300ms linear;
  @apply flex flex-col gap-16 items-center justify-start
  w-72 h-screen fixed top-0 
  p-4 
  right-0 z-50
  bg-white shadow-lg
}

</style>