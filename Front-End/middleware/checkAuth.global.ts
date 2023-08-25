import { useLoginStore } from "~/store/login"
import { RouteLocationNormalized } from ".nuxt/vue-router"


export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (process.client) {
    const loginStore = useLoginStore();
    const token = loginStore.getLocalStorageToken
    if (token) {
      console.log('Passou')
    } else {
      loginStore.updateLoginState(false)
    }
  }
})