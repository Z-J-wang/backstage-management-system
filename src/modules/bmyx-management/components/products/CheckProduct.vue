<template>
	<el-drawer
		title="详情"
		direction="ltr"
		:before-close="handleClose"
		:visible.sync="drawerVisible"
	>
		<el-row class="text-l">
			<el-col :span="8">商品名称：</el-col>
			<el-col :span="16">{{ item.name }}</el-col>
		</el-row>
		<el-row class="text-l">
			<el-col :span="8">商品类别：</el-col>
			<el-col :span="16">{{ item.sort.name }}</el-col>
		</el-row>
		<el-row class="text-l">
			<el-col :span="8">平台价格:</el-col>
			<el-col :span="16">{{ item.nowPrice }}</el-col>
		</el-row>
		<el-row class="text-l">
			<el-col :span="8">市面价格:</el-col>
			<el-col :span="16">{{ item.oldPrice }}</el-col>
		</el-row>
		<el-row class="text-l">
			<el-col :span="8">商品图片:</el-col>
			<el-col :span="16">
				<el-row style="padding: 0" :gutter="10">
					<el-col v-for="imgSrc in imageList" :key="imgSrc" :span="12">
						<el-image :src="imgSrc" :preview-src-list="imageList"></el-image>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row class="text-l">
			<el-col :span="8">商品介绍:</el-col>
			<el-col class="text-indent-en" :span="16">{{ item.detail }}</el-col>
		</el-row>
	</el-drawer>
</template>

<script>
export default {
	name: "CheckProduct",
	props: {
		drawerVisible: {
			type: Boolean,
			default: false
		},

		item: {
			type: Object
		}
	},
	data() {
		return {
			imageList: []
		};
	},

	watch: {
		item() {
			this.imageList = [];
			this.item.imgSrcList.forEach(element => {
				this.imageList.push(
					`${this.$store.state.server_url}/upload/${element}`
				);
			});
		}
	},

	methods: {
		handleClose() {
			this.$emit("close");
		}
	}
};
</script>

<style lang="less" scoped>
.el-row {
	margin-bottom: 50px;
	padding: 0 30px;
}
</style>
