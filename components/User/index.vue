<template>
  <view @click="goToUserCenter">
  <HasLogin v-if="hasLogin"></HasLogin>
  <UnLogin v-else></UnLogin>
</view>
</template>

<script>
import {mapState} from 'vuex'

import HasLogin from './HasLogin'
import UnLogin from './UnLogin'

export default {
  name :'User',
  components: {
    HasLogin,
    UnLogin,
  },
  computed: {
    ...mapState({
      hasLogin: (state) => state.auth.hasLogin,
    }),
  },
  data() {
    return {

    }
  },
  methods: {
    goToUserCenter() {
      uni.navigateTo({url: '/pages/userCenter/userCenter'})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>