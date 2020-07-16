<template>
    <div class="tableContain">
        <div class="table_tool">
            <el-button type="primary" icon="el-icon-plus" @click="itemEditorVisible = true">新增一笔</el-button>
        </div>
        <el-table :data="blogs" stripe border style="width: 100%" highlight-current-row>
            <el-table-column prop="title" label="文章名" width="180"></el-table-column>
            <el-table-column prop="href" label="文章链接" sortable width="240"></el-table-column>
            <el-table-column prop="imgSrc" label="文章图片链接"></el-table-column>
            <el-table-column prop="digest" label="摘要"></el-table-column>
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

import itemEditor from './component/ItemEditor.vue'
export default {
    name: "",
    data() {
        return {
            itemEditorVisible: false,
            blogs: [
                {
                    id: 1,
                    title:
                        "Cum sociis natoque penatibus et magnis dis parturient montes",
                    href: "#",
                    imgSrc: "@/assets/images/blog/1.jpg",
                    digest:
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,"
                }
            ]
        };
    },
    components:{
        itemEditor
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