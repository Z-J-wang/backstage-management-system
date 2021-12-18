<template>
  <div class="describe-setting">
    <h4>{{name}}</h4>
    <div class="describe">
      <p>{{describe}}</p>
    </div>
    <div>
      <span>
        {{name}} ：
      </span>
      <el-input
        v-bind="$attrs"
        v-on="$listeners"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'describe-setting',
  props: {
    describe: String,
    name: String
  },
  data() {}
};
</script>

<style lang="less" scoped>
.describe-setting {
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
  h4 {
    padding-left: 10px;
  }
  .describe {
    padding: 5px 10px;
    background-color: #fafafa;
    p {
      text-align: left;
    }
  }

  & > div:not(.describe) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10px 0;
    padding-right: 10px;
    span {
      padding-right: 20px;
    }
    .el-input {
      width: 400px;
    }
  }
}
</style>
