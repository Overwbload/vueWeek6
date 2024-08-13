<template>
  <h1 class="text-center">這裡是後台喔</h1>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #768dcc;">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link">回到前台</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/dashboard/adminProduct" class="nav-link">後台產品列表</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/dashboard/adminOrder" class="nav-link">後台訂單</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/login" class="nav-link" @click="signOut">登出</RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <RouterView v-if="checkSuccess"></RouterView>
</template>

<script>
const { VITE_APP_API_URL } = import.meta.env

export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLoginToken () {
      // 取得cookie中的token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)jasonToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        // token夾在headers中
        this.$http.defaults.headers.common.Authorization = token
        const url = `${VITE_APP_API_URL}/api/user/check`
        this.$http.post(url, { api_token: this.token })
          .then(res => {
            this.checkSuccess = true
            console.log('登入驗證', res.data.success)
          })
          .catch(err => {
            alert('請先登入')
            this.$router.push('/login')
            console.dir(err.response.data.message)
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    },
    signOut () {
      document.cookie = 'jasonToken=;expires=;'
      alert('token 已清除')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLoginToken() // call登入驗證
  }
}
</script>
