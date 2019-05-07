<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#333333"
      text-color="#BBBBBB"
      active-text-color="#FEFEFE"
    >
      <template v-for="route in allRoutes">
        <sidebar-item v-if="route" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapState } from 'vuex'
  import SidebarItem from './sidebar-item'

  export default {
    components: {
      SidebarItem,
    },

    computed: {
      ...mapState({
        routes: state => state.app.routes,
        sidebar: state => state.app.sidebar,
      }),
      allRoutes () {
        return (this.routes && this.routes.length > 0) ? this.routes : (this.$router.options.routes || [])
      },
      isCollapse () {
        return !this.sidebar.opened
      },
    },
  }
</script>

<style>
  .el-scrollbar {
    height: 100%;
  }

  .scrollbar-wrapper {
    overflow: auto!important;

    .el-scrollbar__view {
      height: 100%;

      .el-menu {
        height: 100%;
      }
    }

    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      /* border: none; */
      height: 100%;
      width: 100% !important;
    }
  }
</style>
