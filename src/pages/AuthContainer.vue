<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- Tab 标签切换 -->
      <div class="auth-tabs">
        <button
          :class="['tab-button', { active: activeTab === 'login' }]"
          @click="activeTab = 'login'"
        >
          登录
        </button>
        <button
          :class="['tab-button', { active: activeTab === 'register' }]"
          @click="activeTab = 'register'"
        >
          注册
        </button>
      </div>

      <!-- Tab 内容区域 -->
      <div class="tab-content">
        <!-- 登录面板 -->
        <transition name="slide" mode="out-in">
          <div v-if="activeTab === 'login'" key="login" class="tab-pane">
            <h1>登录</h1>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="login-username">用户名：</label>
                <input
                  id="login-username"
                  v-model="loginForm.username"
                  type="text"
                  placeholder="请输入用户名"
                  required
                />
              </div>
              <div class="form-group">
                <label for="login-password">密码：</label>
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  required
                />
              </div>
              <button type="submit" class="submit-btn">登录</button>
            </form>
            <div v-if="loginForm.errorMessage" class="error-message">
              {{ loginForm.errorMessage }}
            </div>
            <div class="auth-footer">
              <router-link to="/login/forgot-password" class="link">
                忘记密码？
              </router-link>
            </div>
          </div>
        </transition>

        <!-- 注册面板 -->
        <transition name="slide" mode="out-in">
          <div v-if="activeTab === 'register'" key="register" class="tab-pane">
            <h1>创建账户</h1>
            <form @submit.prevent="handleRegister">
              <div class="form-group">
                <label for="register-username">用户名：</label>
                <input
                  id="register-username"
                  v-model="registerForm.username"
                  type="text"
                  placeholder="请输入用户名 (4-20 字符)"
                  required
                  minlength="4"
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <label for="register-email">邮箱：</label>
                <input
                  id="register-email"
                  v-model="registerForm.email"
                  type="email"
                  placeholder="请输入邮箱地址"
                  required
                />
              </div>
              <div class="form-group">
                <label for="register-password">密码：</label>
                <input
                  id="register-password"
                  v-model="registerForm.password"
                  type="password"
                  placeholder="请输入密码 (至少 6 位)"
                  required
                  minlength="6"
                />
              </div>
              <div class="form-group">
                <label for="register-confirm-password">确认密码：</label>
                <input
                  id="register-confirm-password"
                  v-model="registerForm.confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  required
                  minlength="6"
                />
              </div>
              <button type="submit" class="submit-btn">注册</button>
            </form>
            <div v-if="registerForm.errorMessage" class="error-message">
              {{ registerForm.errorMessage }}
            </div>
            <div v-if="registerForm.successMessage" class="success-message">
              {{ registerForm.successMessage }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref<'login' | 'register'>('login')

interface LoginFormData {
  username: string
  password: string
  errorMessage: string
}

interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  errorMessage: string
  successMessage: string
}

const loginForm = reactive<LoginFormData>({
  username: '',
  password: '',
  errorMessage: '',
})

const registerForm = reactive<RegisterFormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  errorMessage: '',
  successMessage: '',
})

const handleLogin = (): void => {
  if (loginForm.username && loginForm.password) {
    console.log('登录成功', {
      username: loginForm.username,
      password: loginForm.password,
    })
    loginForm.errorMessage = ''
    // TODO: 实现实际的登录逻辑
    // router.push('/')
  } else {
    loginForm.errorMessage = '用户名和密码不能为空'
  }
}

const validateRegisterForm = (): boolean => {
  const { username, email, password, confirmPassword } = registerForm

  if (!username.trim()) {
    registerForm.errorMessage = '用户名不能为空'
    registerForm.successMessage = ''
    return false
  }

  if (username.length < 4 || username.length > 20) {
    registerForm.errorMessage = '用户名长度必须在 4-20 字符之间'
    registerForm.successMessage = ''
    return false
  }

  if (!email.trim()) {
    registerForm.errorMessage = '邮箱不能为空'
    registerForm.successMessage = ''
    return false
  }

  if (!password.trim()) {
    registerForm.errorMessage = '密码不能为空'
    registerForm.successMessage = ''
    return false
  }

  if (password.length < 6) {
    registerForm.errorMessage = '密码长度至少为 6 位'
    registerForm.successMessage = ''
    return false
  }

  if (!confirmPassword.trim()) {
    registerForm.errorMessage = '确认密码不能为空'
    registerForm.successMessage = ''
    return false
  }

  return true
}

const handleRegister = (): void => {
  if (!validateRegisterForm()) {
    return
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    registerForm.errorMessage = '两次输入的密码不一致'
    registerForm.successMessage = ''
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.email)) {
    registerForm.errorMessage = '请输入有效的邮箱地址'
    registerForm.successMessage = ''
    return
  }

  interface RegisterPayload {
    username: string
    email: string
    password: string
  }

  const payload: RegisterPayload = {
    username: registerForm.username,
    email: registerForm.email,
    password: registerForm.password,
  }

  console.log('注册成功', payload)

  registerForm.errorMessage = ''
  registerForm.successMessage = '注册成功！请登录您的账户。'

  registerForm.username = ''
  registerForm.email = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''

  setTimeout(() => {
    activeTab.value = 'login'
    loginForm.username = ''
    loginForm.password = ''
    loginForm.errorMessage = ''
  }, 2000)
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-box {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
}

.auth-tabs {
  display: flex;
  border-bottom: 2px solid #f0f0f0;
}

.tab-button {
  flex: 1;
  padding: 20px;
  background: white;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.tab-button:hover {
  color: #667eea;
}

.tab-button.active {
  color: #667eea;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.tab-content {
  padding: 40px;
  min-height: 450px;
  position: relative;
}

.tab-pane {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.tab-pane h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 1.8rem;
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
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

.error-message {
  color: #ff6b6b;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #ffe0e0;
  border-radius: 4px;
  font-size: 14px;
}

.success-message {
  color: #51cf66;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #e7f5e7;
  border-radius: 4px;
  font-size: 14px;
}

.auth-footer {
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

@media (max-width: 600px) {
  .auth-box {
    max-width: 100%;
  }

  .tab-content {
    padding: 30px 20px;
    min-height: 400px;
  }

  .tab-button {
    padding: 15px;
    font-size: 14px;
  }

  .tab-pane h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
}
</style>
