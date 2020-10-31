import Vue from "vue";

import LoginForm from './components/login-form.vue';
import Search from './components/search.vue';

new Vue({
  components: {
    LoginForm,
    Search
  }
}).$mount("#vue-mount");
