<template>
  <section :class="appMainClass">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain',

    computed: {
      cachedViews () {
        return this.$store.state.tagsView.cachedViews
      },
      key () {
        return this.$route.fullPath
      },
      appMainClass() {
        if (!this.$store.state.tagsView.showTagView) {
          return 'app-main-notags'
        } else {
          return 'app-main'
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/vars";

  .app-main {
    /* 50 = navbar  */
    min-height: calc(100vh - $nav-bar-height - $tags-view-height);
    position: relative;
    overflow: hidden;
  }

  .app-main-notags {
    min-height: calc(100vh - $nav-bar-height - 1px);
    position: relative;
    overflow: hidden;
  }
</style>
