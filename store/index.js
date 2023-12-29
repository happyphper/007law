//  页面路径：store/index.js
import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import chat from "@/store/modules/chat";
import service from "@/store/modules/service";
import question from "@/store/modules/question";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    chat,
    service,
    question
  },
});
