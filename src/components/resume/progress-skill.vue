<template>
  <div class="progress-skill">
    <el-progress type="circle" :percentage="percentage"></el-progress>
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
  }
};
</script>
