<template>
  <div>
    <home-header></home-header>
    <slot></slot>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import homeHeader from '@/components/home/header.vue';
export default {
  name: 'home',
  components: { homeHeader }
};
</script>