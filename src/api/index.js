import axios, { CancelToken } from "./config";
// 登入
export const login = (username, password) =>
  axios({
    url: "/users/login",
    method: "post",
    data: {
      username,
      password
    }
  });

// 获取登入日志
/**
 * 
 * @param {Object} _this 一个组件实例
 */
export const getLoginLog = (_this) => axios.get("/getloginlog", {
  cancelToken: new CancelToken(function (c) {
    // c就是一个方法,可以终止请求
    _this.cancel = c // 相当于给组件实例,添加一个cancel属性
  })
});

// 获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList");
// 获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha");
// 刷新验证码
export const refreshCaptcha = () => axios.get("/users/refreshCaptcha");
// 校验验证码
export const verifyCaptcha = (captcha) => axios.get(`/users/verifyCaptcha?captcha=${captcha}`);
