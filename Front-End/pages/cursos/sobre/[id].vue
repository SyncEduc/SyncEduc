<template>
  <NuxtLayout name="nav">
    <section class="detailsContainer">
      <div>
        <div class="leftAboutCourse">
          <div class="self-start">
            <BackButton @click-action="backRoute"/>
          </div>
          <img :src="selectedCourse.image" :alt="selectedCourse.name">
          <img :src="selectedCourse.image" alt="" class="background">
        <!-- <div>
          <span>Avaliações:</span>
          <svg v-for="star in selectedCourse.stars" :key="star" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
            viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z" />
          </svg>
        </div> -->
        <div>
          <img :src="selectedCourse.teacher.image || ''">
          <div class="aboutTeacher">
            <span class="flex flex-row gap-2">
              <p>{{ selectedCourse.teacher.name}}</p>
              <div class="w-max p-1 font-bold rounded-full text-white flex flex-row items-center gap-2 text-xs bg-[#858bfdff]">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"/></svg>
                <span>Professor(a)</span>
              </div>
            </span>
            <p>{{ selectedCourse.teacher.desc || 'Sem Descrição' }}</p>
          </div>
        </div>
      </div>
      <div class="rightContent">
        <h1>{{ selectedCourse.name }}</h1>
        <p>{{ selectedCourse.desc }}</p>
        <div class="categories">
          <div v-for="(category, index) in selectedCourse.categories" :key="index">{{ category.name }}</div>
        </div>
        <button @click="navigateTo(`/cursos/${selectedCourse.id}?aula=1`)">Inscreva-se! </button>
      </div>
      </div>
    </section>
  </NuxtLayout>
</template>
<script setup>
import { useTeachersStore } from '~/store/teachers';
import { useCourseStore } from '../../../store/courses'
const teacherStore = useTeachersStore()
const courseStore = useCourseStore()
const route = useRoute()
const backRoute = ()=> navigateTo('/cursos')
const selectedCourse = ref({
  name: '',
  desc: '',
  image: '',
  id: 1,
  stars: 4,
  teacherId: 0,
  teacher: {
    name: '',
    desc: '',
    image: '',
    stars: 3
  },
  categories: []
})
definePageMeta({
  middleware: ['03-class']
})
onMounted(async () => {
  await courseStore.fetchCourses()
  await teacherStore.fetchTeachers()
  const findCourse = courseStore.getCoursesList.find(c=> c.id == route.params.id)
  if(courseStore.getCoursesList.length >=1 && findCourse){
    selectedCourse.value = findCourse
    selectedCourse.value.teacher = teacherStore.teachers.find(t=>{
      return selectedCourse.value.teacherId == t.id
    })
  }else{
    courseStore.fetchCourses()
    if(courseStore.getCoursesList.find(c=> c.id == route.params.id)){
      selectedCourse.value = courseStore.getCoursesList.find(c=> c.id == route.params.id)
    }else{
      navigateTo('/cursos')
    }
  }
})
</script>


<style scoped>
* {
  font-family: 'JetBrains Mono', monospace;
}
.detailsContainer{
  background-image: url('../../../assets/images/detailsBackground.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.detailsContainer >div{
  @apply w-full h-max min-h-screen pt-24 p-8 flex flex-col lg:flex-row items-start justify-between gap-12 backdrop-blur
}

.detailsContainer>div>div>img {
  @apply w-full rounded-xl
}
.detailsContainer >div >div >.background{
  @apply absolute -z-20 blur-xl scale-95 opacity-75 top-10
}

.detailsContainer>div>div {
  @apply flex flex-col gap-4 h-max items-center justify-between rounded w-full lg:w-2/4 relative
}

.rightContent{
  @apply pt-10
}
.detailsContainer>div>div>div{
  @apply w-full
}

.detailsContainer>div>div>div>span {
  @apply text-xl
}
.detailsContainer>div > div >div >div.aboutTeacher{
  @apply flex-1
}
.detailsContainer>div > div >div >div >span{
  @apply text-xl font-bold
}
.detailsContainer>div > div >div >div >p{
  @apply text-black/75
}

.detailsContainer>div>div>div>img {
  @apply h-16 w-16 rounded-full border border-black
}

.detailsContainer>div>div>div>div>div {
  @apply flex flex-row gap-2
}

.detailsContainer>div:first-child {
  @apply items-start
}

.detailsContainer>div>div>h1 {
  @apply text-2xl font-bold
}

.detailsContainer>div>div>p {
  @apply text-xl text-black/75
}

.detailsContainer>div>div>div>div>div>svg {
  @apply text-yellow-500 h-6 w-6
}

.detailsContainer>div>div>div {
  @apply flex flex-row flex-wrap gap-2
}

.detailsContainer>div>div>div>svg {
  @apply text-yellow-400
}

.detailsContainer>div>div>div>svg>path {
  @apply shadow border border-black
}

.detailsContainer>div>div>div.categories>div {
  @apply p-2 rounded-full border border-[#858bfd] text-xs text-[#4e52a8] bg-[#eeeeff]
}

.detailsContainer>div>div>button {
  @apply w-full p-2 rounded-full bg-[#50efbc] border border-[#40c097] text-[#2a705a] hover:scale-105 transition-all shadow-lg text-xl
}</style>