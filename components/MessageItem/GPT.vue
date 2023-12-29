<template>
  <view class="container">
    <image :src="avatar" class="avatar" />

    <view class="content-wrapper">
      <view class="content" v-text="content"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "GPT",
  props: ["role", "content", "avatar"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin: 0.5rem 1rem;
}
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: #efefef;
  padding: 6px;
  flex-shrink: 0;
}
.content-wrapper {
  position: relative;
}
.content {
  background-color: #FFF;
  padding: 0.6rem;
  border-radius: 4px;
  color: #000000;
  word-break: break-all;
  word-wrap: break-word; /* 在单词内断开换行 */
  margin-left: 10px;
  font-size: 1rem;
  white-space: pre-wrap;
}
.content::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 4px;
  top: 12px;
  border-width: 8px 8px 8px 0;
  border-style: solid;
  border-color: transparent #FFF transparent transparent;
}
</style>
