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
export const getLoginLog = () => axios.get("/getloginlog");
// /**
//  *
//  * @param {Object} _this 一个组件实例
//  */
// // 发送中断请求
// export const getLoginLog = _this =>
//   axios.get("/getloginlog", {
//     cancelToken: new CancelToken(function (c) {
//       // c就是一个方法,可以终止请求
//       _this.cancel = c; // 相当于给组件实例,添加一个cancel属性
//     })
//   });

// 获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList");
// 获取验证码
export const getCaptcha = () => axios.get("/users/getCaptcha");
// 刷新验证码
export const refreshCaptcha = () => axios.get("/users/refreshCaptcha");
// 校验验证码
export const verifyCaptcha = captcha =>
  axios.get(`/users/verifyCaptcha?captcha=${captcha}`);

// 增加学员信息
export const addStuDetail = (stuDetail) =>
  axios({
    url: "/students/addstu",
    method: "post",
    data: stuDetail
  });
// 获取学员信息
export const getStuList = (params = {}) => axios({
  url:"/students/getstulist",
  params
});
// 删除学员信息
export const delStu = (sId) => axios.get(`/students/delstu?sId=${sId}`);
// 搜索学员
export const searchStu = (params) => axios({
  url: `/students/searchstu`,
  params
});
// 获取班级列表
export const getClasses = () => axios.get("/students/getclasses");
// 编辑学员信息
export const updateStu = (updated) =>
  axios({
    url: "/students/updatestu",
    method: "post",
    data: updated
  });