// // plugins/moment.js
// import Vue from "vue";
// import moment from "moment";

// Vue.prototype.$moment = moment;
// export default ({ app }, inject) => {
//   inject("distanceInDays", (date) => moment(date).fromNow());
//   inject("formatDate", (dateTime) => {
//     if (dateTime) {
//       return moment(dateTime).format("D MMM YYYY");
//     } else {
//       return "";
//     }
//   });
//   inject("formatDateTime", (time) => moment(time).format("YYYY-MM-DD hh:mm A"));
//   inject("formatDateTime2", (time) =>
//     moment(time).format("YYYY-MM-DD HH:mm:ss")
//   );
//   inject("toTime", (time) => moment(time).format("HH:mm"));
// };

import moment from "moment";
import "moment/locale/fr"; // Load French locale

export default ({ app }, inject) => {
  moment.locale("fr"); // Set locale globally
  inject("moment", moment);
};
