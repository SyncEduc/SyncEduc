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
    fetchComments() {
      this.comments = []
    },
    addComments(payload) {
      this.comments.push({
        user_id: 1223123123123,
        comment_id: 989898951238594,
        name: 'Luis Davi',
        message: payload,
        image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
        created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)',
        responses: []
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