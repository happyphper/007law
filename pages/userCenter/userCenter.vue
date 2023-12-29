<template>
  <view class="user-center-container">

    <ListItem type="image" label="头像" :value="user.avatar" field="avatar" :editable="true"></ListItem>

    <ListItem type="text" label="昵称" :value="user.name" field="name" :editable="true"></ListItem>

    <ListItem type="text" label="手机" :value="user.phone" field="phone" :editable="false"></ListItem>

    <ListItem type="text" label="教育经历" :value="user.education" field="education" :editable="true"></ListItem>

    <ListItem type="text" label="公司名称" :value="user.company" field="company" :editable="true"></ListItem>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import ListItem from '../../components/ListItem'

export default {
  name: 'Me',
  components: {
    ListItem,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    })
  },
  methods: {
    onClick() {
      uni.showModal({
      title: '请输入新昵称',
      content: '这是一个模态弹窗',
      editable: true,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
    }
  }
};
</script>

<style scoped lang="scss">
.user-center-container {
  display: flex;
  flex-direction: column;
}

</style>
