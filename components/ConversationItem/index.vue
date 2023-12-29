<template>
  <view @click="goToChat">
    <uni-swipe-action-item
    :right-options="options"
    @click="onClick"
    @change="swipeChange"
  >
    <view class="panel" :class="{active: selectedConversationId == dataSourceId}">
      <view class="info">
        <text>{{ title }}</text>
        <text class="date">{{ date }}</text>
      </view>
      <view class="arrow">
        <uni-icons type="right" size="24" :color="selectedConversationId == dataSourceId ? '#c5cccc' : '#c5cccc'"></uni-icons>
      </view>
    </view>
  </uni-swipe-action-item>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "ConversationItem",
  props: ['dataSourceId', 'title', 'date'],
  computed: {
    ...mapState({
      selectedConversationId: (state) => state.chat.selectedConversationId,
    })
  },
  data() {
    return {
      options: [
        {
          text: "取消",
          style: {
            backgroundColor: "#007aff",
          },
        },
        {
          text: "清除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },
  methods: {
    onClick(e) {
      if (e.index === 0) {
        return;
      }
      this.$store.dispatch('destroyConversation', this.dataSourceId)
    },
    swipeChange(e, index) {
      console.log("当前状态：" + e + "，下标：" + index);
    },
    goToChat() {
      this.$store.dispatch('showConversation', this.dataSourceId)
      this.$emit('closeDrawer')
    }
  },
};
</script>

<style scoped lang="scss">
.panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #efefef;
  width: 100%;
  color: $uni-text-color;
  background-color: white;
  padding: 0.4rem 0;
}
.info {
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
}
.date {
  margin-top: 6px;
  color: $uni-text-color-grey;
  font-size: 0.9rem;
}
.arrow {
  margin-right: 10px;
}
.active {
  color: $btn-green-color;
  background-color: #e4ffe7;
}
</style>
