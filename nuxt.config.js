import local_en from "./config/lang/en.json";

export default {
  ssr: false,
  server: {
    port: 3002,
    host: "0.0.0.0",
  },
  head: {
    title: "User-Cargo-Connect-FE",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/global.css",
    "slick-carousel/slick/slick.css",
    "slick-carousel/slick/slick-theme.css",
    "vue2-datepicker/index.css",
  ],

  plugins: [
    { src: "~/plugins/v-click-outside.js", mode: "client" },
    { src: "~/plugins/vue-slick-carousel.js", mode: "client" },
    { src: "~/plugins/toast-notification.js", mode: "client" },
    "~/plugins/js-cookie.js",
    "~/plugins/lodash.js",
    "~/plugins/validation.js",
    "~/plugins/uniqueIdPlugin.js",
    "~/plugins/moment.js",
    "~/plugins/downloadFile.js",
    { src: "~/plugins/vue2-datepicker.js", mode: "client" },
    { src: "~/plugins/vue2-google-maps.js", ssr: false },
  ],

  components: [{ path: "~/components/", pathPrefix: false }],

  buildModules: [
    [
      "nuxt-i18n",
      {
        vueI18nLoader: true,
        defaultLocale: "en",
        locales: [
          {
            code: "en",
            name: "English",
          },
        ],
        globalInjection: true,
        vueI18n: {
          locale: "en",
          fallbackLocale: "en",
          messages: { en: { ...local_en } },
        },
      },
    ],
  ],

  modules: [],

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
};
