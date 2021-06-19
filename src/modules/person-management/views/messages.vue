<template>
  <div class="tableContain">
    <div class="table_tool">
      <el-button type="primary" icon="el-icon-plus" @click="addMessageVisible = true">新增一笔</el-button>
    </div>
    <el-table
      stripe
      border
      class="nowrap"
      style="width: 100%"
      highlight-current-row
      :data="dataList"
    >
      <el-table-column sortable prop="name" label="发信人"></el-table-column>
      <el-table-column sortable width="240" prop="datetime" label="发信时间"></el-table-column>
      <el-table-column width="240" label="邮箱" prop="email"></el-table-column>
      <el-table-column label="网站" prop="website"></el-table-column>
      <el-table-column label="主题" prop="subject"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column width="100" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            circle
            size="small"
            title="查看"
            icon="el-icon-view"
            @click.native.prevent="itemCheck(scope.row)"
          ></el-button>
          <el-popconfirm
            style="padding-left: 9px"
            title="这是一段内容确定删除吗？"
            @onConfirm="delItem(scope.row.id)"
          >
            <el-button
              circle
              size="small"
              title="移除"
              type="danger"
              slot="reference"
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <create-new-message :dialog-visible="addMessageVisible" @close="closeAddMessage" />

    <check-message :drawer-visible="itemCheckVisible" :item="itemValue" @close="closeItemCheck" />
  </div>
</template>

<script>
import CheckMessage from '@/modules/person-management/components/messages/CheckMessage.vue';
import CreateNewMessage from '@/modules/person-management/components/messages/CreateNewMessage.vue';
export default {
  name: 'message-management',
  components: {
    CheckMessage,
    CreateNewMessage
  },

  data() {
    return {
      addMessageVisible: false,
      itemCheckVisible: false,
      itemValue: {
        id: 1,
        name: '',
        datatime: '',
        emial: '',
        website: '',
        subject: '',
        content: ''
      },

      dataList: [],
      pagination: {
        total: 0,
        currentPage: 1,
        size: 10
      }
    };
  },

  created() {
    this.getData();
  },

  methods: {
    /**
     * 关闭 itemEditor
     */
    closeAddMessage() {
      this.addMessageVisible = false;
    },

    /**
     * 查看一条记录
     * @param data
     */
    itemCheck(data) {
      this.itemValue = Object.assign({}, data);
      this.itemCheckVisible = true;
    },

    /**
     * 关闭 itemCheck
     */
    closeItemCheck() {
      this.itemCheckVisible = false;
    },

    /**
     * 获取表格数据
     */
    async getData() {
      let data = await this.getMsgs();
      if (data) {
        this.dataList = data.rows;
      }
    },

    /**
     * 删除博客
     */
    async delItem(id) {
      let data = await this.deleteMsg(id);
      if (data) {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.getData();
      }
    },

    /***************************** ajax 操作部分 Start  *********************************/
    /**
     * 获取信息列表
     */
    async getMsgs(size, currentPage, selectCond) {
      let params = {
        cond: selectCond,
        pageSize: size || this.pagination.size,
        start: (currentPage - 1) * this.pagination.size + this.dataList.length || 0
      };

      let res = await this.$HttpApi.getMsgs(params);
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }

      return data;
    },

    /**
     * 删除
     */
    async deleteMsg(id) {
      let res = await this.$HttpApi.deleteMsg({ id: id });
      let data = {};
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.msg;
      } else {
        this.$message.error(res.data.msg);

        return false;
      }

      return data;
    }
    /***************************** ajax 操作部分 End  *********************************/
  }
};
</script>

<style scoped lang="less">
.tableContain {
  max-width: 1200px;
  margin-left: 60px;
  .table_tool {
    margin-bottom: 20px;
    padding-right: 25px;
    text-align: right;
  }
}
</style>
