<template>
  <base-template>
    <main>
      <carousel></carousel>
    </main>
  </base-template>
</template>

<script>
import carousel from '@c/Home/carousel.vue';
export default {
  name: 'home',
  components: {
    carousel
  }
};
</script>
<style lang="less" scoped>
main {
  // min-height: 500px;
}
</style>
