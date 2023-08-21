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
    fetchCategories() {
      this.categories = [
        {
          name: 'Front-end',
          id: 7834897
        },
        {
          name: 'Back-end',
          id: 1928391
        },
        {
          name: 'Audio-Visual',
          id: 73784134
        }
      ]
    },
    fetchTeachers() {
      this.teachers = [
        {
          name: 'Luís Davíawdawdawd',
          desc: 'Professor de programação e encatador de novinhas, Super heroi, salvador do mundo, governador de todas as terras',
          image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
          stars: 3,
          categories: [
            {
              name: 'Front-end',
              id: 7834897
            }
          ]
        }, {
          name: 'Luís Daví',
          desc: 'Professor de programação e encatador de novinhas, Super heroi, salvador do mundo, governador de todas as terras',
          image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
          stars: 3,
          categories: [

            {
              name: 'Back-end',
              id: 1928391
            }
          ]
        }, {
          name: 'Luís Daví',
          desc: 'Professor de programação e encatador de novinhas, Super heroi, salvador do mundo, governador de todas as terras',
          image: 'https://i.pinimg.com/originals/75/82/09/7582098de480133df2fed86d2de7637b.jpg',
          stars: 3,
          categories: [
            {
              name: 'Back-end',
              id: 1928391
            }
          ]
        },
      ]
    }
  }
})