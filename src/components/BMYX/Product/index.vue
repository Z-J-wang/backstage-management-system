<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button
                type="primary"
                icon="el-icon-plus"
                @click="addItemVisible = true"
            >新增一笔</el-button>
        </div>
        <el-table
            :data="dataList"
            class="nowrap"
            stripe
            border
            style="width: 100%"
            highlight-current-row
        >
            <el-table-column
                prop="id"
                label="id"
                sortable
            ></el-table-column>
            <el-table-column
                prop="name"
                label="菜品"
                sortable
                width="240"
            ></el-table-column>
            <el-table-column
                label="类别"
                sortable
            >
                <template slot-scope="scope">
                    <span>{{ scope.row['sort.name'] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="nowPrice"
                label="今天价格"
            ></el-table-column>
            <el-table-column
                prop="oldPrice"
                label="昨天价格"
            ></el-table-column>
            <el-table-column
                prop="imgSrc"
                label="图片"
            >
                <template slot-scope="scope">
                    <el-image
                        style="width: 50px; height: 50px"
                        :src="`${$store.state.server_url}/upload/${scope.row.imgSrc}`"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="detail"
                label="介绍"
            ></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="140"
            >
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="itemCheck(scope.row)"
                        icon="el-icon-view"
                        circle
                        size="small"
                        title="查看"
                    ></el-button>
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
        <el-pagination
            @size-change="paginationSizeChange"
            @current-change="paginationCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            class="text-l"
            style="margin-top: 10px;"
        >
        </el-pagination>

        <item-editor
            :dialog-visible="itemEditorVisible"
            :form-item="itemValue"
            @close="closeItemEditor"
        ></item-editor>

        <item-check
            :drawer-visible="itemCheckVisible"
            :item="itemValue"
            @close="closeItemCheck"
        ></item-check>

        <add-item
            :visible="addItemVisible"
            @close="closeAddItem"
        ></add-item>
    </div>
</template>

<script>
import itemEditor from "./component/ItemEditor.vue";
import itemCheck from "./component/ItemCheck.vue";
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
                name: "",
                sort: "",
                nowPrice: "",
                oldPrice: "",
                imgSrc: "",
                detail: "",
            },
            dataList: [{}],
            pagination: {
                total: 0,
                currentPage: 1,
                size: 10,
                currentPage: 1,
            },
        };
    },
    components: {
        itemEditor,
        itemCheck,
        addItem,
    },
    mounted() {
        this.setDataList();
    },
    methods: {
        delConfirm(id) {
            this.delProduct(id);
        },

        async setDataList(size, currentPage, selectCond) {
            this.dataList.length = 0;
            let res_data = await this.getData(size, currentPage, selectCond);
            this.dataList = res_data.rows;
            this.pagination.total = res_data.count;
        },

        /**
         * 分页控件，size change 事件
         */
        paginationSizeChange(val) {
            this.setDataList(val, this.pagination.currentPage);
            console.log(`每页 ${val}条`);
        },

        /**
         * 分页控件，换页事件
         */
        paginationCurrentChange(val) {
            this.setDataList(this.pagination.size, val);
            console.log(`当前页: ${val}`);
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

        // ajax 部分
        /**
         * 条件查询
         * @param selectCond
         * @param size 每页的记录条数
         * @param currentPage 当前页数
         */
        async getData(size, currentPage, selectCond) {
            let params = {
                cond: selectCond,
                pageSize: size || this.pagination.size,
                start:
                    (currentPage - 1) * this.pagination.size +
                        this.dataList.length || 0,
            };

            let res = await this.$HttpApi.getBMYXProductList(params);
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
        async delProduct(id) {
            let res = await this.$HttpApi.delProduct({ id: id });

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
    .table_tool {
        margin-bottom: 20px;
        padding-right: 25px;
        text-align: right;
    }
}
</style>