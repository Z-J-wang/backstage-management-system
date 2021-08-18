<template>
  <div class="dashboard">
    <el-progress type="dashboard" :percentage="value" :color="colors"></el-progress>
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="decrease"></el-button>
        <el-button icon="el-icon-plus" @click="increase"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    };
  },
  methods: {
    increase() {
      let percentage = this.value;
      percentage += 10;
      if (percentage > 100) {
        percentage = 100;
      }
      this.$emit('change', percentage);
    },
    decrease() {
      let percentage = this.value;
      percentage -= 10;
      if (percentage < 0) {
        percentage = 0;
      }
      this.$emit('change', percentage);
    }
  }
};
</script>
