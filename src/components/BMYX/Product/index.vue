<template>
    <div class="tableContain">
        <div class="table_tool clearfix">
            <div class="search float-l">
                <el-input placeholder="请输入搜索关键字" v-model="search.text" class="input-with-select">
                    <el-select v-model="search.type" slot="prepend" placeholder="请选择类别">
                        <el-option label="商品名称" value="name" selected></el-option>
                        <el-option label="商品类别" value="sort"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
                </el-input>
            </div>
            <el-button
                class="float-r"
                type="primary"
                icon="el-icon-plus"
                @click="addItemVisible = true"
            >新增一笔</el-button>
        </div>
        <el-table :data="dataList" stripe border style="width: 100%" highlight-current-row>
            <el-table-column prop="id" label="id" sortable></el-table-column>
            <el-table-column prop="name" label="商品名称" sortable width="110"></el-table-column>
            <el-table-column label="商品类别" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.sort.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="nowPrice" label="平台价格"></el-table-column>
            <el-table-column prop="oldPrice" label="市面价格"></el-table-column>
            <el-table-column prop="imgSrcList" label="商品图片">
                <template slot-scope="scope">
                    <el-image
                        style="width: 60px; height: 60px"
                        :src="`${$store.state.server_url}/upload/${scope.row.imgSrcList[0]}`"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="商品介绍" width="240"></el-table-column>
            <el-table-column prop="updatedAt" label="近期修改" width="101" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
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
        ></el-pagination>

        <item-editor
            :dialog-visible="itemEditorVisible"
            :form-item="itemValue"
            @close="closeItemEditor"
        ></item-editor>

        <item-check :drawer-visible="itemCheckVisible" :item="itemValue" @close="closeItemCheck"></item-check>

        <add-item :visible="addItemVisible" @close="closeAddItem"></add-item>
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
                imgSrcList: "",
                detail: "",
            },
            search: {
                // 查询信息
                type: "name",
                text: "",
            },
            dataList: [{}],
            pagination: {
                total: 0,
                currentPage: 1,
                size: 1,
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

        async setDataList(size, currentPage, selectCond, isfirst) {
            let res_data = {};
            this.dataList.length = 0;
            if (this.search.text) {
                 res_data = await this.searchByNameOrSort(size, currentPage, this.search, isfirst);
            } else {
                res_data = await this.getData(size, currentPage, selectCond);
            }
            this.dataList = [...res_data.rows];
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

        /**
         * 搜索
         */
        async handleSearch() {
            if (this.search.text) {
                this.setDataList(this.pagination.size, 1, true)
            } else {
                this.$message({
                    type: "warning",
                    message: "请输入搜索关键字",
                });
            }
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
                console.log(res.data.data.rows);
            } else {
                this.$message.error(res.data.msg);
            }

            return data;
        },

        /**
         * 根据 name 或者 sort 进行搜索
         */
        async searchByNameOrSort(size, currentPage, search, isfirst = false) {
            let params = Object.assign(
                {
                    pageSize: size || this.pagination.size,
                    start: isfirst
                        ? 0
                        : (currentPage - 1) * this.pagination.size +
                              this.dataList.length || 0,
                },
                search
            );
            let res = await this.$HttpApi.searchByNameOrSort(params);
            let data = [];
            if (res.status === 200 && res.data.code === 1000) {
                this.dataList = [...res.data.data.rows];
                console.log(res.data.data.rows);
                console.log(this.dataList);
                this.pagination.total = res.data.data.count;
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
        .el-select .el-input {
            width: 130px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
    }
}
</style>
<style lang="less">
.table_tool {
    .search {
        width: 600px;
        .el-select .el-input {
            width: 130px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
    }
}
</style>