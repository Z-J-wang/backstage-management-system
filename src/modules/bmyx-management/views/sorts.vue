<template>
  <div class="tableContain">
    <div class="text-l">
      <h4>说明：</h4>
      <p>1. 分类应该存在一个“全部”类别；</p>
      <p>2. 分类最多只能为8个分类，且最好八个；</p>
      <p>3. 商品类别不能设置为“全部”。</p>
    </div>
    <el-divider>
      <i class="el-icon-mobile-phone"></i>
    </el-divider>
    <div class="table_tool">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addItemVisible = true"
      >新增一笔</el-button
      >
    </div>
    <el-table
      border
      stripe
      class="nowrap"
      style="width: 100%"
      highlight-current-row
      :data="dataList"
    >
      <el-table-column width="50" type="index"></el-table-column>
      <el-table-column
        sortable
        prop="id"
        label="id"
        width="240"
      ></el-table-column>
      <el-table-column sortable prop="name" label="分类名称"></el-table-column>
      <el-table-column label="图片" prop="imgSrc">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="`${$store.state.server_url}/upload/${scope.row.imgSrc}`"
          ></el-image>
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
            @onConfirm="delConfirm(scope.row.id)"
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

    <edit-sort
      :form-item="itemValue"
      :dialog-visible="itemEditorVisible"
      @close="closeItemEditor"
    />

    <create-new-sort :visible="addItemVisible" @close="closeAddItem" />
  </div>
</template>

<script>
import CreateNewSort from '@/modules/bmyx-management/components/sorts/CreateNewSort.vue';
import EditSort from '@/modules/bmyx-management/components/sorts/EditSort.vue';

export default {
  name: 'sort-management',
  components: {
    CreateNewSort,
    EditSort
  },

  data() {
    return {
      addItemVisible: false,
      itemEditorVisible: false,
      itemCheckVisible: false,
      itemValue: {
        id: 1,
        name: '',
        imgSrc: ''
      },

      dataList: [{}]
    };
  },

  mounted() {
    this.setDataList();
  },

  methods: {
    delConfirm(id) {
      this.delSort(id);
    },

    async setDataList() {
      this.dataList.length = 0;
      this.dataList = await this.getData();
    },

    /**
		 * 关闭 addItem
		 */
    closeAddItem() {
      this.addItemVisible = false;
    },

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

    // ajax 部分
    /**
		 * 条件查询
		 * @param selectCond
		 */
    async getData(selectCond) {
      let res = await this.$HttpApi.getBMYXSort(selectCond);
      let data = [];
      if (res.status === 200 && res.data.code === 1000) {
        data = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }

      return data;
    },

    /**
		 * 删除指定的 product
		 * @param {number} id
		 */
    async delSort(id) {
      let res = await this.$HttpApi.delSort({ id: id });

      if (res.status === 200 && res.data.code === 1000) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
        this.setDataList();
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
};
</script>

<style scoped lang="less">
.tableContain {
	max-width: 1200px;
	margin-left: 60px;
	margin-bottom: 50px;
	.table_tool {
		margin-bottom: 20px;
		padding-right: 25px;
		text-align: right;
	}
}
</style>
