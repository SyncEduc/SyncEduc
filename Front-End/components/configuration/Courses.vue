<template>
    <div class="coursesContainer">
        <template v-if="listCourses.length >=1" v-for="(item, index) in listCourses" :key="index">
            <Card :img="item.image" :categories="item.categories" :id="item.id">
                <template #title>{{ item.name }}</template>
                <template #desc>{{ item.desc }}</template>
            </Card>
        </template>
    </div>
</template>

<script setup>
import { useCourseStore } from '~/store/courses';
import { useUserStudentStore } from '~/store/user';
const courseStore = useCourseStore()
const userStore = useUserStudentStore()
const listCourses = ref([])

onMounted(async()=>{
    await courseStore.fetchCategories()
    await courseStore.fetchCourses()
    await fetch(`http://127.0.0.1:5000/cursoPorAluno?user=${userStore.user.id}`).then(res=>res.json()).then(res=>{
        for(const course of courseStore.courses){
            for(const insc of res.students){
                if(course.id == insc[1]){
                    listCourses.value.push(course)
                }
            }
        }
    })
    

})


</script>


<style scoped>
.coursesContainer{
    @apply w-full h-max flex flex-row flex-wrap gap-6 items-center justify-center pt-12
}
</style>