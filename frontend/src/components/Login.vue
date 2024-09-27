<template>
  <v-container class="d-flex justify-center align-center login-background">
    <v-card class="pa-5" width="400" elevation="10">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-form @submit.prevent="login">
        <v-text-field
            v-model="username"
            label="Username"
            prepend-icon="mdi-account"
            required
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            required
        ></v-text-field>
        <v-btn type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$http.post('http://localhost:5000/api/login', {
          username: this.username,
          password: this.password,
        });
        if (response.data.status === "success") {
          // 登录成功，跳转到主页
          this.$router.push({name: 'Home'});
        }
      } catch (error) {
        console.error('Login failed:', error.response.data.message);
        alert('登录失败：' + error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
/* 设置背景图铺满页面，添加渐变效果 */
.login-background {
  background: linear-gradient(to right, rgba(79, 172, 254, 0.7), rgba(0, 242, 254, 0.7)),
  url('https://example.com/your-background-image.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh; /* 确保容器高度为整个视口高度 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 调整登录框的样式，使其居中 */
.v-card {
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  border-radius: 10px; /* 圆角 */
}
</style>
