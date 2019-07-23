<template>
  <div class="container">
    <div class="title">
      <span>修改公告</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col
          :lg="16"
          :md="20"
          :sm="24"
          :xs="24">
          <el-form
            :model="form"
            status-icon
            ref="form"
            label-width="100px"
            v-loading="loading"
            @submit.native.prevent>
            <el-form-item label="标题" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写公告标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="title">
              <tinymce ref="editor" @change="change" :upload_url="uploadUrl" />
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import Tinymce from '@/components/base/tinymce'
import notice from '@/models/notice'

import AppConfig from '@/config/index' // 引入项目配置

export default {
  props: {
    editNoticeId: {
      type: Number,
    },
  },
  components: {
    Tinymce,
  },
  data() {
    return {
      uploadUrl: `${AppConfig.baseUrl}cms/file/`,
      loading: false,
      form: {
        title: '',
        content: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    const res = await notice.getNotice(this.editNoticeId)
    this.form = res
    this.$refs.editor.setContent(res.content)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await notice.editNotice(this.editNoticeId, this.form)
      if (res.error_code === 0) {
        this.$message.success(`${res.msg}`)
        this.$emit('editClose')
      }
    },
    change(val) {
      this.form.content = val
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.editor.setContent('')
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
