<template>
  <view class="container">
    <view class="content-wrapper">
      <view class="content">{{ content }}</view>
    </view>
    <image :src="avatar" class="avatar" />
  </view>
</template>

<script>
export default {
  name: "User",
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
  justify-content: flex-end;
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
  background-color: #4caf50;
  padding: 0.6rem;
  border-radius: 4px;
  color: #fff;
  word-break: break-all;
  word-wrap: break-word; /* 在单词内断开换行 */
  margin-right: 10px;
  font-size: 1rem;
  white-space: pre-wrap;
}
.content::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 4px;
  top: 12px;
  border-width: 8px 0 8px 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4caf50;
}
</style>
