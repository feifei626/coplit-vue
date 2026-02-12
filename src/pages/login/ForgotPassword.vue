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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const resetCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const emailSent = ref(false)
const resetCodeVerified = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleSendReset = (): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = '请输入有效的邮箱地址'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  setTimeout(() => {
    console.log('发送重置密码邮件至:', email.value)
    emailSent.value = true
    successMessage.value = `重置链接已发送至 ${email.value}`
    isLoading.value = false
  }, 1500)
}

const handleVerifyCode = (): void => {
  if (!resetCode.value.trim()) {
    errorMessage.value = '验证码不能为空'
    return
  }

  if (resetCode.value.length < 4) {
    errorMessage.value = '验证码不正确'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  setTimeout(() => {
    console.log('验证验证码:', resetCode.value)
    resetCodeVerified.value = true
    successMessage.value = '验证成功，请输入新密码'
    isLoading.value = false
  }, 1000)
}

const handleResetPassword = (): void => {
  if (!newPassword.value.trim() || !confirmPassword.value.trim()) {
    errorMessage.value = '密码不能为空'
    return
  }

  if (newPassword.value.length < 6) {
    errorMessage.value = '密码长度至少为 6 位'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  setTimeout(() => {
    console.log('密码已重置:', {
      email: email.value,
      newPassword: newPassword.value,
    })
    successMessage.value = '密码重置成功！请重新登录。'

    setTimeout(() => {
      router.push('/login')
    }, 2000)

    isLoading.value = false
  }, 1500)
}

const resetStep = (): void => {
  emailSent.value = false
  resetCodeVerified.value = false
  email.value = ''
  resetCode.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  errorMessage.value = ''
  successMessage.value = ''
}
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
