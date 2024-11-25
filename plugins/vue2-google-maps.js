// plugins/vue2-google-maps.js

import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLEMAP_KEY,
    libraries: "places",
  },
});
