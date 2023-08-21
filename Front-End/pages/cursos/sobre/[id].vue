<template>
  <NuxtLayout name="nav">
    <section class="detailsContainer">
      <div>
        <div class="leftAboutCourse">
          <div class="self-start">
            <BackButton @click-action="navigateTo('/cursos')"/>
          </div>
          <img :src="selectedCourse.image" :alt="selectedCourse.name">
          <img :src="selectedCourse.image" alt="" class="background">
        <div>
          <span>Avaliações:</span>
          <svg v-for="star in selectedCourse.stars" :key="star" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
            viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z" />
          </svg>
        </div>
        <div>
          <img :src="selectedCourse.teacher.image">
          <div class="aboutTeacher">
            <span>{{ selectedCourse.teacher.name }}</span>
            <p>{{ selectedCourse.teacher.desc }}</p>
            <div>
              <svg v-for="star in selectedCourse.teacher.stars" :key="star" xmlns="http://www.w3.org/2000/svg" width="32"
                height="32" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="m12 8.89l.94 3.11h2.82l-2.27 1.62l.93 3.01L12 14.79l-2.42 1.84l.93-3.01L8.24 12h2.82L12 8.89M12 2l-2.42 8H2l6.17 4.41L5.83 22L12 17.31L18.18 22l-2.35-7.59L22 10h-7.58L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="rightContent">
        <h1>{{ selectedCourse.name }}</h1>
        <p>{{ selectedCourse.desc }}</p>
        <div class="categories">
          <div v-for="(category, index) in selectedCourse.categories" :key="index">{{ category.name }}</div>
        </div>
        <button>Inscrever-se</button>
      </div>
      </div>
    </section>
  </NuxtLayout>
</template>
<script setup>
import { useCourseStore } from '../../../store/courses'
const courseStore = useCourseStore()
const route = useRoute()
const selectedCourse = ref({
  name: '',
  desc: '',
  image: '',
  id: 1,
  stars: 4,
  teacher: {
    name: '',
    desc: '',
    image: '',
    stars: 3
  },
  categories: []
},)
onMounted(() => {
  const findCourse = courseStore.getCoursesList.find(c=> c.id == route.params.id)
  console.log(findCourse)
  if(courseStore.getCoursesList.length >=1 && findCourse){
    selectedCourse.value = findCourse
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