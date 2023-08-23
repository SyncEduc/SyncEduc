import { useUserStudentStore } from "~/store/userStudent"
export default defineNuxtRouteMiddleware(async(to, from)=>{
  const userStudentStore = useUserStudentStore()
  console.log('')
})