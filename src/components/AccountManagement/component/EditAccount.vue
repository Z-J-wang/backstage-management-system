<template>
	<el-dialog
		:title="title"
		:visible.sync="dialogVisible"
		width="30%"
		:before-close="handleClose"
		:close-on-click-modal="false"
		:destroy-on-close="true"
	>
		<div>
			<el-form
				:model="formItem"
				:rules="rules"
				ref="form"
				label-width="80px"
				label-position="left"
			>
				<el-form-item label="账户" prop="account">
					<el-input
						v-model="formItem.account"
						placeholder="请输入账户"
					></el-input>
				</el-form-item>
				<el-form-item label="权限等级" prop="auth">
					<el-select
						v-model="formItem.auth"
						placeholder="请选择账户权限等级"
						style="width: 100%"
					>
						<el-option
							v-for="item in options"
							:key="item.code"
							:label="item.name"
							:value="item.code"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose">取 消</el-button>
			<el-button type="primary" @click.enter="onSubmit('form')"
				>提 交</el-button
			>
		</span>
	</el-dialog>
</template>
<script>
import valid_rules from "./validate-rule";
export default {
	name: "EditAccount",
	props: {
		dialogVisible: {
			type: Boolean,
			default: false
		},
		formItem: {
			type: Object
		}
	},
	data() {
		return {
			title: "修改用户信息",
			options: [
				{ code: 0, name: "超级管理员" },
				{ code: 1, name: "bmyx管理员" },
				{ code: 2, name: "个人信息管理员" }
			],
			rules: valid_rules
		};
	},
	methods: {
		/**
		 * close 事件
		 */
		handleClose() {
			this.$confirm("确认关闭？")
				.then(() => {
					this.$refs["form"].resetFields();
					this.$emit("close");
				})
				.catch(() => {});
		},

		onSubmit(formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					await this.updatedAccount(this.formItem);
					this.$refs["form"].resetFields();
					this.$emit("close");
				}
			});
		},

		async updatedAccount(data) {
			let ret = await this.$HttpApi.updatedAccount(data);
			if (ret.status === 200) {
				if (ret.data.code == 1000) {
					this.$message({
						message: `修改成功！`,
						type: "success"
					});
					this.$parent.setDataList();
				} else {
					this.$message({
						message: ret.data.msg,
						type: "error"
					});
				}
			} else {
				this.$message.error("系统出错，请重试！");
			}
		}
	}
};
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>