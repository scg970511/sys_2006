import axios from "axios";
import router from "../router";
import ElementUI from "element-ui";

// 中断请求属性
export const CancelToken = axios.CancelToken;

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip";

axios.defaults.withCredentials = true; // 允许请求携带认证

// 创建请求拦截器,可以给每个请求都携带上想要
axios.interceptors.request.use(config => {
  // 登入和注册是不需要携带token
  if (config.url == "/users/login") {
    // 不需要携带token
    return config;
  } else {
    // config的值是每个请求对象
    let token = localStorage.getItem("qf2006-token");
    config.headers["authorization"] = token;
    // 放行
    return config;
  }
});

// 响应拦截
axios.interceptors.response.use(config => {
  let { data } = config;
  // 在当前后台api中1004代表token校验失败,10022表示session到期失效,提示错误,并且让页面跳转到登入页
  if (data.code == "1004" || data.code == "10022") {
    //
    ElementUI.Message.error("登入失效,请重新登入");
    // 清除token
    localStorage.removeItem("qf2006-token");
    router.push("/login");
    // 刷新页面
    window.location.reload();
  }
  return config;
});

axios.create({
  timeout: 3000
});

export default axios;
