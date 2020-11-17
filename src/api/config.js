import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_DNV === "development" ? "/api" : "http://www.chst.vip";

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

axios.create({
  timeout: 3000
});

export default axios;
