<template>
  <div class="adminContainer">
    <LoginCard @get-data="getData" :admin="true"/>
  </div>
</template>
<script setup>
onMounted(()=>{
  localStorage.setItem("_gtt", "admin")
})
</script>
<style scoped>
.adminContainer{
    position: absolute;
    background-image: url('../../assets/images/adminBackground.webp');
    background-size: cover;
    background-repeat: no-repeat;
  @apply w-full min-h-screen flex flex-col gap-4 items-center 
    justify-center sm:items-start p-4 sm:p-8
}
</style>