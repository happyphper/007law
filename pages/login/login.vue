<template>
  <view class="login-container">
    <text class="title">登录007法律平台 专业律师排忧解难</text>
    
    <image src="/static/logo.png" mode="aspectFit" class="logo"></image>

    <button class="btn" open-type="getPhoneNumber" @getphonenumber="handlePhone">微信授权登录</button>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.title {
  font-weight: bold;
  font-size: 1.4rem;
  margin: 4rem 0 2rem 0;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
.btn {
  margin-top: 2rem;
  background-color: $btn-green-color;
  color: white;
  width: 80%;
  position: absolute;
  bottom: 5rem;
}
</style>
