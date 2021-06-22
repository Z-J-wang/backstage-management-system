<template>
  <base-template>
    <carousel></carousel>
    <main>
      <el-tabs type="border-card">
        <el-tab-pane label="最近发布">
          <card></card>
          <card></card>
          <card></card>
          <card></card>
          <card></card>
        </el-tab-pane>
      </el-tabs>
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
}
</style>
