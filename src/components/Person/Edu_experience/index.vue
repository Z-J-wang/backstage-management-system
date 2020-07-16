<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button
                type="primary"
                icon="el-icon-plus"
                @click="itemEditorVisible = true"
            >新增一笔</el-button>
        </div>
        <el-table
            :data="tableData"
            class="nowrap"
            stripe
            border
            style="width: 100%"
            highlight-current-row
        >
            <el-table-column
                prop="theme"
                label="经历"
                width="180"
            ></el-table-column>
            <el-table-column
                prop="dateTime"
                label="时间"
                sortable
                width="240"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.dateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="detail"
                label="详情"
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
                        @onConfirm="confirm()"
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

        <item-check
            :drawer-visible="itemCheckVisible"
            :item="itemValue"
            @close="closeItemCheck"
        ></item-check>
    </div>
</template>

<script>
import itemEditor from "./component/ItemEditor.vue"; // item 编辑器，新增修改操作
import itemCheck from "./component/ItemCheck.vue"; // item 查看器

export default {
    data() {
        return {
            itemEditorVisible: false,
            itemCheckVisible: false,

            itemValue: {
                theme: "",
                dateTime: "",
                detail: ""
            },
            tableData: [
                {
                    theme: "王小虎",
                    dateTime: "2016-05-02 至 2020-08-15",
                    detail:
                        "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄"
                },
                {
                    theme: "王小虎",
                    dateTime: "2017-05-02 至 2020-08-15",
                    detail:
                        "Periodically, as new functionality is being developed, lessc builds will be published to npm, tagged as beta. These builds will not be published as a @latest official release, and will typically have beta in the version (use lessc -v to get current version)."
                },
                {
                    theme: "王小虎",
                    dateTime: "2018-05-02 至 2020-08-15",
                    detail: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    theme: "王小虎",
                    dateTime: "2019-05-02 至 2020-08-15",
                    detail: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    components: {
        itemEditor,
        itemCheck
    },
    methods: {
        confirm() {
            alert("confirm");
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
        }
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