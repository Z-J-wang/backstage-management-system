<template>
  <div class="aside-contain">
    <h3>
      <slot name="title"></slot>
    </h3>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'aside-contain'
};
</script>

<style lang="less" scoped>
.aside-contain {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  & > h3 {
    margin: 0;
    padding: 10px 15px;
    line-height: 20px;
    font-size: 16px;
    text-align: left;
    background-color: #f8f4ed;
  }
  & > div {
    padding: 10px 15px;
    text-align: left;
    min-height: 200px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
