<template>
  <div>
    <h1>欢迎Welcome</h1>
    <button @click="send">发送请求</button>
    <button @click="abort">中断请求</button>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  methods: {
    send() {
      getLoginLog(this)
      .then((res) => {
        console.log(res);
      });
    },
    abort() {
      if(typeof this.cancel === "function"){
        this.cancel()
      }
    },
  },
};
</script>
