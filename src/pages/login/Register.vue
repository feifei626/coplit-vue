<template>
  <div class="register-container">
    <div class="register-box">
      <h1>创建账户</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名：</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名 (4-20 字符)"
            required
            minlength="4"
            maxlength="20"
          />
        </div>
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="请输入邮箱地址"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码 (至少 6 位)"
            required
            minlength="6"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码：</label>
          <input
            id="confirm-password"
            v-model="form.confirmPassword"
            type="password"
            placeholder="再次输入密码"
            required
            minlength="6"
          />
        </div>
        <button type="submit" class="register-btn">注册</button>
      </form>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div class="register-footer">
        <span>已有账户？</span>
        <router-link to="/login" class="link">
          返回登录
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    handleRegister() {
      // 验证表单
      if (!this.validateForm()) {
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errorMessage = '两次输入的密码不一致';
        this.successMessage = '';
        return;
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.errorMessage = '请输入有效的邮箱地址';
        this.successMessage = '';
        return;
      }

      console.log('注册成功', {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
      });

      this.errorMessage = '';
      this.successMessage = '注册成功！请登录您的账户。';
      
      // 清空表单
      this.form = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };

      // 可选：3 秒后跳转到登录页
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    },
    validateForm() {
      const { username, email, password, confirmPassword } = this.form;
      
      if (!username.trim()) {
        this.errorMessage = '用户名不能为空';
        this.successMessage = '';
        return false;
      }

      if (username.length < 4 || username.length > 20) {
        this.errorMessage = '用户名长度必须在 4-20 字符之间';
        this.successMessage = '';
        return false;
      }

      if (!email.trim()) {
        this.errorMessage = '邮箱不能为空';
        this.successMessage = '';
        return false;
      }

      if (!password.trim()) {
        this.errorMessage = '密码不能为空';
        this.successMessage = '';
        return false;
      }

      if (password.length < 6) {
        this.errorMessage = '密码长度至少为 6 位';
        this.successMessage = '';
        return false;
      }

      if (!confirmPassword.trim()) {
        this.errorMessage = '确认密码不能为空';
        this.successMessage = '';
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
}

.register-box h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.register-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.register-btn:hover {
  transform: translateY(-2px);
}

.error-message {
  color: #ff6b6b;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #ffe0e0;
  border-radius: 4px;
}

.success-message {
  color: #51cf66;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #e7f5e7;
  border-radius: 4px;
}

.register-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.link:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>
