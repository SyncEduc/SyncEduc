// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
   app: {
    head: {
      title: 'SyncEduc - Plataforma de cursos online' ,
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
    },
  },
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
