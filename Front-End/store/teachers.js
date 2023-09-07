import { defineStore } from "pinia";

export const useTeachersStore = defineStore({
  id: 'Teachers',
  state: () => {
    return {
      teachers: [],
      categories: []
    }
  },

  getters: {
    getTeachersList: (state) => state.teachers,
    getCategoriesList: (state) => state.categories
  },

  actions: {
    async fetchCategories() {
      await fetch('http://127.0.0.1:5000/categorias').then(res=>res.json()).then(res=>[
        this.categories = res.categories.map(category=>{
          return{
            id: category[0],
            name: category[1]
          }
        })
      ])
    },
    async fetchTeachers() {
      await this.fetchCategories()
      await fetch('http://127.0.0.1:5000/professores').then(res=>res.json()).then(async res=>{
        this.teachers = res.teachers.map(t=>{
          const category = this.categories.find(c=>{
            return c.id == parseInt(t[4])
          })
          return {
            id: t[0],
            name: t[1],
            desc: t[5],
            image: t[6],
            categories: [
              category
            ]
          }
        })
      })
    
    }
  }
})