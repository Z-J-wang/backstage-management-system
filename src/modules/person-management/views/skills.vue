<template>
  <div class="tableContain">
    <div class="table_tool">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="itemEditorVisible = true;editType='create'"
      >新增一笔</el-button>
    </div>
    <el-table
      stripe
      border
      class="nowrap"
      style="width: 100%"
      highlight-current-row
      :data="dataList"
    >
      <el-table-column width="180" label="技能" prop="name"></el-table-column>
      <el-table-column sortable label="掌握程度">
        <template slot-scope="scope">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.level"></el-progress>
        </template>
      </el-table-column>
      <el-table-column width="140" label="操作" fixed="right">
        <template slot-scope="scope">
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

    <edit
      :form-item="itemValue"
      :dialog-visible="itemEditorVisible"
      :type="editType"
      @close="closeItemEditor"
    />
  </div>
</template>

<script>
import edit from '@/modules/person-management/components/skills/edit.vue'; // item 编辑器

export default {
  name: 'edu-experience',
  data() {
    return {
      itemEditorVisible: false,
      editType: 'create',
      itemValue: {
        name: '',
        level: ''
      },
      dataList: []
    };
  },

  components: {
    edit
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
      this.editType = 'edit';
    },

    /**
     * 关闭 itemEditor
     */
    closeItemEditor() {
      this.itemEditorVisible = false;
    },

    /**
     * 获取表格数据
     */
    async getData() {
      let data = await this.getDatas();
      if (data instanceof Array && data.length) {
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
      let res = await this.$HttpApi.getSkills();
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
