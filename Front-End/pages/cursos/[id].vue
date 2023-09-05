<template>
  <NuxtLayout name="nav">
    <div class="courseContainer">
      <section class="video realtive">
        <iframe v-if="renderComponent" :src="currentCourse.lessons[currentLesson].videoSource" class="rounded-xl" width="100%" height="520" title="If I Had a Heart - Tal Barr" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </section>
      <section class="aboutLesson">
        <div class="lessonInfos">
          <div class="title">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4H5Z"/></svg>
            </div>
            <span v-if="renderComponent">{{currentCourse.lessons[currentLesson].title}}</span>
          </div>
          <div class="number">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 15v-4.5H4V9h3v6H5.5ZM9 15v-2.5q0-.425.288-.713T10 11.5h2v-1H9V9h3.5q.425 0 .713.288T13.5 10v1.5q0 .425-.288.713t-.712.287h-2v1h3V15H9Zm6 0v-1.5h3v-1h-2v-1h2v-1h-3V9h3.5q.425 0 .713.288T19.5 10v4q0 .425-.288.713T18.5 15H15Z"/></svg>
            </div>
            <span>Aula N° {{ $route.query.aula }}</span>
          </div>
          <div class="check">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
            </div>
            <span>Marcar como completa</span>
          </div>
          <div class="skip" :class="{'justify-end': $route.query.aula <=1, 'justify-between': $route.query.aula >=2}">
            
            <button v-if="$route.query.aula >=2" @click="redirectUser().down()">
              <svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 18q-.425 0-.713-.288T16.5 17V7q0-.425.288-.713T17.5 6q.425 0 .713.288T18.5 7v10q0 .425-.288.713T17.5 18ZM7.05 16.975q-.5.35-1.025.05t-.525-.9v-8.25q0-.6.525-.9t1.025.05l6.2 4.15q.45.3.45.825t-.45.825l-6.2 4.15ZM7.5 12Zm0 2.25L10.9 12L7.5 9.75v4.5Z"/></svg>
              <span>Aula - {{ $route.query.aula - 1 }}</span>
            </button>

            <button v-if="$route.query.aula < currentCourse.lessons.length" @click="redirectUser().up()">
              <span>Aula - {{ parseInt($route.query.aula) + 1}}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 18q-.425 0-.713-.288T16.5 17V7q0-.425.288-.713T17.5 6q.425 0 .713.288T18.5 7v10q0 .425-.288.713T17.5 18ZM7.05 16.975q-.5.35-1.025.05t-.525-.9v-8.25q0-.6.525-.9t1.025.05l6.2 4.15q.45.3.45.825t-.45.825l-6.2 4.15ZM7.5 12Zm0 2.25L10.9 12L7.5 9.75v4.5Z"/></svg>
            </button>
          </div>
        </div>
      </section>
      <section class="commentsContainer">
        <div class="newComment">
          <div class="avatar">
            <img :src="userStore.user.avatar_url" />
          </div>
          <div class="comment">
            <h1>{{ userStore.user.nome }}</h1>
            <div class="commentForm">
              <textarea maxlength="300" class="textComment" placeholder="Seu Comentário" v-model="newComment"></textarea>
              <button class="submit" @click="sendComment">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2.5"
                    d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.465c-1.415.67-3.017-.472-2.844-2.028L5 12Zm0 0h7" />
                </svg>
              </button>
            </div>
            <span class="charCount">Limite de caracteres: {{ charLimit }}</span>
          </div>
        </div>
        <div class="oldComments">
          <template v-for="comment in commentsStore.getCourseComments" :key="comment.comment_id">
            <div class="comment">
              <div class="avatar">
                <img :src="comment.image">
              </div>
              <div class="commentContent">
                <h1>{{ comment.name }}</h1>
                <div v-if="comment.user_id == currentCourse.teacherId" class="w-max p-1 font-bold rounded-full text-white flex flex-row items-center gap-2 text-xs bg-[#858bfdff]">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"/></svg>
                  <span>Professor(a)</span>
                </div>
                <p>{{ comment.message }}</p>
                <p class="responseClick" @click="openReply(comment)" >Responder {{ comment.name }}</p>
                <div class="comment" v-if="comment.comment_id == replyClick.id">
                  <div class="commentForm">
                    <textarea maxlength="300" class="textComment" placeholder="Seu Comentário"
                      v-model="newResponse"></textarea>
                    <button class="submit" @click="sendResponse(comment.comment_id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2.5"
                          d="m5 12l-.604-5.437C4.223 5.007 5.825 3.864 7.24 4.535l11.944 5.658c1.525.722 1.525 2.892 0 3.614L7.24 19.465c-1.415.67-3.017-.472-2.844-2.028L5 12Zm0 0h7" />
                      </svg>
                    </button>
                  </div>
                  <span class="charCount">Limite de caracteres: {{ charLimitResponse }}</span>
                </div>
                <div class="responseContainer">
                  <template v-for="response in comment.responses" :key="response.comment_id">
                    <div class="response">
                      <div class="avatar">
                        <img :src="response.image">
                      </div>
                      <div class="commentContent">
                        <h1>{{ response.name }}</h1>
                        <p class="userResponse">Respondeu: {{ comment.name }}</p>
                        <p>{{ response.message }}</p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useCourseCommentsStore } from '~/store/courseComments'
