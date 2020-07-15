<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button type="primary" icon="el-icon-plus" @click="itemEditorVisible = true">新增一笔</el-button>
        </div>
        <el-table :data="tableData" stripe border style="width: 100%" highlight-current-row>
            <el-table-column prop="theme" label="姓名" width="180"></el-table-column>
            <el-table-column prop="dateTime" label="日期" sortable width="240">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.dateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="地址"></el-table-column>
            <el-table-column fixed="right" label="操作" width="140">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, scope)"
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
    </div>
</template>

<script>
import itemEditor from "./component/ItemEditor.vue";
export default {
    data() {
        return {
            itemEditorVisible: false,

            itemValue: {
                theme: "",
                dateTime: "",
                detail: ""
            },
            tableData: [
                {
                    theme: "王小虎",
                    dateTime: "2016-05-02 至 2020-08-15",
                    detail: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    theme: "王小虎",
                    dateTime: "2017-05-02 至 2020-08-15",
                    detail: "上海市普陀区金沙江路 1518 弄"
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
        itemEditor
    },
    methods: {
        /**
         * 关闭 itemEditor
         */
        closeItemEditor() {
            this.itemEditorVisible = false;
        },
        confirm() {
            alert("confirm");
        },

        /**
         * 编辑一条记录
         * @param  data
         */
        itemChange(data) {
            this.itemValue =Object.assign({}, data);
            this.itemEditorVisible = true;
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