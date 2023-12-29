<template>
  <view>
    <uni-nav-bar
      shadow
      title="智能咨询"
      :statusBar="true"
      :border="false"
      left-icon="chatboxes-filled"
      @clickLeft="showDrawer"
      :fixed="true"
    ></uni-nav-bar>

    <view class="chat-container">
      <scroll-view class="chat-messages" scroll-y>
        <!-- <text class="preset-message"
          >您现在可以输入你想问的问题了，专业律师将为您排忧解难</text
        > -->
        <view v-if="(!messages || messages.length === 0) && questions.length > 0" class="question-container">
          <view class="question-title">
            <text>常见问题</text>
          </view>

          <QuestionItem :content="item" v-for="item in questions" :key="item"></QuestionItem>
        </view>

        <view v-for="(message, index) in messages" :key="index">
          <MessageItem
            :role="message.role"
            :content="message.content"
          ></MessageItem>
        </view>

        <MessageItem
          v-show="loading && currentMessage.content.length > 0"
          :role="currentMessage.role"
          :content="currentMessage.content"
        ></MessageItem>

        <view class="chat-tips">
          <text v-if="!hasChat && count > 0">您还可以提问 {{ count }} 次</text>
          <text v-else-if="!hasChat && count == 0">免费次数已耗尽，购买后可不限次使用</text>
          <text v-else style="visibility:hidden;">占位</text>
        </view>
      </scroll-view>

      <MessageInput></MessageInput>
    </view>

    <uni-drawer ref="drawer" class="drawer" mode="left" :mask-click="true">
      <scroll-view style="height: 100%" scroll-y="true">
        <ui-card class="tips" is-shadow="false" is-full>
          <text>会话列表</text>
        </ui-card>

        <view v-for="item in conversations" :key="item.id">
          <ConversationItem
            :dataSourceId="item.id"
            :title="item.title"
            :date="item.updated_at"
            @closeDrawer="closeDrawer"
          ></ConversationItem>
        </view>
      </scroll-view>
      <view class="conversation-title">
        <view class="btn" @click="newConversation">
            <text class="text">新建会话</text>
          </view>
      </view>
    </uni-drawer>
  </view>
</template>

<script>
import MessageItem from "../../components/MessageItem";
import MessageInput from "../../components/MessageInput";
import { mapState } from "vuex";
import ConversationItem from "../../components/ConversationItem";
import QuestionItem from "../../components/QuestionItem";
export default {
  name: "Index",
  components: {
    MessageItem,
    MessageInput,
    ConversationItem,
    QuestionItem
  },
  computed: {
    ...mapState({
      loading: (state) => state.chat.loading,
      messages: (state) => state.chat.messages,
      conversations: (state) => state.chat.conversations,
      currentMessage: (state) => state.chat.currentMessage,
      hasLogin: (state) => state.auth.hasLogin,
      hasChat: (state) => state.auth.user.has_chat,
      count: (state) => state.auth.user.chat_count,
      questions:(state)=>state.question.dataSource,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchConversations");
  },
  data() {
    return {};
  },
  methods: {
    // 处理返回按钮点击事件
    showDrawer() {
      if (!this.hasLogin) {
        uni.showToast({
          title: "登录后可以免费试用",
          duration: 1000,
          icon: "none",
        });
        setTimeout(() => uni.navigateTo({ url: "/pages/login/login" }), 1000);
        return;
      }

      this.$refs.drawer.open();

      this.$store.dispatch("fetchConversations");
    },
    closeDrawer() {
      this.$refs.drawer.close();
    },
    newConversation() {
      this.closeDrawer();
      this.$store.dispatch("resetConversationId");
    }
  },
};
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
}
.preset-message {
  display: inline-block;
  width: 100%;
  color: $uni-text-color-grey;
  font-size: 0.8rem;
  text-align: center;
  margin: 1rem 0;
}
.chat-messages {
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 60px;
}
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 10px 10px 10px;
  border-bottom: 1px solid #efefef; 
}
.btn {
  background-color: $btn-green-color;
  color: white;
  width: 80%;
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
}
.drawer {
  position: relative;
}
.conversation-title {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  color: $uni-text-color-grey;
}
.chat-tips {
  display: flex;
  justify-content: center;
  color: $uni-text-color-grey;
  margin-bottom: 5px;
}
.question-container {
  margin: 1rem auto;
  background-color: #fff;
  width: 90%;
  border-radius: 1rem;
}
.question-title {
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid $uni-border-color;
  padding: 0.5rem 1rem;
}
.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid $uni-border-color;
  cursor: pointer;
}
</style>
