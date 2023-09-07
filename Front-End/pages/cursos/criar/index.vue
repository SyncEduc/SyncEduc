<template>
    <NuxtLayout name="nav">
        <div class="createCourseContainer">
            <div class="newCourse">
                <input v-model="newCourse.title" type="text" placeholder="Titulo do curso">
                <input v-model="newCourse.banner" type="text" placeholder="Link da imagem do curso">
                <textarea v-model="newCourse.description" placeholder="Descrição do curso"></textarea>
                <div class="newLesson">
                    <input v-model="newLesson.name" type="text" placeholder="Titulo da aula">
                    <input v-model="newLesson.link" type="text" placeholder="Link do video">
                    <button @click="addLesson">Adicionar Aula</button>
                </div>
                <div class="lessonList">
                    <div class="lesson" v-for="lesson in newLessonList" :key="lesson.id">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11.3 20q.15.5.413 1.038t.537.962H5q-.825 0-1.413-.588T3 20V4q0-.825.588-1.413T5 2h12q.825 0 1.413.588T19 4v7.1q-.45-.05-1-.05t-1 .05V4h-5v6.125q0 .3-.25.438t-.5-.013L9.5 9.5l-1.75 1.05q-.25.15-.5.013T7 10.124V4H5v16h6.3Zm6.7 3q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-.475-2.975l2.55-1.6q.25-.15.25-.425t-.25-.425l-2.55-1.6q-.25-.15-.513-.013t-.262.438v3.2q0 .3.263.438t.512-.013ZM7 4h5h-5Zm4.3 0H5h12h-6h.3Z"/></svg>
                        <span>{{ lesson.name }}</span>
                        <button @click="deleteLesson(lesson.id)"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/></svg></button>
                    </div>
                </div>
                <span class="w-full p-2 text-center bg-green-300/50 border border-green-700 text-green-700 rounded-lg font-bold opacity-80" v-if="message.length >=1">{{message}}</span>
                <button @click="addCourse()">Adicionar Curso</button>
            </div>
            <div class="oldCourse">
                <template v-if="listCourses.length >=1" v-for="(item, index) in listCourses" :key="index">
                    <Card @deleteClick="deleteCourse(item.id)" v-if="item.teacherId == userStore.user.id" :showDeleteButton="item.teacherId == userStore.user.id" :img="item.image" :categories="item.categories" :id="item.id">
                        <template #title>{{ item.name }}</template>
                        <template #desc>{{ item.desc }}</template>
                    </Card>
                </template>
            </div>
        </div>
    </NuxtLayout>
</template>
<script setup>
import { useCourseStore } from '~/store/courses';
import { useUserStudentStore } from '~/store/user';
const listCourses = ref([])
const userStore = useUserStudentStore()
const courseStore = useCourseStore()
const message = ref('')
const newLesson = ref({
    name: "",
    link: "",
})
const newCourse = ref({
    title: '',
    banner: '',
    description: ''
})
const newLessonList = ref([])
function addLesson(){
    newLessonList.value.push({
        name: newLesson.value.name,
        link: newLesson.value.link,
        id: Date.now()
    })
}
function deleteLesson(id){
    newLessonList.value = newLessonList.value.filter(lesson=>{
        return lesson.id != id
    })
}

async function addCourse(){
    const token = localStorage.getItem("_gtk")
    await fetch(`http://127.0.0.1:5000/registrarCurso?token=${token}&title=${newCourse.value.title}&banner=${encodeURIComponent(newCourse.value.banner)}&description=${newCourse.value.description}`,{
        method: "POST"
    }).then(res=>res.json()).then(async res=>{
        for(const lesson of newLessonList.value){
            await fetch(`http://127.0.0.1:5000/resgitrarAula?token=${token}&title=${lesson.name}&link=${encodeURIComponent(lesson.link)}&curso=${res.course_info[0]}`, {
                method: "POST"
            })
            continue
        }
    })
    message.value = 'Curso adicionado com sucesso'
    setTimeout(()=>{
        message.value = ''
    },5000)
    await courseStore.fetchCourses()
    listCourses.value = courseStore.courses
}

async function deleteCourse(id){
    const token = localStorage.getItem("_gtk")
    await fetch(`http://127.0.0.1:5000/deletarCurso?token=${token}&id=${id}`, {method:'POST'}).then(res=>res.json()).then(res=>{
        console.log(res)
    })
    await courseStore.fetchCourses()
    listCourses.value = courseStore.courses
}
onMounted(async ()=>{
    await courseStore.fetchCategories()
    await courseStore.fetchCourses()
    await userStore.getUser()
    listCourses.value = courseStore.courses
})
</script>

<style scoped>
.createCourseContainer{
    @apply w-full min-h-screen p-6 pt-20 flex justify-start items-center flex-col gap-12
}
.createCourseContainer > .newCourse{
    @apply w-full max-w-[40rem] h-max 
    flex flex-row flex-wrap gap-6
    rounded-lg border border-black/20 p-4
}
.createCourseContainer > .oldCourse{
    @apply flex flex-row gap-6 flex-wrap
}
.createCourseContainer > .newCourse > input, 
.createCourseContainer > .newCourse > textarea{
    @apply w-full p-2 border border-black/50 rounded-lg outline-none
}

.createCourseContainer > .newCourse > button{
    @apply w-full bg-green-200 border border-green-800 rounded-lg p-2 text-center text-green-800
}
.createCourseContainer > .newCourse > .newLesson{
    @apply w-full p-2 border border-black/20 rounded-lg flex flex-col gap-2 
}
.createCourseContainer > .newCourse > .newLesson > input{
    @apply w-full p-2 border border-black/30 rounded-lg outline-none
}

.createCourseContainer > .newCourse > .newLesson > button{
    @apply w-full bg-green-200 border border-green-800 rounded-lg p-2 text-center text-green-800
}
.createCourseContainer > .newCourse > .lessonList{
    @apply w-full flex flex-col gap-2
}
.createCourseContainer > .newCourse > .lessonList > .lesson{
    @apply w-full flex flex-row gap-2 items-center justify-between px-3
}
.createCourseContainer > .newCourse > .lessonList > .lesson > svg{
    @apply h-6 w-6 text-gray-600
}
.createCourseContainer > .newCourse > .lessonList > .lesson > button{
    @apply w-max h-max rounded p-2 bg-red-200 border border-red-700 text-red-700 
    cursor-pointer transition-all hover:scale-[1.1]
}
.createCourseContainer > .newCourse > .lessonList > .lesson > button > svg{
    @apply w-4 h-4
}
</style>