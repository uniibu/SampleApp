import Vue from "vue";
import store from "./store";
import App from "./Components/App.vue";

new Vue({
  store,
  el: '#app',
  render: h => h(App)
});
