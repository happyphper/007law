<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    // 调用uni.login进行小程序登录
    uni.login({
      success: (res) => {
        if (res.code) {
          // 获取到用户登录凭证，发送到后台服务器
          console.log("登录成功，code：", res.code);

          this.$store.dispatch("code2info", res.code);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
      fail: (err) => {
        console.log("uni.login调用失败", err);
      },
    });

    this.$store.dispatch("fetchQuestions")
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
