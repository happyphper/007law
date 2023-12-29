<template>
  <view>
    <view class="service-container">
      <view class="title">
        <text>我的服务</text>
      </view>

      <view class="service-wrapper">
        <view class="service-text">
          <image src="/static/icons/gpt.png" class="icon"></image>
          <span>智能咨询</span>
        </view>

        <view class="service-date" v-if="user.has_chat">
          {{ user.chat_started_at }} 至 {{ user.chat_expired_at }} 有效
        </view>
        <view class="service-date" v-else-if="user.chat_count > 0">
          剩余免费额度： {{ user.chat_count }} 次
        </view>
        <view class="service-button" @click="()=>handleBuy(1)" v-else>
        <text>立即订阅</text>
      </view>
      </view>
    </view>

    <view class="service-wrapper">
      <view class="service-text">
        <image src="/static/icons/video.png" class="icon"></image>
        <span>短视频IP打造</span>
      </view>
      <view class="service-date" v-if="user.has_ip">
        {{ user.ip_started_at }} 至 {{ user.ip_expired_at }} 有效
      </view>
      <view class="service-button" @click="()=>handleBuy(2)" v-else>
        <text>立即订阅</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ServiceList",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      hasLogin: (state)=>state.auth.hasLogin,
    }),
  },
  methods: {
    handleBuy(type) {
      if (!this.hasLogin) {
        uni.showToast({
          title: "登录后可以免费试用",
          duration: 1000,
          icon: "none",
        });
        setTimeout(() => uni.navigateTo({ url: "/pages/login/login" }), 1000);
        return;
      }

      uni.showToast({
          title: "正在开发中...",
          duration: 5000,
          icon: "none",
        });
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 20px 8px;
}

.service-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 14px 10px;
  font-size: 0.9rem;
  margin-bottom: 1px;
}
.service-date {
  font-size: 0.8rem;
  color: $uni-text-color-grey;
}
.service-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
}
.service-button {
  background-color: $btn-green-color;
  color: white;
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
