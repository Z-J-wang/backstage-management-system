<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button
                type="primary"
                icon="el-icon-plus"
                @click="addBlogVisible = true"
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
                prop="title"
                label="博客标题"
                sortable
            ></el-table-column>
            <el-table-column
                prop="publishTime"
                label="发布时间"
                sortable
                width="240"
            ></el-table-column>
            <el-table-column
                prop="href"
                label="博客链接"
                width="240"
            ></el-table-column>
            <el-table-column
                prop="imgSrc"
                label="博客图片链接"
            ></el-table-column>
            <el-table-column
                prop="digest"
                label="摘要"
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
                        @onConfirm="delItem(scope.row.id)"
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

        <create-new-blog
            :dialog-visible="addBlogVisible"
            @close="closeAddBlog"
        />

        <edit-blog
            :dialog-visible="itemEditorVisible"
            :form-item="itemValue"
            @close="closeItemEditor"
        />

        <check-blog
            :drawer-visible="itemCheckVisible"
            :item="itemValue"
            @close="closeItemCheck"
        />
    </div>
</template>

<script>
import CreateNewBlog from "./component/CreateNewBlog.vue";
import EditBlog from "./component/EditBlog.vue";
import CheckBlog from "./component/CheckBlog.vue";

export default {
    name: "BlogManagement",
    data() {
        return {
            addBlogVisible: false,
            itemCheckVisible: false,
            itemEditorVisible: false,
            itemValue: {}, // 传递给子组件
            dataList: [],
            pagination: {
                total: 0,
                currentPage: 1,
                size: 10,
            },
        };
    },
    components: {
        EditBlog,
        CheckBlog,
        CreateNewBlog,
    },
    mounted() {
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

        closeAddBlog() {
            this.addBlogVisible = false;
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
            let data = await this.getBlogs();
            if (data) {
                this.dataList = data.rows;
            }
        },

        /**
         * 删除博客
         */
        async delItem(id) {
            let data = await this.deleteBlog(id);
            if (data) {
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
                this.getData();
            }
        },

        /***************************** ajax 操作部分 Start  *********************************/
        /**
         * 获取博客列表
         */
        async getBlogs(size, currentPage, selectCond) {
            let params = {
                cond: selectCond,
                pageSize: size || this.pagination.size,
                start:
                    (currentPage - 1) * this.pagination.size +
                        this.dataList.length || 0,
            };

            let res = await this.$HttpApi.getBlogs(params);
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
        async deleteBlog(id) {
            let res = await this.$HttpApi.deleteBlog({ id: id });
            let data = {};
            if (res.status === 200 && res.data.code === 1000) {
                data = res.data.msg;
            } else {
                this.$message.error(res.data.msg);

                return false;
            }

            return data;
        },
        /***************************** ajax 操作部分 End  *********************************/
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