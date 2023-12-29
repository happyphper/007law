<template>
  <!-- 头像区域 -->
  <view class="user-container" @click="handleLogin">
    <image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
    <!-- 用户名区域 -->
    <view class="info-container">
      <view class="username">
        {{ username }}
      </view>
      <view class="phone">
        {{ phone }}
      </view>
    </view>
    <!-- 箭头 -->
    <image class="arrow" src="/static/icons/arrow-right-bold.png" @click="handleLogin"></image>
  </view>
</template>

<script>
export default {
name: 'UnLogin',
data() {
  return {
    avatarUrl: "/static/avatars/user.png",
    username: "未登录",
    phone: "未绑定手机号",
    gender: "男",
    age: 25
  }
},
methods: {
  handleLogin() {
    uni.navigateTo({url: '/pages/login/login'})
  }
}
}
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  background-color: white;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  flex-shrink: 0;
}
.info-container {
  margin-left: 10px;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 60px;
}
.arrow {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.username {
  text-align: left;
  font-size: 18px;
}
.phone {
  text-align: left;
  font-size: 14px;
  color: #aaaaaa;
}

</style>