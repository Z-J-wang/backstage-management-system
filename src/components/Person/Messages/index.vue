<template>
    <div class="tableContain">
        <el-table
            :data="messages"
            class="nowrap"
            stripe
            border
            style="width: 100%"
            highlight-current-row
        >
            <el-table-column
                prop="name"
                label="发信人"
                sortable
            ></el-table-column>
            <el-table-column
                prop="datetime"
                label="发信时间"
                sortable
                width="240"
            ></el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="240"
            ></el-table-column>
            <el-table-column
                prop="website"
                label="网站"
            ></el-table-column>
            <el-table-column
                prop="subject"
                label="主题"
            ></el-table-column>
            <el-table-column
                prop="content"
                label="内容"
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
import itemEditor from "./component/ItemEditor.vue";
import itemCheck from "./component/ItemCheck.vue";
export default {
    name: "messages",
    data() {
        return {
            itemEditorVisible: false,
            itemCheckVisible: false,
            itemValue: {
                id: 1,
                title: "",
                publishTime: "",
                href: "",
                imgSrc: "",
                digest: ""
            },
            messages: [
                {
                    id: 1,
                    name: "Jay",
                    email: "123@qq.com",
                    website: "www.jay.com",
                    subject: "web 开发",
                    content: `最早的软件都是运行在大型机上的，软件使用者通过“哑终端”登陆到大型机上去运行软件。后来随着PC机的兴起，软件开始主要运行在桌面上，而数据库这样的软件运行在服务器端，这种Client/Server模式简称CS架构。

随着互联网的兴起，人们发现，CS架构不适合Web，最大的原因是Web应用程序的修改和升级非常迅速，而CS架构需要每个客户端逐个升级桌面App，因此，Browser/Server模式开始流行，简称BS架构。

在BS架构下，客户端只需要浏览器，应用程序的逻辑和数据都存储在服务器端。浏览器只需要请求服务器，获取Web页面，并把Web页面展示给用户即可。`,
                    datetime: "2020-7-16 21:56:00"
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