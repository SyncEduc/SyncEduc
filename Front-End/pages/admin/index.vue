<template>
  <div class="adminContainer">
    <BackButton route-back="/login"/>
    <LoginCard/>
  </div>
</template>
<script setup>

</script>
<style scoped>
.adminContainer{
    position: absolute;
    background-image: url('../../assets/images/adminBackground.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  @apply w-full min-h-screen flex flex-col gap-4 items-center 
    justify-center sm:items-start p-4 sm:p-8
}
</style>