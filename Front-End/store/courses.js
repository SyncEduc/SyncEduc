import { defineStore } from "pinia";

export const useCourseStore = defineStore({
  id: 'courses',
  state: () => {
    return {
      courses: [],
      categories: []
    }
  },

  getters: {
    getCoursesList: (state) => state.courses,
    getCategoriesList: (state)=> state.categories
  },

  actions: {
    fetchCategories(){
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
          id:73784134 
        }
      ]
    },
    fetchCourses() {
      this.courses = [
        {
          name: 'Curso de edição de video',
          desc: 'Curso introdutório onde você vai poder absorver conteudos sobre edição de videos',
          image: 'https://www.sagicapriprodutora.com.br/images/curso_de_edicao_de_videos_7.jpeg',
          id: 19231231234123,
          stars: 4,
          teacher: {
            name: 'Luís Daví',
            desc: 'Professor de programação e encatador de novinhas, Super heroi, salvador do mundo, governador de todas as terras',
            image: 'https://cdn.pixabay.com/photo/2015/12/23/14/56/man-profile-1105761_640.jpg',
            stars: 3
          },
          categories: [
            {
              name: 'Audio-Visual',
              id: 73784134
            },
            {
              name: 'Front-end',
              id: 7834897
            },
            {
              name: 'Back-end',
              id: 1928391
            },
          ]
        },
        {
          name: 'Curso de edição de video',
          desc: 'Curso introdutório onde você vai poder absorver conteudos sobre edição de videos',
          image: 'https://www.sagicapriprodutora.com.br/images/curso_de_edicao_de_videos_7.jpeg',
          id: 192312312341123123,
          stars: 4,
          teacher: {
            name: 'Luís Daví',
            desc: 'Professor de programação e encatador de novinhas',
            image: 'https://linkconnection.com.br/wp-content/uploads/2023/02/fotos-para-perfil-922x1024.jpg',
            stars: 3
          },
          categories: [
            {
              name: 'Audio-Visual',
              id: 73784134
            }
          ]
        },
        {
          name: 'Curso de edição de video',
          desc: 'Curso introdutório onde você vai poder absorver conteudos sobre edição de videos',
          image: 'https://www.sagicapriprodutora.com.br/images/curso_de_edicao_de_videos_7.jpeg',
          id: 19231231231231234123,
          stars: 4,
          teacher: {
            name: 'Luís Daví',
            desc: 'Professor de programação e encatador de novinhas',
            image: 'https://linkconnection.com.br/wp-content/uploads/2023/02/fotos-para-perfil-922x1024.jpg',
            stars: 3
          },
          categories: [
            {
              name: 'Audio-Visual',
              id: 73784134
            }
          ]
        },
      ]
    }
  }
})