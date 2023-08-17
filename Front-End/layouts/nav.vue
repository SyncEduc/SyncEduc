<template>
  <div class="NavContainer">
    <Nav>
      <div class="SeparatorContainer">
          <div>SyncEduc</div>
          <div>
            <NavItem>Sobre</NavItem>
            <NavItem>Cursos</NavItem>
            <NavItem>Conheça os professores</NavItem>
            <NavItem @click-action="redirect('/login')">Login/Registro</NavItem>
          </div>
      </div>
    </Nav>
    <slot/>
  </div>
</template>
<script setup>
function redirect(route){
  navigateTo(route)
}

</script>
<style scoped>
div.NavContainter{
  @apply w-full min-h-screen 
}
div.SeparatorContainer{
  @apply w-full h-full flex flex-row items-center justify-between
}
div.SeparatorContainer > div{
  @apply flex flex-row gap-6
}

</style>