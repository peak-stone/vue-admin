<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    ></hamburger>

    <breadcrumb v-if="showBreadCrumb"></breadcrumb>

    <el-menu v-if="userInfo && userInfo.username" mode="horizontal" class="avatar-container" background-color="#262626"
                     text-color="#BBBBBB" active-text-color="#262626">
      <el-submenu index="5" style="margin: -4px;">
          <template slot="title" class="avatar-wrapper">
            <!-- <svg-icon icon-class="user" class-name="disabled" style="font-size: 20px;"></svg-icon> -->
            {{ userInfo.username }}
          </template>
          <!-- <el-menu-item index="5-1">
              <a href="/changepwd">{{ $t('navbar.changepwd') }}</a>
          </el-menu-item> -->
          <el-menu-item index="5-2" style="padding: 0 20px;">
              <a @click.prevent="logout" href="/">{{ $t('navbar.logOut') }}</a>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- <el-dropdown v-if="userInfo && userInfo.username" class="avatar-container">
      <div class="avatar-wrapper">
        {{ userInfo.username }}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item>
          <span style="display:block;" href="/changepwd">{{ $t('navbar.changepwd') }}</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->

    <router-link v-else class="lnk-login" :to="{ name: 'login' }">{{ $t('login.logIn') }}</router-link>
  </el-menu>
</template>

<script>
  import { mapState } from 'vuex'
  import Breadcrumb from '../breadcrumb'
  import Hamburger from '../hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        userInfo: state => state.user ? state.user.info : null,
      }),
      showBreadCrumb() {
        return this.$store.state.app.showBreadCrumb
      },
    },
    created() {
      console.log(this.userInfo)
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('app/toggleSideBar')
      },
      logout () {
        this.$store.dispatch('user/logout').then(() => {
          this.$vrm.setRoles(null)
          location.reload()
        })
      },
    },
  }
</script>

<style scoped>
  @import "../../assets/css/vars";

  .navbar {
    background-color: #262626;
    height: calc($nav-bar-height + 1px);
    line-height: $nav-bar-height;
    border-radius: 0px !important;
    padding: 0 20px 0 0;

    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      fill: white;
      padding: 0 10px;
    }

    .avatar-container {
      height: 24px;
      line-height: 24px;
      float: right;
      margin-top: 13px;
      font-size:12px;
      font-family:PingFang-SC-Regular;
      font-weight:400;

      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        color: #BBBBBB;

        .el-icon-caret-bottom {
          font-size: 12px;
        }
      }
    }

    .lnk-login {
      color: #BBBBBB;
      float: right;
      margin-right: 1em;
      font-size: 14px;
    }
  }
</style>

