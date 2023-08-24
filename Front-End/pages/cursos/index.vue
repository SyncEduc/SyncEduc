<template>
  <NuxtLayout name="nav">
    <div class="coursesContainer">
      <section class="section_1">
      </section>
      <section class="section_2">
        <div class="header">
          <h1>Nossos Cursos:</h1>
          <div>
            <span>Filtrar:</span>
            <Dropdown :list="listCategories" v-on:get-select="(event) => categorySelected = event">{{ categorySelected.name
            }}</Dropdown>
          </div>
        </div>
        <div class="courses">
          <template v-for="item in listCourses" :key="item.id">
            <Card :img="item.image" :categories="item.categories" :id="item.id"
              v-if="item.categories.filter(c => c.id == categorySelected.id).length >= 1">
              <template #title>{{ item.name }}</template>
              <template #desc>{{ item.desc }}</template>
            </Card>
          </template>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useCourseStore } from "../../store/courses"
const courseStore = useCourseStore()
const categorySelected = ref({})
const listCategories = ref([])
const listCourses = ref([])

onMounted(() => {
  courseStore.fetchCategories()
  courseStore.fetchCourses()
  categorySelected.value = courseStore.getCategoriesList[0]
  listCategories.value = courseStore.getCategoriesList
  listCourses.value = courseStore.getCoursesList
})

</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace;
}
.coursesContainer {
  @apply w-full min-h-screen flex flex-col
}

.coursesContainer>section {
  @apply w-full min-h-[100vh]
}

.coursesContainer>section.section_1 {
  background-image: url('../../assets/images/coursesBackground.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


.coursesContainer>section.section_2 {
  @apply min-h-[100vh] w-full flex flex-col gap-12 p-8
}

.coursesContainer>section.section_2>div.header {
  @apply flex flex-row gap-2 items-center justify-between flex-wrap
}

.coursesContainer>section.section_2>div.header>h1 {
  @apply text-3xl font-bold
}

.coursesContainer>section.section_2>div.header>div {
  @apply flex flex-row gap-2 items-center justify-center
}

.coursesContainer>section.section_2>div.header>div>span {
  @apply text-2xl
}

.coursesContainer>section.section_2>div.courses {
  @apply flex flex-wrap gap-8 justify-center items-stretch
}

</style>