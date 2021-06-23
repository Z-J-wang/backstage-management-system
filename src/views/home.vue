<template>
  <base-template>
    <carousel></carousel>
    <main>
      <h3>最新发布</h3>
      <div>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
        <card></card>
      </div>
    </main>
  </base-template>
</template>

<script>
import carousel from '@c/home/carousel.vue';
import card from '@/components/home/card.vue';
export default {
  name: 'home',
  components: {
    carousel,
    card
  }
};
</script>
<style lang="less" scoped>
main {
  width: 1180px;
  margin: 40px auto;
  padding: 0 20px;
  border-radius: 4px;
  background-color: #fff;
  h3 {
    color: #5e665b;
    padding: 16px 0;
    border-bottom: 1px solid #8a988e;
  }
}
</style>
