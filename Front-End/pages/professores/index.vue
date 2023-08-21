<template>
  <NuxtLayout name="nav">
    <div class="knowTeacherContainer">
      <section class="section_1"></section>
      <section class="knowTeacher">
        <h1>Nossos professores: </h1>
        <div class="teachersList">
          <template v-for="category in teacherStore.getCategoriesList" :key="category.id">
            <div class="category" v-if="checkTeacherInCategory(category)">
              <h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 4h6v6h-6zM4 14h6v6H4zm10 3a3 3 0 1 0 6 0a3 3 0 1 0-6 0M4 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                </svg>
                <strong>{{category.name}}</strong>
              </h1>
              <div class="teachersContainer">
                <template v-for="(teacher, index) in teacherStore.getTeachersList" :key="index">
                  <div v-if="teacher.categories.filter(c=>c.id==category.id).length >=1" class="teacherAbout">
                    <div class="avatar">
                      <img :src="teacher.image">
                    </div>
                    <div>
                      <h1>{{ teacher.name }}</h1>
                      <p>{{ teacher.desc }}</p>
                      <div class="teacherCategories">
                        <template v-for="category in teacher.categories" :key="category.id">
                          <div class="teacherCategory">{{ category.name }}</div>
                        </template>
                      </div>
                      <div class="stars">
                        <template v-for="star in teacher.stars" :key="star">
                          <svg class="text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                              d="m14.43 10l-1.47-4.84c-.29-.95-1.63-.95-1.91 0L9.57 10H5.12c-.97 0-1.37 1.25-.58 1.81l3.64 2.6l-1.43 4.61c-.29.93.79 1.68 1.56 1.09l3.69-2.8l3.69 2.81c.77.59 1.85-.16 1.56-1.09l-1.43-4.61l3.64-2.6c.79-.57.39-1.81-.58-1.81h-4.45z" />
                          </svg>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useTeachersStore } from '../../store/teachers'
const teacherStore = useTeachersStore()
function checkTeacherInCategory(category){
  let result = false
  teacherStore.getTeachersList.forEach(teacher=>{
    if(teacher.categories.filter(c=>c.id==category.id).length >=1){
      result = true
    }
  })
  return result
}
onMounted(() => {
  teacherStore.fetchCategories()
  teacherStore.fetchTeachers()
})
</script>

<style scoped>
.knowTeacherContainer {
  @apply w-full min-h-screen flex flex-col
}

.knowTeacherContainer>section {
  @apply w-full min-h-[100vh]
}

.knowTeacherContainer>section.section_1 {
  background-image: url('../../assets/images/knowTeacherBackground.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.knowTeacherContainer>section.knowTeacher {
  @apply p-4 flex flex-col gap-12
}

.knowTeacherContainer>section.knowTeacher>h1 {
  @apply text-3xl
}

.knowTeacherContainer>section.knowTeacher>div.teachersList {
  @apply w-full h-max flex flex-row flex-wrap gap-8 justify-center
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category {
  @apply p-2 border border-black/25 rounded-xl shadow-lg flex flex-col gap-2 w-[40rem]
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>h1 {
  @apply flex items-center justify-center gap-2 text-xl
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer {
  @apply flex flex-row flex-wrap gap-2
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout {
  @apply flex flex-row gap-3 border border-black/10 rounded-xl p-2
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>img {
  @apply rounded-full border border-black/25
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div {
  @apply flex flex-col gap-2
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div.avatar {
  @apply p-2 w-52 h-full flex items-center justify-center
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>h1 {
  @apply text-xl font-bold
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>p {
  @apply text-sm text-black/75
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>div.teacherCategories {
  @apply w-full flex flex-row flex-wrap gap-2
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>div.teacherCategories>div.teacherCategory {
  @apply p-2 rounded-full border border-[#858bfd] text-xs text-[#4e52a8] bg-[#eeeeff]
}

.knowTeacherContainer>section.knowTeacher>div.teachersList>div.category>div.teachersContainer>div.teacherAbout>div>div.stars {
  @apply w-full flex flex-row gap-2
}</style>