<template>
  <div class="tableContain">
    <div class="table_tool">
      <el-button type="primary" icon="el-icon-plus" @click="addItemVisible = true">新增一笔</el-button>
    </div>
    <el-table
      stripe
      border
      class="nowrap"
      style="width: 100%"
      highlight-current-row
      :data="dataList"
    >
      <el-table-column width="180" label="经历" prop="theme"></el-table-column>
      <el-table-column sortable width="240" label="时间" prop="dateTime">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.dateTime.join(" 至 ")}}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" prop="detail" show-overflow-tooltip></el-table-column>
      <el-table-column width="140" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            circle
            title="查看"
            size="small"
            icon="el-icon-view"
            @click.native.prevent="itemCheck(scope.row)"
          ></el-button>
          <el-button
            circle
            title="编辑"
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click.native.prevent="itemChange(scope.row)"
          ></el-button>
          <el-popconfirm
            style="padding-left: 9px"
            title="这是一段内容确定删除吗？"
            @onConfirm="delItem(scope.row.id)"
          >
            <el-button
              circle
              title="移除"
              size="small"
              type="danger"
              slot="reference"
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <create :dialog-visible="addItemVisible" @close="closeAddItemVisible" />
    <edit :form-item="itemValue" :dialog-visible="itemEditorVisible" @close="closeItemEditor" />
    <check :item="itemValue" :drawer-visible="itemCheckVisible" @close="closeItemCheck" />
  </div>
</template>

<script>
import create from '@/modules/person-management/components/projects/create.vue'; // item 编辑器
import edit from '@/modules/person-management/components/projects/edit.vue'; // item 编辑器
import check from '@/modules/person-management/components/projects/check.vue'; // item 查看器

export default {
  name: 'edu-experience',
  data() {
    return {
      itemEditorVisible: false,
      addItemVisible: false,
      itemCheckVisible: false,

      itemValue: {
        theme: '',
        dateTime: '',
        detail: ''
      },
      dataList: []
    };
  },

  components: {
    create,
    edit,
    check
  },

  created() {
    this.getData();
  },

  methods: {
    /**
     * 编辑一条记录
     * @param  data
     */
    itemChange(data) {
      this.itemValue = Object.assign({}, data);
      this.itemEditorVisible = true;
    },

    /**
     * 关闭 itemEditor
     */
    closeItemEditor() {
      this.itemEditorVisible = false;
    },

    /**
     * 关闭 addItem
     */
    closeAddItemVisible() {
      this.addItemVisible = false;
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
      let data = await this.getDatas();
      if (data) {
        this.dataList = data;
      }
    },

    /**
     * 删除教育经历
     */
    async delItem(id) {
      let data = await this.deleteJob(id);
      if (data) {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.getData();
      }
    },

    /***************************** ajax 操作部分 Start  *********************************/

    async getDatas() {
      let res = await this.$HttpApi.getProjects();
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
    async deleteJob(id) {
      let res = await this.$HttpApi.deleteProject({ id: id });
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
