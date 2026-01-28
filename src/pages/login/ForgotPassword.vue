<template>
  <div class="forgot-password-container">
    <div class="forgot-password-box">
      <h1>重置密码</h1>
      <p class="subtitle">请输入您的邮箱，我们将发送重置密码链接到您的邮箱</p>
      
      <form v-if="!emailSent" @submit.prevent="handleSendReset">
        <div class="form-group">
          <label for="email">邮箱地址：</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="请输入注册邮箱"
            required
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '发送中...' : '发送重置链接' }}
        </button>
      </form>

      <form v-else-if="!resetCodeVerified" @submit.prevent="handleVerifyCode">
        <p class="info-text">重置链接已发送至 {{ email }}</p>
        <div class="form-group">
          <label for="code">验证码：</label>
          <input
            id="code"
            v-model="resetCode"
            type="text"
            placeholder="请输入邮件中的验证码"
            required
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '验证中...' : '验证码' }}
        </button>
        <button type="button" class="back-btn" @click="resetStep">返回重新输入</button>
      </form>

      <form v-else @submit.prevent="handleResetPassword">
        <div class="form-group">
          <label for="new-password">新密码：</label>
          <input
            id="new-password"
            v-model="newPassword"
            type="password"
            placeholder="请输入新密码 (至少 6 位)"
            required
            minlength="6"
          />
        </div>
        <div class="form-group">
          <label for="confirm-password">确认新密码：</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="再次输入新密码"
            required
            minlength="6"
          />
        </div>
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? '重置中...' : '重置密码' }}
        </button>
      </form>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div class="forgot-password-footer">
        <router-link to="/login" class="link">
          返回登录
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
      emailSent: false,
      resetCodeVerified: false,
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    handleSendReset() {
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = '请输入有效的邮箱地址';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // 模拟发送邮件请求
      setTimeout(() => {
        console.log('发送重置密码邮件至:', this.email);
        this.emailSent = true;
        this.successMessage = `重置链接已发送至 ${this.email}`;
        this.isLoading = false;
      }, 1500);
    },
    handleVerifyCode() {
      if (!this.resetCode.trim()) {
        this.errorMessage = '验证码不能为空';
        return;
      }

      // 简单的验证码验证逻辑
      if (this.resetCode.length < 4) {
        this.errorMessage = '验证码不正确';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // 模拟验证验证码
      setTimeout(() => {
        console.log('验证验证码:', this.resetCode);
        this.resetCodeVerified = true;
        this.successMessage = '验证成功，请输入新密码';
        this.isLoading = false;
      }, 1000);
    },
    handleResetPassword() {
      if (!this.newPassword.trim() || !this.confirmPassword.trim()) {
        this.errorMessage = '密码不能为空';
        return;
      }

      if (this.newPassword.length < 6) {
        this.errorMessage = '密码长度至少为 6 位';
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = '两次输入的密码不一致';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // 模拟重置密码请求
      setTimeout(() => {
        console.log('密码已重置:', {
          email: this.email,
          newPassword: this.newPassword,
        });
        this.successMessage = '密码重置成功！请重新登录。';
        
        // 2 秒后跳转到登录页
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        
        this.isLoading = false;
      }, 1500);
    },
    resetStep() {
      this.emailSent = false;
      this.resetCodeVerified = false;
      this.email = '';
      this.resetCode = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.errorMessage = '';
      this.successMessage = '';
    },
  },
};
</script>

<style scoped>
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.forgot-password-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
}

.forgot-password-box h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}

.info-text {
  text-align: center;
  color: #667eea;
  font-size: 14px;
  margin-bottom: 20px;
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

.submit-btn {
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
  margin-bottom: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-btn {
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #e0e0e0;
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

.forgot-password-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.link:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>
