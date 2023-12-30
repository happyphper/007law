<template>
  <view class="personal-center">
    <!-- 头像区域 -->
    <User></User>

    <view class="service-container">
      <view class="title">我的服务</view>
      <view class="service-wrapper">
        <view class="service-text service-active">
          <image src="/static/icons/video.png" class="icon"></image>
          <span>短视频IP打造</span>
        </view>
        <view class="service-date">
          2023-10-10 至 2024-10-10 有效
        </view>
      </view>
      <view class="service-wrapper service-inactive">
        <view class="service-text">
          <image src="/static/icons/gpt.png" class="icon"></image>
          <span>智能咨询</span>
        </view>
        <view class="service-button">立即订阅</view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <button class="logout-button" @tap="logout">退出登录</button>
  </view>
</template>

<script>
import User from '../../components/User'

export default {
  name: 'Me',
  components: {
    User
  },
  data() {
    return {
      avatarUrl: "/static/avatar.jpg",
      username: "李多多",
      phone: "110****1234",
      gender: "男",
      age: 25
      // 其他个人信息项
    };
  },
  methods: {
    logout() {
      // 处理退出登录逻辑
      console.log("用户点击退出登录");
    }
  }
};
</script>

<style scoped>
page {
  height: calc(100vh - 44px - 50px);
  background-color: #F8F8F8;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 10px 4px;
}

.service-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 8px;
  font-size: 0.9rem;
  margin-bottom: 1px;
}
.service-date {
  font-size: 0.8rem;
  color: #4caf50;
}
.service-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.service-button {
  background-color: orange;
  color: white;
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button {
  width: 100%;
  position: fixed;
  bottom: 70px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
