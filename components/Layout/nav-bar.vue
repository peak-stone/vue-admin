<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    ></hamburger>

    <breadcrumb v-if="showBreadCrumb"></breadcrumb>
    <el-dropdown v-if="userInfo && userInfo.username" class="avatar-container">
      <div class="avatar-wrapper">
        {{ userInfo.username }}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item v-for="(navItem, navIndex) in navbar"
          :key="'navbar-' + navIndex">
          <span style="display:block;" @click="clickNavItem(navItem)">{{ $t(navItem.title) }}</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
      navbar: state => state.app.navbar,
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
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    clickNavItem(item) {
      this.$router.push({
        path: item.path
      })
    },
    logout() {
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
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;

    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      color: #bbbbbb;

      .el-icon-caret-bottom {
        font-size: 12px;
      }
    }
  }

  .lnk-login {
    color: #bbbbbb;
    float: right;
    margin-right: 1em;
    font-size: 14px;
  }
}
</style>

