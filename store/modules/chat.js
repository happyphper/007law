import * as chatApi from "../../apis/chat";

// 滚动屏幕到下方
function scrollToBottom() {
  setTimeout(() => {
    uni.pageScrollTo({
      scrollTop: 999999, // 一个足够大的值，确保能够滑动到底部
      duration: 300, // 滑动动画持续时间
    });
  }, 1);
}

export default {
  state: {
    loading: false,
    selectedConversationId: 0,
    conversations: [],
    messages: [],
    currentMessage: {
      id: "",
      role: "assistant",
      content: "",
    },
    newMessage: '',
    requestTask: null
    },
  getters: {},
  mutations: {
    // 覆盖会话
    FETCH_CONVERSATIONS(state, data) {
      state.conversations = data;
      if (data.length > 0 && state.selectedConversationId === 0) {
        state.selectedConversationId = data[0].id;
        chatApi
          .show(state.selectedConversationId)
          .then((res) => {
            state.messages = res.data;
            scrollToBottom();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    // 新增会话
    ADD_CONVERSATION(state, data) {
      const exists = state.conversations.some((v) => v.id === data.cid);
      if (exists) {
        return;
      }
      state.conversations.push(data);
    },
    // 覆盖消息
    SET_MESSAGES(state, data) {
      state.messages = data;
    },
    // 更新已选择会话
    SET_SELECTED_ID(state, id) {
      state.selectedConversationId = id;
    },
    // 新增消息
    ADD_MESSAGE(state, data) {
      state.messages.push(data);
    },
    // 展示加载
    SHOW_LOADING(state) {
      state.loading = true;
    },
    // 隐藏加载
    HIDE_LOADING(state) {
      state.loading = false;
    },
    // 删除会话
    DEL_CONVERSATION(state, id) {
      const index = state.conversations.findIndex((v) => v.id === id);
      state.conversations.splice(index, 1);
      if (state.selectedConversationId === id) {
        state.selectedConversationId = 0;
        state.messages = [];
      }
    },
    // 重置当前消息
    RESET_CURRENT_MESSAGE(state) {
      if (!state.currentMessage) {
        state.currentMessage = {}
      }
      state.currentMessage.id = Date.now();
      state.currentMessage.role = "assistant";
      state.currentMessage.content = "";
    },
    // 连接当前消息
    CONCAT_CURRENT_MESSAGE(state, content) {
      state.currentMessage.content += content;
    },
    // 会话结束
    END_CURRENT_MESSAGE(state) {
      state.messages.push(state.currentMessage);
      state.currentMessage = {};
      state.requestTask = null;
    },
    LOGOUT(state) {
      state.loading = false
      state.selectedConversationId = ''
      state.conversations = []
      state.messages = []
      state.currentMessage = {}
    },
    UPDATE_NEW_MESSAGE(state, val) {
      state.newMessage = val
    },
    SET_REQUEST_TASK(state, val) {
      state.requestTask = val
    },
    CANCEL_REQUEST(state) {
      state.loading = false;
      if (!state.requestTask) {
        return;
      }
      state.requestTask.abort()
    }
  },
  actions: {
    // 拉取所有会话
    fetchConversations({ commit }) {
      chatApi
        .index()
        .then((res) => {
          commit("FETCH_CONVERSATIONS", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 展示单个会话
    showConversation({ commit }, id) {
      chatApi
        .show(id)
        .then((res) => {
          commit("SET_MESSAGES", res.data);
          commit("SET_SELECTED_ID", id);
          scrollToBottom();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 发送消息
    storeConversation({ state, commit, dispatch }, content) {
      commit("ADD_MESSAGE", { id: Date.now(), content: content, role: "user" });
      commit("SHOW_LOADING");
      scrollToBottom();

      const callback = function messageReceivedCallback({
        code,
        cid,
        content,
        time,
      }) {
        switch (code) {
          case 1:
            // 会话开始
            commit("ADD_CONVERSATION", { id: cid, title: content });
            commit("SET_SELECTED_ID", cid);
            commit("RESET_CURRENT_MESSAGE");
            break;
          case 2:
            // 内容
            commit("CONCAT_CURRENT_MESSAGE", content);
            scrollToBottom();
            break;
          case 3:
          default:
            // 会话结束
            commit("END_CURRENT_MESSAGE");
            scrollToBottom();
            commit('HIDE_LOADING')
        }
      };

      const requestTask = chatApi.store(state.selectedConversationId, content, callback)

      commit('SET_REQUEST_TASK', requestTask)

      dispatch('decrementChatCount')
    },
    // 删除会话记录
    destroyConversation({ state, commit }, id) {
      chatApi
        .destroy(id)
        .then((res) => {
          commit("DEL_CONVERSATION", id);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 重置会话ID
    resetConversationId({ commit }) {
      commit("SET_SELECTED_ID", 0);
      commit("SET_MESSAGES", []);
    },
    logout({state, commit}) {
      uni.clearStorage();
    },
    closeRequestTask({commit}) {
      commit('CANCEL_REQUEST')
    }
  },
};
