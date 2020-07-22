<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button type="primary" icon="el-icon-plus" @click="itemEditorVisible = true">新增一笔</el-button>
        </div>
        <el-table
            :data="dataList"
            class="nowrap"
            stripe
            border
            style="width: 100%"
            highlight-current-row
        >
            <el-table-column prop="id" label="id" sortable></el-table-column>
            <el-table-column prop="name" label="菜品" sortable width="240"></el-table-column>
            <el-table-column prop="nowPrice" label="今天价格"></el-table-column>
            <el-table-column prop="oldPrice" label="昨天价格"></el-table-column>
            <el-table-column prop="imgSrc" label="图片">
                <template slot-scope="scope">
                    <el-image
                        style="width: 80px; height: 80px"
                        :src="scope.row.imgSrc"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="detail" label="介绍"></el-table-column>
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

        <item-check :drawer-visible="itemCheckVisible" :item="itemValue" @close="closeItemCheck"></item-check>
    </div>
</template>

<script>
import itemEditor from "./component/ItemEditor.vue";
import itemCheck from "./component/ItemCheck.vue";
export default {
    name: "",
    data() {
        return {
            itemEditorVisible: false,
            itemCheckVisible: false,
            itemValue: {
                id: 1,
                name: "",
                nowPrice: "",
                oldPrice: "",
                imgSrc: "",
                detail: ""
            },
            dataList: [
                {
                    id: 1,
                    name: "上海青",
                    nowPrice: "10.00",
                    oldPrice: "9.00",
                    imgSrc: "https://imagecdn.gaopinimages.com/133208523423.jpg?x-image-process=style/H650_WN_MC",
                    detail: "上海青"
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