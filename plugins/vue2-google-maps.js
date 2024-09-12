// plugins/vue2-google-maps.js

import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBJmlggXR1EVQbFY9QT5iD8fXm3dtz7p7Q",
    libraries: "places", // If you need to use places input
  },
});
