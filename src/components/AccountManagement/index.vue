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
            <el-button type="primary" icon="el-icon-plus" @click="addItemVisible = true">新增账户</el-button>
        </div>
        <el-table
            :data="dataList"
            class="nowrap"
            stripe
            border
            style="width: 100%"
            highlight-current-row
        >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="id" label="id" sortable></el-table-column>
            <el-table-column prop="account" label="账户" sortable></el-table-column>
            <el-table-column prop="password" label="密码" sortable></el-table-column>
            <el-table-column prop="auth" label="等级" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="itemChange(scope.row)"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        size="small"
                        title="编辑"
                    ></el-button>
                    <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        style="padding-left: 9px"
                        @onConfirm="delConfirm(scope.row.id)"
                    >
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="small"
                            title="移除"
                            slot="reference"
                        ></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <item-editor
            :dialog-visible="itemEditorVisible"
            :form-item="itemValue"
            @close="closeItemEditor"
        ></item-editor>

        <add-item :visible="addItemVisible" @close="closeAddItem"></add-item>
    </div>
</template>

<script>
import itemEditor from "./component/ItemEditor.vue";
import addItem from "./component/AddItem.vue";

export default {
    name: "",
    data() {
        return {
            addItemVisible: false,
            itemEditorVisible: false,
            itemCheckVisible: false,
            itemValue: {
                id: 1,
                account: "",
                password: "",
                auth: "",
            },
            dataList: [{}],
        };
    },
    components: {
        itemEditor,
        addItem,
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
            let res = await this.$HttpApi.getAccountByCond(selectCond);
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
                    message: "删除成功！",
                    type: "success",
                });
                this.setDataList();
            } else {
                this.$message.error(res.data.msg);
            }
        },
    },
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