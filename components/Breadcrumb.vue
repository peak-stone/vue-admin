<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item v-if="item.name" :key="item.path">
          <span
            v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
            class="no-redirect"
          >{{ generateTitle(item.name) }}</span>

          <router-link v-else :to="item.redirect || item.path" class="parent-breadcrumb">{{ generateTitle(item.name) }}</router-link>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import { generateTitle } from '../utils/i18n'

  export default {
    data () {
      return {
        levelList: null,
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      },
    },
    created () {
      this.getBreadcrumb()
    },
    methods: {
      generateTitle,
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'dashboard') {
          matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
            matched
          )
        }
        this.levelList = matched
      },
    },
  }
</script>

<style scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .parent-breadcrumb {
      color: #999999;
    }
  }
</style>
