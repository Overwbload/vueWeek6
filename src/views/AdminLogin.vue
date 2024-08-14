<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="row justify-content-center w-100">
      <h1 class="h3 my-3 font-weight-normal text-center">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="getLogin">
          <div class="form-floating my-3">
            <input type="email" class="form-control" v-model="user.username" placeholder="name@example.com"
            required autofocus>
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" v-model="user.password"    placeholder="Password" required>
            <label for="password">Password</label>
          </div>
          <button id="login" class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2021~∞ - 六角學院
      </p>
    </div>
  </div>
</template>

<script>
const { VITE_APP_API_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getLogin () {
      const url = `${VITE_APP_API_URL}/admin/signin`
      this.$http.post(url, this.user)
        .then((res) => {
          const { token, expired, message } = res.data // 取得API回傳的token&expired&message
          document.cookie = `jasonToken=${token}; expires=${new Date(expired)};` // 將token&expired儲存至cookie
          alert(message)
          this.$router.push('dashboard') // 頁面跳轉
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
  }
}
</script>
