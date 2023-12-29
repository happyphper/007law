<template>
  <view class="container">
    <view class="input-container">
      <view class="btn"  @click="handleUpload">
        <uni-tooltip content="上传合同模板" placement="left">
          <uni-icons type="paperclip" size="24"></uni-icons>
        </uni-tooltip>
      </view>

      <input
        v-model="newMessage"
        @confirm="sendMessage"
        placeholder="请输入您想咨询的问题"
        placeholder-style="color:#c1c1c1"
      />

      <view class="btn">
        <uni-tooltip content="发送" placement="right">
          <uni-icons
            type="paperplane"
            size="24"
            @click="sendMessage"
            v-if="!loading"
          ></uni-icons>
        </uni-tooltip>
        <uni-tooltip content="拼命思考中..." placement="right">
          <Loading :loading="loading" v-if="loading"></Loading>
        </uni-tooltip>
      </view>
    </view>
  </view>
</template>

<script>
import Loading from "../../components/Loading";
import { mapState } from "vuex";

export default {
  name: "MessageInput",
  components: { Loading },
  computed: {
    ...mapState({
      loading: (state) => state.chat.loading,
      hasLogin: (state) => state.auth.hasLogin,
      hasChat: (state) => state.auth.user.has_chat,
      count: (state) => state.auth.user.chat_count,
    }),
    newMessage: {
      get() {
        return this.$store.state.chat.newMessage
      },
      set(value) {
        this.$store.commit('UPDATE_NEW_MESSAGE', value)
      }
    }
  },
  mounted() {
    //  监听键盘高度变化
    uni.onKeyboardHeightChange((obj) => {
      // 获取系统信息
      let _sysInfo = uni.getSystemInfoSync();
      let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight;
      console.log(_sysInfo, _heightDiff);
      let _diff = obj.height - _heightDiff;
      // 键盘高度
      this.keyboardHeight = _diff > 0 ? 18 : 0;
    });
  },
  data() {
    return {
      keyboardHeight: 0,
    };
  },
  methods: {
    sendMessage() {
      if (!this.hasLogin) {
        uni.showToast({
          title: "登录后可以免费试用",
          duration: 1000,
          icon: "none",
        });
        setTimeout(() => uni.navigateTo({ url: "/pages/login/login" }), 1000);
        return;
      }

      if (!this.hasChat && this.count <= 0) {
        uni.showToast({
          title: "额度耗尽，订阅后不限制次数",
          duration: 5000,
          icon: "none",
        });
        return;
      }

      if (this.newMessage.trim() === "") {
        return;
      }

      this.$store.dispatch("storeConversation", this.newMessage);

      this.newMessage = "";
    },
    handleUpload() {
      if (!this.hasLogin) {
        uni.showToast({
          title: "登录后可以免费试用",
          duration: 1000,
          icon: "none",
        });
        setTimeout(() => uni.navigateTo({ url: "/pages/login/login" }), 1000);
        return;
      }
      // TODO
      uni.showToast({
        title: "正在开发中...",
        duration: 2000,
        icon: "none",
      });
    },
    keyboardHeightChange(e) {
      this.keyboardHeight = e.keyboardHeight;
    },
  },
};
</script>

<style scoped lang="scss">
/* #ifdef MP_WEIXIN */
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
/* #endif */

/* #ifdef H5 */
.container {
  position: fixed;
  bottom: 44px;
  left: 0;
  width: 100%;
  background-color: #fff;
}
/* #endif */

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  width: 100%;
  padding: 0.5rem 0;
  background-color: $bg-color-grey;
}

input {
  flex: 1;
  padding: 5px;
  background-color: #fff;
  caret-color: $btn-green-color;
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
}

.btn {
  padding: 0.3rem 0.7rem;
}
.loading-box {
  width: 30px;
  height: 30px;
  background-color: red;
}
</style>
