<template>
  <view class="container">
    <textarea class="textarea" :value="content" maxlength="16384" auto-height auto-focus confirm-type="发送" cursor-spacing="10" @confirm="handleConfirm"></textarea>
  </view>
</template>

<script>

export default {
  name: 'DocContent',
  onLoad(option) {
    this.content = option.content
  },
  components: {},
  data() {
    return {
      content: ``
    }
  },
  computed: {},
  methods: {
    handleConfirm() {
      this.$store.dispatch("storeConversation", this.content);
      uni.navigateBack()
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: calc(100% - 40px);
  background-color: #fff;
  padding: 20px;
}

.textarea {
  width: 100%;
  background-color: #fff;
  font-size: 1rem;
  caret: $uni-color-primary;
}
</style>
