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
      const cache = []
      const token = localStorage.getItem("_gtk")
      const target = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/comentarios?token=${token}&target=${target}&id=${id}`, {
        method: "GET"
      }).then(res=>res.json()).then(async res=>{
        for(const comment of res.comments){
          await fetch(`http://127.0.0.1:5000/user?token=${token}&target=${target}&type=${comment[3]}&id=${comment[2]}`)
          .then(resp=>resp.json()).then(async resp=>{
            await fetch(`http://127.0.0.1:5000/respostas?token=${token}&target=${target}&id=${comment[0]}`).then(responses=>responses.json()).then(async responses=>{
              let res = []
              for(const response of responses.responses){
                await fetch(`http://127.0.0.1:5000/user?token=${token}&target=${target}&type=${response[3]}&id=${response[2]}`)
                .then(respData=> respData.json()).then(respData=>{
                  res.push( {
                    user_id: response[2],
                    comment_id: response[1],
                    name: respData.name,
                    message: response[4],
                    image: respData.avatar_url,
                    type: response[3]
                  })
                })
              }
              cache.push({
                user_id: comment[2],
                comment_id: comment[0],
                name: resp.name,
                message: comment[4],
                image: resp.avatar_url,
                responses: res,
                type: comment[3]
              })
              this.comments = cache
            })
          })
        }
      })
    },
    async addComments(course_id, payload) {
      const token = localStorage.getItem("_gtk")
      const target = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/registrarComentario?token=${token}&target=${target}&curso=${course_id}&mensagem=${payload}`, {
        method: "POST"
      })
    },
    async addResponse(comment_id, payload){
      const token = localStorage.getItem("_gtk")
      const target = localStorage.getItem("_gtt")
      await fetch(`http://127.0.0.1:5000/registrarResposta?token=${token}&target=${target}&comment=${comment_id}&mensagem=${payload}`, {
        method: "POST"
      }).then(res=>res.json()).then(res=>{
        console.log(res)
      })
    }
  }
})
function teste(payload) {
  return payload
}