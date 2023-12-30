<template>
  <view class="login-container">
    <text class="title">007法律平台</text>
    
    <image src="/static/logo.jpeg" class="logo"></image>

    <text class="subtitle">登录 007 法律平台 专业律师为您排忧解难</text>

    <view class="btn-container">
      <text>
        <text>登录即代表您同意</text>
        <text class="link">《服务协议》</text>
        <text>和</text>
        <text class="link">《隐私协议》</text>
      </text>
      <button class="btn" open-type="getPhoneNumber" @getphonenumber="handlePhone">微信授权登录</button>
    </view>
  </view>
</template>

<script>
import User from '../../components/User'

export default {
  name: 'Me',
  components: {
    User
  },
  mounted() {
    // this.getUserInfo()
  },
  data() {
    return {
      form: {
        code: '',
        encryptedData: '',
        iv: '',
        name: '微信用户',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      },
    };
  },
  methods: {
    // getUserInfo() {
    //   uni.getUserProfile({
    //   desc: '获取您的头像昵称用于进行展示',
    //   success: (res) => {
    //     this.name = res.userInfo.nickName
    //     this.avatar = res.userInfo.avatarUrl
    //   }
    // });
    // },
    handlePhone(e) {
      this.form.code = e.detail.code
      this.form.encryptedData = e.detail.encryptedData
      this.form.iv = e.detail.iv
      if (e.detail.errMsg != "getPhoneNumber:ok") {
        uni.showToast({
          title: '授权失败',
          duration: 1000
        });
        return
      }

      uni.showLoading()
      
      this.$store.dispatch('register', this.form).then(()=> {
        uni.hideLoading()
        uni.navigateBack()
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  background-color: #FFFFFF;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.title {
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0 0 2rem 0;
}
.subtitle{
  margin: 2rem 0 2rem 0;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
}
.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5rem;
}
.btn {
  margin-top: 1rem;
  background-color: $btn-green-color;
  color: white;
  width: 80%;
}
.link {
  color: $uni-color-primary;
}
</style>
