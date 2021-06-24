<template>
  <div class="list">
    <div class="toolbar">
      <el-button @click="reset">全部</el-button>
      <el-button v-show="sort === 'desc'" @click="sort = 'asc'">时间降序</el-button>
      <el-button v-show="sort === 'asc'" @click="sort = 'desc'">时间升序</el-button>
      <el-select v-model="type" placeholder="分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="searchKey" placeholder="请输入关键字"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <div class="list-contain">
      <card v-for="item in 10" :key="item"></card>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="11"
        :hide-on-single-page="true"
        @current-change="paginationChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import card from '@/components/home/card.vue';
export default {
  name: 'lists',
  components: { card },
  data() {
    return {
      options: ['asdas', 'ssdsds'],
      searchKey: '',
      type: '',
      sort: 'desc',
      pagination: {
        size: 10,
        page: 1
      }
    };
  },
  methods: {
    // 切换分页
    paginationChange(page) {
      this.pagination.page = page;
    },
    // 重置
    reset() {
      this.searchKey = '';
      this.type = '';
      this.sort = 'desc';
      this.pagination.size = 1;
    },
    // 查询
    search() {
      this.pagination.size = 1;
    },
    select() {
      const params = {
        search: this.searchKey,
        type: this.type,
        sort: this.sort,
        pageSize: this.pagination.size,
        page: this.pagination.page
      };
      console.log(params);
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  padding: 15px;
  text-align: left;
  .toolbar {
    color: #5e665b;
    padding-bottom: 16px;
    border-bottom: 1px solid #8a988e;

    .el-select {
      margin-left: 10px;
    }
    .el-input {
      margin-left: 10px;
      margin-right: 10px;
      width: 200px;
    }
    .el-button:focus,
    .el-button:hover {
      color: #5d3131;
      border-color: #5d313173;
      background-color: #5d313173;
    }
    /deep/.el-button--primary {
      background-color: #5d3131;
      border-color: #5d3131;
    }
    /deep/.el-input.is-active .el-input__inner,
    /deep/.el-input__inner:focus {
      border-color: #5d3131;
    }
    /deep/.el-select .el-input.is-focus .el-input__inner {
      border-color: #5d3131;
    }
  }
  .list-contain {
    padding: 20px 0;
  }
  .pagination {
    padding-top: 0;
    padding-bottom: 20px;
    text-align: right;
    /deep/ .el-pagination {
      &.is-background .el-pager li:not(.disabled):hover {
        color: #6e8b74;
      }
      &.is-background .el-pager li:not(.disabled).active {
        background-color: #8a988e;
        color: #fff;
      }
    }
  }
}
</style>
