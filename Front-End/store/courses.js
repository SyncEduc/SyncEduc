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
    fetchCourses() {
      this.courses = [
        {
          name: 'Curso de edição de video',
          desc: 'Curso introdutório onde você vai poder absorver conteudos sobre edição de videosCurso introdutório onde você vai poder absorver conteudos sobre ediçãa',
          image: 'https://www.sagicapriprodutora.com.br/images/curso_de_edicao_de_videos_7.jpeg',
          id: 3,
          stars: 4,
          lessons:[
            {
              title: 'Aula introdutória 1',
              videoSource: 'https://github.com/webldavi/turing-community/raw/main/assets/Videos/videoplayback.mp4'
            },{
              title: 'Aula introdutória 2',
              videoSource: 'https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761'
            }
          ],
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
              name: 'teste',
              id: 3
            },
            
            {
              name: 'Back-end',
              id: 1928391
            },
            
            {
              name: 'Back-end',
              id: 1928391
            },{
              name: 'Back-end',
              id: 1928391
            },{
              name: 'Back-end',
              id: 1928391
            },{
              name: 'Back-end',
              id: 1928391
            },{
              name: 'Back-end',
              id: 1928391
            },{
              name: 'Back-end',
              id: 1928391
            },
          ]
        }       
      ]
    }
  }
})