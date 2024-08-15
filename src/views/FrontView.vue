<template>
  <h1 class="text-center">你現在在前台頁面</h1>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link">首頁</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/products" class="nav-link">前台產品列表</RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/cart" class="nav-link">前台購物車
            <i class="bi bi-cart4"></i>
          </RouterLink>
          <span class="separator">|</span>
          <RouterLink to="/dashboard/adminProduct" class="nav-link">後台購物車列表</RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>

<script>
export default {
  mounted () {
  }
}
</script>

<style lang="scss">
.separator {
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
}

.router-link-exact-active {
  background-color: rgb(181, 232, 181);
  padding: 0.5rem 1rem;
  margin: 0;
  border-radius: 0.25rem;
}
</style>
