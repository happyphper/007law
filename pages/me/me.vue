<template>
  <view class="personal-center">
    <!-- 头像区域 -->
    <User></User>

    <!-- 我的服务 -->
    <ServiceList></ServiceList>

    <!-- 退出登录按钮 -->
    <view class="login-button-wrapper" v-if="hasLogin">
      <button class="logout-button" @tap="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
import User from '../../components/User'
import ServiceList from '../../components/ServiceList'
import {mapState} from 'vuex'

export default {
  name: 'Me',
  components: {
    User,
    ServiceList
  },
  computed: {
    ...mapState({
      hasLogin: (state) => state.auth.hasLogin,
    })
  },
  methods: {
    logout() {
      // 处理退出登录逻辑
      this.$store.dispatch('logout')
    }
  }
};
</script>

<style scoped lang="scss">
page {
  height: calc(100vh - 44px - 50px);
  background-color: #F8F8F8;
}
.login-button-wrapper{
  width: 100%;
  display: flex;
  justify-content: center;
}

.logout-button {
  width: 80%;
  position: fixed;
  bottom: 1rem;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
