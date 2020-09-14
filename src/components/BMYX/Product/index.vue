<template>
    <div class="tableContain">
        <div class="table_tool clearfix">
            <div class="search float-l">
                <el-input
                    v-model="search.text"
                    class="input-with-select"
                    placeholder="请输入搜索关键字"
                >
                    <el-select
                        v-model="search.type"
                        slot="prepend"
                        placeholder="请选择类别"
                    >
                        <el-option
                            selected
                            value="name"
                            label="商品名称"
                        ></el-option>
                        <el-option
                            value="sort"
                            label="商品类别"
                        ></el-option>
                    </el-select>
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="handleSearch()"
                    ></el-button>
                </el-input>
            </div>
            <el-button
                type="primary"
                class="float-r"
                icon="el-icon-plus"
                @click="addItemVisible = true"
            >新增一笔</el-button>
        </div>
        <el-table
            border
            stripe
            style="width: 100%"
            :data="dataList"
            highlight-current-row
        >
            <el-table-column
                sortable
                prop="id"
                label="id"
            ></el-table-column>
            <el-table-column
                sortable
                prop="name"
                width="110"
                label="商品名称"
            ></el-table-column>
            <el-table-column
                sortable
                label="商品类别"
            >
                <template slot-scope="scope">
                    <span>{{ scope.row.sort.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="nowPrice"
                label="平台价格"
            ></el-table-column>
            <el-table-column
                prop="oldPrice"
                label="市面价格"
            ></el-table-column>
            <el-table-column
                label="商品图片"
                prop="imgSrcList"
            >
                <template slot-scope="scope">
                    <el-image
                        style="width: 60px; height: 60px"
                        :src="`${$store.state.server_url}/upload/${scope.row.imgSrcList[0]}`"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column
                width="240"
                prop="detail"
                label="商品介绍"
            ></el-table-column>
            <el-table-column
                prop="ban"
                width="150"
                label="状态"
            >
                <template slot-scope="scope">
                    <div
                        v-if="!scope.row.ban"
                        class="text-c ban"
                    >
                        <el-tag
                            class="tag"
                            effect="dark"
                            type="success"
                        >上架成功</el-tag>
                        <el-switch
                            v-model="scope.row.ban"
                            title="点击切换状态"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="banSwitchToTrue(scope.row.id, scope.$index)"
                        ></el-switch>
                    </div>
                    <div
                        v-else
                        class="text-c ban"
                    >
                        <el-tag
                            type="danger"
                            effect="dark"
                        >已下架</el-tag>
                        <el-switch
                            v-model="scope.row.ban"
                            title="点击切换状态"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="banSwitchToFalse(scope.row.id, scope.$index)"
                        ></el-switch>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                sortable
                width="101"
                label="近期修改"
                prop="updatedAt"
            ></el-table-column>
            <el-table-column
                width="140"
                label="操作"
                fixed="right"
            >
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
        <el-pagination
            class="text-l"
            style="margin-top: 10px;"
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="10"
            :page-sizes="[10, 20, 30, 40]"
            :total="pagination.total"
            :current-page="pagination.currentPage"
            @size-change="paginationSizeChange"
            @current-change="paginationCurrentChange"
        ></el-pagination>

        <check-product
            :drawer-visible="itemCheckVisible"
            :item="itemValue"
            @close="closeItemCheck"
        />

        <creat-new-product
            :visible="addItemVisible"
            @close="closeAddItem"
        />

        <edit-product
            :dialog-visible="itemEditorVisible"
            :form-item="itemValue"
            @close="closeItemEditor"
        />
    </div>
</template>

<script>
import EditProduct from "./component/EditProduct.vue";
import CheckProduct from "./component/CheckProduct.vue";
import CreatNewProduct from "./component/CreatNewProduct.vue";

export default {
    name: "ProductManagement",
    components: {
        CreatNewProduct,
        EditProduct,
        CheckProduct,
    },
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
                size: 10,
            },
        };
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
                res_data = await this.searchByNameOrSort(
                    size,
                    currentPage,
                    this.search,
                    isfirst
                );
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
                this.setDataList(this.pagination.size, 1, true);
            } else {
                this.$message({
                    type: "warning",
                    message: "请输入搜索关键字",
                });
            }
        },

        /**
         * 商品下架
         */
        banSwitchToFalse(id, index) {
            const params = {
                id: id,
                ban: false,
            };
            this.changeProductBan(params, index);
        },

        /**
         * 商品上架
         */
        banSwitchToTrue(id, index) {
            const params = {
                id: id,
                ban: true,
            };
            this.changeProductBan(params, index);
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
         * 商品上下架
         */
        async changeProductBan(params, index) {
            let res = await this.$HttpApi.changeProductBan(params);
            if (res.status === 200 && res.data.code === 1000) {
                if (!res.data.data.rows[0].ban) {
                    this.$message({
                        type: "success",
                        message: `${res.data.data.rows[0].name}上架成功！`,
                    });
                } else {
                    this.$message({
                        type: "warning",
                        message: `${res.data.data.rows[0].name}下架成功！`,
                    });
                }
            } else {
                this.$message.error("操作失败请重试");
                this.dataList[index].ban = !params.ban;
            }
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
.ban {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: space-around;
    justify-content: space-around;
    flex-wrap: wrap;
}
</style>