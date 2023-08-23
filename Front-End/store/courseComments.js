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
      this.comments = [
        {
          user_id: 1223123123123,
          comment_id: 989898951238594,
          name: 'Luis Davi',
          message: 'Comentario 1',
          image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
          created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)',
          responses: [
            {
              user_id: 1223123123123,
              comment_id: 98989891238594,
              name: 'Luca alguma coisa',
              message: 'Resposta 1',
              image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
              created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)'
            },{
              user_id: 1223123123123,
              comment_id: 9898989548594,
              name: 'Jõao vitor',
              message: 'resposta 2',
              image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
              created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)'
            }
          ]
        },{
          user_id: 1223123123123,
          comment_id: 9898989548594,
          name: 'Luis Davi',
          message: 'Comentarioawdawdawd',
          image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
          created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)',
          responses: [
            {
              user_id: 1223123123123,
              comment_id: 9898989548594,
              name: 'Luca alguma coisa',
              message: 'Resposta 1',
              image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
              created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)'
            },{
              user_id: 1223123123123,
              comment_id: 9898989548594,
              name: 'Jõao vitor',
              message: 'resposta 2',
              image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
              created_at: 'Mon Aug 21 2023 21:45:53 GMT-0300 (Hora padrão de Brasília)'
            }
          ]
        }
      ]
    }
  }
})