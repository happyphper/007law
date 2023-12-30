<template>
  <view class="btn" @click="handleUpload">
    <uni-icons type="paperclip" size="24"></uni-icons>
  </view>
</template>

<script>
import { mapState } from "vuex";

import * as chatApi from '../../apis/chat';

export default {
  name: "UploadDoc",
  computed: {
    ...mapState({
      loading: (state) => state.chat.loading,
      hasLogin: (state) => state.auth.hasLogin,
      hasChat: (state) => state.auth.user.has_chat,
      count: (state) => state.auth.user.chat_count,
    }),
  },
  data() {
    return {};
  },
  methods: {
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

      if (!this.hasChat && this.count <= 0) {
        uni.showToast({
          title: "额度耗尽，订阅后不限制次数",
          duration: 5000,
          icon: "none",
        });
        return;
      }

      if (this.loading) {
        return;
      }

      this.filePick();
    },
    filePick() {
      uni.chooseMessageFile({
        count: 1,
        extension: [".doc"],
        success: async function (res) {
          console.log(res)
          const filePath = res.tempFiles[0].path;
          chatApi.upload(filePath, 'file').then(res => {
            uni.navigateTo({ url: '/pages/docContent/docContent?content=' + res.data.content })
          })
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  padding: 0.3rem 0.7rem;
}
</style>
