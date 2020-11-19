<template>
  <div class="login-page">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <h1>9527监狱小知识</h1>
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="loginForm.username" autocomplete="off">
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="captcha">
        <el-input
          class="captcha"
          type="text"
          v-model="loginForm.captcha"
        ></el-input>
        <span class="svg" v-html="captchaSvg" @click="refreshCaptcha"
          >123456</span
        >
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="success" @click="submitForm('loginForm')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
    <video
      class="bg_video"
      muted
      src="../../assets/video/112.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>

<script>
// 登录逻辑地实现
// 1、收集用户输入的username&password传递给后端
// 2、登入通过后,将后端返回的token存到本地并跳转到主页
// 3、每次请求的时候,携带token到请求头authorization
// 4、展示token校验正确的数据
// 5、校验不通过,跳转到登录页

import { login, getCaptcha, refreshCaptcha, verifyCaptcha } from "@/api";
import { mapMutations } from "vuex";

export default {
  data() {
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback 校验通过不传参 不通过传参
     */
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到16位（字母，数字，下划线，减号）");
      } else {
        callback();
      }
    };

    // 校验密码
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };

    // 校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (!value || value.length !== 5) {
        callback("请输入验证码");
      } else {
        callback();
      }
    };

    return {
      captchaSvg: "",
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    // 设置验证码
    set_captcha() {
      getCaptcha().then(res => {
        this.captchaSvg = res.data.img;
      });
    },
    // 刷新验证码
    refreshCaptcha() {
      this.set_captcha();
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 代表本地校验通过
          // 先验证验证码是否正确,如果正确在发送登入请求
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          if (!verifyRes.data.state) {
            // 验证码不正确
            this.$message.error("验证码不正确,请重新输入");
            return;
          }

          // 打开登陆加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let { username, password } = this.loginForm;
          // 发送登入请求
          login(username, password)
            .then(res => {
              // 服务器响应,关闭动画
              loading.close();

              if (res.data.state) {
                this.$message.success("恭喜登入成功");
                // 用户名密码正确
                localStorage.setItem("qf2006-token", res.data.token);
                localStorage.setItem(
                  "qf2006-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                // 更改vuex中state['userInfo']
                this.SET_USERINFO(res.data.userInfo);
                // 跳转到主页
                this.$router.push("/Welcome");
              } else {
                // 用户名或密码不正确
                this.$message.error("登入失败(用户名或密码不正确)");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.svg {
  height: 40px;
  width: 40%;
  background: seashell;
  display: flex;
  float: left;
  right: 30px;
  text-align: center;
  cursor: pointer;
}

/* 表单样式 */
html {
  position: relative;
}

video {
  position: relative;
  width: 100%;
  /* height: 100%; */
  z-index: -100;
}

.el-form {
  width: 400px;
  height: 400px;
  background: cyan;
  border: 1px solid fuchsia;
  position: absolute;
  right: 50px;
  top: 100px;
}

h1 {
  text-align: center;
  padding: 50px 0;
}

.el-button {
  width: 250px;
}
</style>
