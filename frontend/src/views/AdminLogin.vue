<script setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import makeAdminService from '@/services/admins.service';

const admin_username = ref('');
const admin_password = ref('');
const error = ref('');

const loginMutation = useMutation({
  mutationFn: (data) => makeAdminService.login(data.username, data.password),
  onSuccess: (response) => {
    const { admin_id, admin_username } = response;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('admin_id', admin_id);
    localStorage.setItem('admin_username', admin_username);
    error.value = '';
    window.location.reload();
  },
  onError: () => {
    error.value = 'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu ADMIN!';
  }
});
const handleLogin = () => {
  error.value = '';
  loginMutation.mutate({
    username: admin_username.value,
    password: admin_password.value
  });
};
</script>
<template>
  <div class="login-container">
    <h2
      style="
        font-family: 'Playfair Display', serif;
        color: #ff6347;
        font-weight: 700;
        font-size: 35px;
      "
    >
      Login
    </h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Username</label>
        <input
          v-model="admin_username"
          id="username"
          class="form-control"
          required
        />
        <label for="password">Password</label>
        <input
          v-model="admin_password"
          type="password"
          id="password"
          class="form-control"
          required
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        style="margin-top: 20px"
        :disabled="loginMutation.isLoading"
      >
        Login
      </button>
    </form>
    <div
      v-if="error"
      class="error-message"
    >
      {{ error }}
    </div>
  </div>
</template>
<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 14px;
  color: #555;
}

input[type='email'],
input[type='password'] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #ff9381;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff6347;
}
.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid red;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.1);
}
</style>
