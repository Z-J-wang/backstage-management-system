<template>
  <div class="progress-skill">
    <el-progress type="circle" :percentage="percentage" :color="colors"></el-progress>
    <p>{{ skill }}</p>
  </div>
</template>

<script>
export default {
  name: 'progress-skill',
  props: {
    skill: {
      type: String,
      require: true
    },
    percentage: {
      type: Number,
      require: true,
      default: 0
    }
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
  }
};
</script>
