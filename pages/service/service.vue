<template>
	<view class="wrapper">
    <view class="card-container" v-for="item in dataSource" :key="item.id"  >
      <ServiceItem :dataSourceId="item.id" :title="item.title" :subtitle="item.subtitle" :price="item.price" :cover="item.cover"></ServiceItem>
    </view>
	</view>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import ServiceItem from '../../components/ServiceItem';

	export default {
    name: "Service",
    components: {
      ServiceItem
    },
    mounted() {
      this.fetchServices()
    },
    computed: {
      ...mapState({
        dataSource: (state) => state.service.services,
      })
    },
		methods: {
			...mapActions([
        'fetchServices'
      ])
		}
	}
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  flex-wrap:wrap;
}
.card-container {
  width: 46%;
  margin: 2%;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2); /* 添加灰色的box shadow阴影 */
}

</style>
