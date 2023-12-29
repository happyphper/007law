<template>
  <view class="question"  @click="onClick">
    <text>{{ content }}</text>
    <uni-icons type="right" size="16" color="#999"></uni-icons>
  </view>
</template>

<script>
export default {
  name: "QuestionItem",
  props: ['content'],
  computed: { },
  methods: {
    onClick() {
      this.$store.commit('UPDATE_NEW_MESSAGE', this.content)
    },
  },
};
</script>

<style scoped lang="scss">
.question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid $uni-border-color;
  cursor: pointer;
}
</style>
