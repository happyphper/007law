<template>
  <view class="list-item" @click="onClick">
    <text class="left">{{ label }}</text>
    <view class="right">
      <image class="avatar" :src="value" v-if="type === 'image'"></image>
      <text v-else>{{ value?value:'' }}</text>
      <uni-icons type="right" size="16" color="#999"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  name: "ListItem",
  props: ["editable", "type", "label", "value", "field"],
  methods: {
    onClick() {
      if (!this.editable) {
        uni.showToast({ title: "暂不支持修改", icon: "none" });
        return;
      }

      if (this.type === 'image') {
        uni.chooseImage({
          count: 1, 
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            const filePath = res.tempFilePaths[0];
            this.$store.dispatch('updateUserAvatar', filePath)
          },
          fail: (err) => {
            console.error(err)
          }
        })
        return
      }

      uni.showModal({
        title: `请输入新的 ${this.label}`,
        content: this.value?this.value:'',
        editable: true,
        success:  (res) => {
          if (!res.confirm) {
            return;
          }
          this.$store.dispatch("updateUser", {
            field: this.field,
            value: res.content,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  margin-top: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: calc(100% - 2rem);
  padding: 1rem 1rem;
  cursor: pointer;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $uni-text-color-grey;
}

.avatar {
  width: 3rem;
  height: 3rem;
}
</style>
