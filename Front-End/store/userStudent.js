import { defineStore } from "pinia";
export const useUserStudentStore = defineStore({
  id: 'userStudentStore',
  state: () => {
    return {
      user: {},
    }
  },
  actions: {
    async registerUserStudent(body) {
      const { data } = await useFetch('https://reqres.in/api/register', {
        onRequest({ options }) {
          options.method = 'POST',
          options.body = body
        },
        onRequestError({error}){
          console.error(error)
        },
        onResponse({response}){
          return response
        }
      })
      this.user = data._value
      useCookie("_gtk").value = encodeURIComponent(this.user.token)
    },
    async getUser(){
      await fetch("https://randomuser.me/api").then(res=>res.json()).then(res=>{
        this.user = res.results[0]
        this.user.description = `🔗 https://luisdavi.vercel.app 👨‍💻 Desenvolvedor Front-end 🔎 Moderador na dev.to 📝 Escritor na dev.to`
      })
    }
  },
  getters: {

  }
})