import { useLoginStore } from "~/store/login";
import { RouteLocationNormalized } from ".nuxt/vue-router";

export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (process.client) {
      const loginStore = useLoginStore();
      const token = loginStore.getLocalStorageToken();
      if (token) {
        await fetch(`http://127.0.0.1:5000/verificarToken?token=${token}`, {
          method: "POST",
        }).then(res=>res.json()).then(res=>{
          if(Object.keys(res).includes("message")){
            loginStore.updateLoginState(false)
            console.log(res.message)
          }else{
              console.log("caiu token")
              loginStore.updateLoginState(true)
              localStorage.setItem("_gtk", res.token)
          }
        })
      } else {
        console.log("caiu else")
        loginStore.updateLoginState(false);
      }
    }
  }
);
