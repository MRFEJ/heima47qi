<template>
  <div class="box">
    <el-dialog destroy-on-close fullscreen title="编辑题库测试" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="subject" label="学科" :label-width="formLabelWidth">
          <subjectSeleted v-model="form.subject"></subjectSeleted>
        </el-form-item>

        <el-form-item prop="step" label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="enterprise" label="企业" :label-width="formLabelWidth">
          <enterpriseSeleted v-model="form.enterprise"></enterpriseSeleted>
        </el-form-item>

        <el-form-item prop="city" label="城市" :label-width="formLabelWidth">
          <Cascader v-model="form.city"></Cascader>
        </el-form-item>

        <el-form-item prop="type" label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item prop="difficulty" label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="试题标题" class="titles" prop="title" :label-width="formLabelWidth">
          <wangeditor v-model="form.title"></wangeditor>
        </el-form-item>

        <!-- 简答单选 -->
        <el-form-item
          prop="single_select_answer"
          v-if="form.type==1"
          label="单选"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.single_select_answer">
            <selectXz
              v-for="(item, index) in form.select_options"
              :isok="true"
              :text.sync="item.text"
              :img.sync="item.image"
              :lable="item.label"
              :key="index"
            ></selectXz>
          </el-radio-group>
        </el-form-item>

        <!-- 简答多选 -->
        <el-form-item
          prop="multiple_select_answer"
          v-if="form.type==2"
          label="多选"
          :label-width="formLabelWidth"
        >
          <el-checkbox-group v-model="form.multiple_select_answer">
            <selectXz
              v-for="(item, index) in form.select_options"
              :isok="false"
              :text.sync="item.text"
              :img.sync="item.image"
              :lable="item.label"
              :key="index"
            ></selectXz>
          </el-checkbox-group>
        </el-form-item>

        <!-- 简答文本域 -->
        <el-form-item
          prop="short_answer"
          v-if="form.type==3"
          label="简答"
          :label-width="formLabelWidth"
        >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
        </el-form-item>

        <!-- 分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 上传视频 -->
        <el-form-item :label-width="formLabelWidth" label="解析视频">
          <el-upload
            v-model="form.video"
            class="avatar-uploader"
            :action="videoUp"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            prop="video"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
          </el-upload>
          <video :src="videoUrl" controls></video>
        </el-form-item>

        <!-- 分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 富文本 -->
        <el-form-item
          label="答案解析"
          class="answer_analyze"
          prop="answer_analyze"
          :label-width="formLabelWidth"
        >
          <wangeditor v-model="form.answer_analyze"></wangeditor>
        </el-form-item>

        <!-- 分割线 -->
        <el-form-item label-width="0px">
          <el-divider></el-divider>
        </el-form-item>

        <!-- 文本域 -->
        <el-form-item prop="remark" label="试题备注" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增题目的方法
import { questionEdit } from "@/api/question.js";

// 导入选择题组件
import selectXz from "./selectXz";
// 导入级联动组件
import Cascader from "./Cascader";
// 导入富文本组件
import wangeditor from "./wangeditor";
export default {
  name: "questionEdit",
  components: {
    Cascader,
    wangeditor,
    selectXz
  },
  data() {
    return {
      isCom: true,
      videoUp: process.env.VUE_APP_URL + "/question/upload",
      videoUrl: "",
      dialogFormVisible: false,
      form: {
        video: "",
        // 多选框选中的选项
        multiple_select_answer: [],
        type: "1",
        // 简答题答案
        short_answer: "",
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      rules: {
        subject: [
          { required: true, message: "学科不能留空", trigger: "change" }
        ],
        step: [{ required: true, message: "阶段不能留空", trigger: "change" }],
        enterprise: [
          { required: true, message: "企业不能留空", trigger: "change" }
        ],
        city: [{ required: true, message: "城市不能留空", trigger: "change" }],
        type: [
          { required: true, message: "题型必须选一个", trigger: "change" }
        ],
        difficulty: [
          { required: true, message: "难度必须选一个", trigger: "change" }
        ],
        title: [{ required: true, message: "标题不能留空", trigger: "blur" }],
        single_select_answer: [
          { required: true, message: "单选不能留空", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "多选不能留空", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "简答题不能留空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能留空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "试题备注不能留空", trigger: "blur" }
        ]
      },

      formLabelWidth: "300px"
    };
  },
  methods: {
    // 点击确定按钮
    sure() {
      this.$refs.form.validate(v => {
        if (v) {
          questionEdit(this.form).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("新增成功!");
              this.$parent.Page = 1;
              this.$parent.list();
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      // window.console.log(res);
      this.video = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.box {
  // 对话框
  .el-dialog.is-fullscreen {
    width: 1000px;
    top: 0.1px;
    .avatar-uploader {
      text-align: left;
    }
    // 输入框标题
    .el-form-item__label {
      padding-right: 41px;
    }
    // 输入框
    .el-form-item__content .el-input__inner {
      width: 300px;
    }
    // 底部确定按钮
    .dialog-footer {
      text-align: center;
    }
    .el-divider--horizontal {
      width: 600px;
      margin: 0 auto;
    }
    .titles {
      .el-form-item__content {
        margin-left: 230px !important;
      }
    }
  }
}
</style>