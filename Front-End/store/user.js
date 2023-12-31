import { defineStore } from "pinia";
export const useUserStudentStore = defineStore({
  id: 'userStudentStore',
  state: () => {
    return {
      user: {},
    }
  },
  actions: {
    async getUser(){
      const type = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/usuario?tipo=${type}&token=${localStorage.getItem("_gtk")}`,
      {method: "POST"}
      ).then(res=>res.json()).then(res=>{
        this.user = res
      })
    }
  },
  getters: {

  }
})