<template>
  <view>
    <view v-if="loading" class="loading-container" @click="handleStop">
      <view class="loading"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: ['loading'],
  methods: {
    handleStop() {
      this.$store.dispatch('stopChat')
    }
  }
};
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading {
  width: 1rem;
  height: 1rem;
  border: 2px solid #ccc;
  border-top: 1px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

.text {
  color: #FFF;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
