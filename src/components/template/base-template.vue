<template>
  <div class="base-template">
    <home-header></home-header>
    <div class="main">
      <slot></slot>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import homeHeader from '@/components/Home/header.vue';
export default {
  name: 'home',
  components: { homeHeader }
};
</script>

<style lang="less" scoped>
.base-template {
  min-height: 100vh;
  background-color: #e9eaed;
  .main{
    height: calc(100vh - 62px - 53px);
  }
}
</style>
