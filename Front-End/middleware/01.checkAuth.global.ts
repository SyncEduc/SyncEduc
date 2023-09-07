import { useLoginStore } from "~/store/login";
import { RouteLocationNormalized } from ".nuxt/vue-router";

export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (process.client) {
      const loginStore = useLoginStore();
      const token = loginStore.getLocalStorageToken();
      const target = loginStore.getLocalStorageTarget()
      if (token) {
        await fetch(`http://127.0.0.1:5000/verificarToken?token=${token}&target=${target}`, {
          method: "POST",
        }).then(res=>res.json()).then(res=>{
          if(Object.keys(res).includes("message")){
            loginStore.updateLoginState(false)
          }else{
              loginStore.updateLoginState(true)
              localStorage.setItem("_gtk", res.token)
              localStorage.setItem("_gtt", res.target)
          }
        })
      } else {
        loginStore.updateLoginState(false);
      }
    }
  }
);
