<template>
    <view @click="handleClicked">
      <view class="img-container">
        <image :src="cover" class="ip" mode="widthFix"></image>
      </view>
      <view class="goods-info">
        <view class="title">{{ title }}</view>
        <view class="subtitle">{{ subtitle }}</view>
        <view class="price-box"><text class="price">{{ price }}</text><text>元/年</text></view>
        <view class="btn-wrapper">
          <button size="mini" class="btn" @click="handleClicked">立即购买</button>
        </view>
      </view>
    </view>
</template>

<script>
export default {
  name: 'ServiceItem',
  props: ['dataSourceId', 'title', 'subtitle', 'price', 'cover'],
  methods: {
    handleClicked() {
      uni.navigateTo({url: '/pages/serviceDetail/serviceDetail?' + `dataSourceId=${this.dataSourceId}`, })
    }
  }
}
</script>

<style lang="scss" scoped>

.img-container {
  width: 100%;
}
.goods-info {
  padding: 5px 10px;
}
.ip {
  width: 100%;
  object-fit: cover;
}
.title {
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 2rem;
}
.subtitle {
  margin-top: 5px;
  font-size: 0.9rem;
  color: rgb(94, 93, 93);
}
.btn-wrapper {
  text-align: right;
  margin-top: 10px;
}
.btn {
  width: 100px;
  background-color: #4caf50;
  color: white;
  margin: 0;
}
.price-box {
  text-align: right;
  color: #ea3535;
  font-size: 0.8rem;
}
.price {
  font-weight: bold;
  font-size: 1.4rem;
  margin-right: 4px;
}
</style>