import { useCourseStore } from '~/store/courses'
import { useUserStudentStore } from '~/store/user';

const commentsStore = useCourseCommentsStore()
const courseStore = useCourseStore()
const userStore = useUserStudentStore()
const route = useRoute()
const currentLesson = ref(1)
const currentCourse = ref({
  lessons: [
    {
      title: '',
      videoSource: 'awdawd'
    }
  ]
})

function redirectUser(){
  return {
    up(){
      navigateTo(route.path + '?aula=' + (parseInt(route.query.aula) +1))
    },
    down(){
      navigateTo(route.path + '?aula=' + (parseInt(route.query.aula) -1))
    }
  }
}



definePageMeta({
  middleware:["02-auth"]
})

const replyClick = ref({})
const newComment = ref('')
const newResponse = ref('')
const charLimitResponse = ref(300)
const charLimit = ref(300)
const renderComponent = ref(false)

function openReply(comment){
  
  if(Object.keys(replyClick.value).length <=0){
    replyClick.value = {
      id: comment.comment_id,
    }
  }else{
    if(replyClick.value.id == comment.comment_id){
      replyClick.value = { }
    }else{
      replyClick.value = {
        id: comment.comment_id,
      }
    }
  }
 

}

async function sendComment(){
  commentsStore.addComments(currentCourse.value.id,newComment.value)
  commentsStore.fetchComments(currentCourse.value.id)
}
async function sendResponse(comment_id){
  commentsStore.addResponse({target: comment_id, message: newResponse})
  commentsStore.fetchComments(currentCourse.value.id)
}
async function updateCurentLesson(){
  currentLesson.value = route.query.aula -1
}
onUpdated(()=>{
  updateCurentLesson()
})
onMounted(async () => {
  await courseStore.fetchCourses()
  await courseStore.fetchLessons()
  if(!(parseInt(route.query.aula) <= currentCourse.value.lessons.length)){
    return navigateTo(`/cursos/${route.params.id}?aula=1`)
  }
  currentCourse.value = courseStore.getCoursesList.find(c=> c.id == route.params.id)
  renderComponent.value = true
  currentCourse.value.lessons = courseStore.getLessonByCourse(currentCourse.value.id)
  updateCurentLesson()
  commentsStore.fetchComments(currentCourse.value.id)
})
watch(newComment, () => {
  charLimit.value = 300 - newComment.value.length
})
watch(newResponse, () => {
  charLimitResponse.value = 300 - newResponse.value.length
})
</script>
<style scoped>
.courseContainer {
  @apply w-full min-h-screen flex flex-col gap-8
}
.courseContainer>section {
  @apply w-full min-h-[50vh] p-2
}
.courseContainer>section.video {
  @apply pt-24
}
.courseContainer > section.aboutLesson{
  @apply flex flex-col gap-2 min-h-max h-max p-2
}
.courseContainer > section.aboutLesson > div.buttons{
  @apply w-full flex flex-row gap-0 items-center justify-between 
}
.courseContainer > section.aboutLesson > div.buttons > button{
  @apply p-2 border-2 border-black rounded-xl
}
.courseContainer > section.aboutLesson > div.lessonInfos{
  @apply p-2 rounded-xl border border-black flex flex-row gap-2 items-center justify-between flex-wrap
}
.courseContainer > section.aboutLesson > div.lessonInfos > div{
  @apply flex flex-row gap-2 w-max h-max p-2 text-sm font-bold max-w-[30rem]
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.title{
  @apply text-lg
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.title>div{
  @apply bg-[#858bfdff] p-2 text-[#22234b] rounded-xl opacity-75 border-2 border-[#22234b] h-max 
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.number{
  @apply text-lg justify-end items-start
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.number>div{
  @apply bg-[#50efbcff] p-2 text-[#0a3d2d] rounded-xl opacity-75 border-2 border-[#1e5e4a] h-max 
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.check{
  @apply w-full min-w-full items-center
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.check>div{
  @apply text-[#50efbcff] rounded-full bg-[#0a3d2d] p-0 opacity-75 h-max cursor-pointer
}
.courseContainer > section.aboutLesson > div.lessonInfos > div.skip{
  @apply min-w-full flex flex-row items-center gap-2 flex-wrap 
}
.courseContainer >section.aboutLesson > div.lessonInfos > div.skip > button{
  @apply flex flex-row border-b border-transparent hover:border-black gap-2 items-center justify-center
}
.courseContainer>section.commentsContainer {
  @apply flex flex-col gap-16
}

.courseContainer>section.commentsContainer>div.newComment {
  @apply w-full h-max flex flex-row gap-4 p-2 border-b border-black/50 pb-6
}

.courseContainer>section.commentsContainer>div.newComment>div.avatar {
  @apply min-w-[6rem] w-24 h-max p-2 hidden sm:flex
}

.courseContainer>section.commentsContainer>div.newComment>div.avatar>img {
  @apply rounded-full border border-black
}

.courseContainer>section.commentsContainer>div.newComment>div.comment {
  @apply w-full flex flex-col gap-2
}

.courseContainer>section.commentsContainer>div.newComment>div.comment>h1 {
  @apply text-xl font-semibold
}

.courseContainer>section.commentsContainer>div.newComment>div.comment>div.commentForm {
  @apply w-full flex flex-row gap-2
}

.courseContainer>section.commentsContainer>div.newComment>div.comment>div.commentForm>textarea.textComment {
  @apply h-24 flex-1 border border-black rounded-lg p-2 outline-none resize-none
}

.courseContainer>section.commentsContainer>div.newComment>div.comment>div.commentForm>button.submit {
  @apply px-4 text-lg text-[#858bfdff] rounded-xl transition-all hover:px-6
}

.courseContainer>section.commentsContainer>div.newComment>div.comment>span.charCount {
  @apply text-sm text-black/75
}

.courseContainer>section.commentsContainer>div.oldComments {
  @apply flex flex-col gap-4
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment {
  @apply flex flex-row gap-2
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.avatar {
  @apply min-w-[6rem] w-24 h-max p-2
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.avatar>img {
  @apply rounded-full border border-black
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent {
  @apply flex-1 flex flex-col gap-2
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>h1 {
  @apply text-xl font-semibold
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>p {
  line-break: anywhere;
  @apply text-black/75 text-ellipsis overflow-hidden
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>p.responseClick {
  @apply w-max text-xs border-b-2 transition-all cursor-pointer border-black/50 hover:text-black hover:font-bold
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent > div.comment{
  @apply flex flex-col gap-2 w-full -translate-x-14
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent > div.comment > div.commentForm{
  @apply flex flex-row gap-2 w-full
}
.courseContainer>section.commentsContainer>div.oldComments>div.comment>
div.commentContent > div.comment > div.commentForm textarea.textComment{
  @apply h-24 flex-1 border border-black rounded-lg p-2 outline-none resize-none
}
.courseContainer>section.commentsContainer>div.oldComments>div.comment>
div.commentContent > div.comment > div.commentForm button.submit{
  @apply px-4 text-lg text-[#858bfdff] rounded-xl transition-all hover:px-6
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>div.responsesContainer {
  width: calc(100% - 56px);
  @apply flex flex-col -translate-x-14 
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>div.responseContainer>div.response {
  @apply p-2 border-l-2 border-black/50 flex flex-row gap-4 -translate-x-14
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>div.responseContainer>div.response>div.avatar {
  @apply min-w-[6rem] w-24 h-max p-2
}

.courseContainer>section.commentsContainer>div.oldComments>div.comment>div.commentContent>div.responseContainer>div.response>div.avatar>img {
  @apply rounded-full border border-black
}

div.comment>div.commentContent>div.responseContainer>div.response>div.commentContent {
  @apply flex-1 flex flex-col gap-2
}

div.comment>div.commentContent>div.responseContainer>div.response>div.commentContent>p.userResponse {
  @apply text-sm text-black/50 -mt-2
}

div.comment>div.commentContent>div.responseContainer>div.response>div.commentContent>p {
  line-break: anywhere;
  @apply text-black/75
}</style>