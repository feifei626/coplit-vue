<template>
  <div class="home-container">
    <header class="home-header">
      <h1>欢迎来到 Vue 3 + TypeScript 项目</h1>
      <p class="subtitle">一个现代化的前端应用</p>
    </header>

    <main class="home-content">
      <section class="feature-section">
        <h2>主要功能</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>用户认证</h3>
            <p>完整的登录、注册和密码重置功能，确保账户安全。</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>高性能</h3>
            <p>使用 Vite 作为构建工具，享受极速的开发体验。</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>响应式设计</h3>
            <p>完美适配各种设备，提供流畅的用户体验。</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>类型安全</h3>
            <p>使用 TypeScript 提供完整的类型检查和开发支持。</p>
          </div>
        </div>
      </section>

      <section class="stats-section">
        <h2>项目统计</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">{{ stats.users }}</span>
            <span class="stat-label">用户登录</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ stats.components }}</span>
            <span class="stat-label">组件数量</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ stats.pages }}</span>
            <span class="stat-label">页面数量</span>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <h2>开始使用</h2>
        <p>立即登录或注册账户，体验完整功能</p>
        <div class="cta-buttons">
          <router-link to="/login" class="btn btn-primary">登录</router-link>
          <router-link to="/login" class="btn btn-secondary">注册</router-link>
        </div>
      </section>
    </main>

    <footer class="home-footer">
      <p>&copy; 2026 coplit-vue. 所有权利保留。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Stats {
  users: number
  components: number
  pages: number
}

const stats = reactive<Stats>({
  users: 1000,
  components: 15,
  pages: 5,
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.home-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.home-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.home-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.feature-section,
.stats-section,
.cta-section {
  margin-bottom: 50px;
}

.feature-section h2,
.stats-section h2,
.cta-section h2 {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 40px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 10px;
}

.feature-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-item {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 10px;
}

.stat-label {
  display: block;
  color: #666;
  font-size: 1rem;
}

.cta-section {
  background: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cta-section p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 30px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-block;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.home-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

.home-footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .home-header h1 {
    font-size: 1.8rem;
  }

  .feature-section h2,
  .stats-section h2,
  .cta-section h2 {
    font-size: 1.5rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
