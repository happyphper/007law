<template>
  <view class="service-wrapper">
    <!-- <view class="title">
      <text>{{ service.title }}</text>
    </view> -->

    <view class="cover">
      <image class="image" :src="service.cover" mode="widthFix"></image>
    </view>

    <view class="content">
      <text>{{ service.content }}</text>
    </view>

    <view class="button-wrapper">
      <button>立即购买</button>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex'

	export default {
    name: "Service",
    components: {},
    data() {
      return {
        service: {}
      }
    },
    onLoad:function(option) {
      this.service = this.dataSource.filter((item) => item.id == option.dataSourceId)[0]
    },
    computed: {
      ...mapState({
        dataSource: (state) => state.service.data,
      })
    },
		methods: {}
	}
</script>

<style scoped lang="scss">
.service-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: 5rem;
}
.title {
  background-color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.2rem 0;
}
.image {
  width: 100%;
}
.cover {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #cfcfcf;
  vertical-align: bottom;
  overflow: hidden;
}
.content {
  width: calc(100%-2rem);
  background-color: #fff;
  padding: 1rem;
}
.button-wrapper {
  width: 100%;
  position: fixed;
  bottom: 2rem;
  display: flex;
  justify-content: center;
}
button {
  width: 80%;
  color: white;
  background-color: $btn-green-color;
}
</style>
