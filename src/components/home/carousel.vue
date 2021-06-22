<template>
  <div class="carousel">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item"></el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="less" scoped>
.carousel {
  padding: 0 100px;
  background-color: #fff;
  // box-shadow: 0 4px 4px #fff;
  .el-carousel {
    /deep/ * {
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
}
</style>
