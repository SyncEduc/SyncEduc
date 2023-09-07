import { defineStore } from "pinia";

export const useCourseStore = defineStore({
  id: 'courses',
  state: () => {
    return {
      courses: [],
      categories: [],
      lessons: []
    }
  },

  getters: {
    getCoursesList: (state) => state.courses,
    getCategoriesList: (state)=> state.categories,
  },

  actions: {
    async fetchCategories(){
      await fetch(`http://127.0.0.1:5000/categorias`).then(res=>res.json()).then(res=>{
        this.categories = res.categories.map(category=>{
          return{
            id: category[0],
            name: category[1]
          }
        })
      })
    },
    async fetchCourses() {
      await fetch("http://127.0.0.1:5000/cursos").then(res=>res.json()).then(res=>{
        this.courses = res.cursos.map(c=>{
          const category = this.categories.find(category=> category.id == c[2])
          return {
            id: c[0],
            teacherId: c[1],
            name: c[3],
            image: c[4],
            desc: c[5],
            categories: [category]
          }
        })
      })
    },
    async fetchLessons(){
      await fetch("http://127.0.0.1:5000/aulas").then(res=>res.json()).then(res=>{
        this.lessons = res.aulas.map(l=>{
          return {
            id: l[0],
            course_id: l[1],
            title: l[2],
            videoSource: l[3] 
          }
        })
      })
    },
    getLessonByCourse(payload){
      return this.lessons.filter(l=>l.course_id == payload)
    }
  }
})