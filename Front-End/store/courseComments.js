import { defineStore } from "pinia";

export const useCourseCommentsStore = defineStore({
  id: 'courseComments',
  state: () => {
    return {
      comments: []
    }
  },

  getters: {
    getCourseComments: state => state.comments
  },

  actions: {
    async fetchComments(id) {
      this.comments = []
      const token = localStorage.getItem("_gtk")
      const target = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/comentarios?token=${token}&target=${target}&id=${id}`, {
        method: "GET"
      }).then(res=>res.json()).then(async res=>{
        for(const comment of res.comments){
          await fetch(`http://127.0.0.1:5000/user?token=${token}&target=${target}&type=${comment[3]}&id=${comment[2]}`)
          .then(resp=>resp.json()).then(resp=>{
            this.comments.push({
              user_id: comment[2],
              comment_id: comment[0],
              name: resp.name,
              message: comment[4],
              image: resp.avatar_url,
              responses: []
            })
          })
        }
      })
    },
    async addComments(course_id, payload) {
      const token = localStorage.getItem("_gtk")
      const target = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/registrarComentario?token=${token}&target=${target}&curso=${course_id}&mensagem=${payload}`, {
        method: "POST",
      })
    },
    addResponse(payload){
      const item = this.comments.find(c => c.comment_id === payload.target)
      this.comments = this.comments.map(c=>{
        if(c.comment_id === item.comment_id){
          item.responses.push({
            user_id: 1223123123123,
            comment_id: 98989891238594,
            name: 'Luca alguma coisa',
            message: payload.message,
            image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
            created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)'
          })
          return item
        }
      })
    }
  }
})
function teste(payload) {
  return payload
}