<template>
  <view>
    <User
      v-show="role === 'user'"
      :role="role"
      :content="content"
      :avatar="avatar"
    ></User>

    <GPT
      v-show="role === 'assistant'"
      :role="role"
      :content="content"
      :avatar="avatar"
    ></GPT>
  </view>
</template>

<script>
import User from "./User.vue";
import GPT from "./GPT.vue";

export default {
  name: "MessageItem",
  components: { User, GPT },
  props: ["role", "content"],
  computed: {
    avatar() {
      return this.role === 'user' ? this.userAvatar : this.serviceAvatar;
    }
  },
  data() {
    return {
      userAvatar: "/static/avatars/user.png",
      serviceAvatar: "/static/icons/gpt.png",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
