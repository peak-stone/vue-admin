<template>
  <div class="dashboard-container">
    <h3 v-if="userInfo">欢迎, {{ userInfo.username }} !</h3>
    <p>请从左侧菜单进入子系统</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Dashboard',

    computed: {
      ...mapState({
        userInfo: state => state.user.info,
      }),
    },
  }
</script>

<style scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
