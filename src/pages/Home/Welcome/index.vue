<template>
  <div class="welcome">
    <template>
      <el-table :data="welcomeData" border style="width: 100%">
        <el-table-column
          prop="username"
          label="登入账户"
          width="180"></el-table-column>
        <el-table-column
          prop="lastLogin.ip"
          label="上次登入IP"
          width="180"></el-table-column>
        <el-table-column
          prop="nowLogin.ip"
          label="本次登入IP"></el-table-column>
        <el-table-column
          prop="lastLogin.loginTime"
          label="上次登入时间"></el-table-column>
        <el-table-column
          prop="nowLogin.loginTime"
          label="本次登入时间"></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  data() {
    return {
      welcomeData: [],
    };
  },
  created() {
    getLoginLog().then((res) => {
      if (res.data && res.data.state) {
        console.log(res);
        this.welcomeData = res.data.data;
      }
    });
  },
};
</script>
