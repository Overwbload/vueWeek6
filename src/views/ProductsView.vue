<template>
  <div class="container">
    <!-- loading 圖示(自定義化) -->
    <LoadingOverlay v-model:active="loadingComponent" :is-full-page="true"></LoadingOverlay>
    <div class="mt-4">
      <!-- 產品內頁Modal -->
      <user-Product-Modal ref="productModal" :product="productDetail" @add-To-Cart="addToCart"></user-Product-Modal>
      <!-- 產品內頁Modal -->
      <!-- 商品列表 -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url(${item.imageUrl})` }">
              </div>
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="viewDetail(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id || !item.is_enabled">
                  <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁元件 -->
      <PaginationComponent :pages="pagination" @emit-pages="renderProducts"></PaginationComponent>
    </div>
  </div>
</template>

<script>
import PaginationComponent from '../components/PaginationComponent.vue'
import UserProductModal from '../components/UserProductModal.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'

const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default {
  components: { PaginationComponent, UserProductModal, LoadingOverlay },
  data () {
    return {
      products: [], // 產品內容
      productDetail: {}, // 查看更多
      pagination: {}, // 分頁
      cart: { // 購物車
        carts: []
      },
      loadingStatus: { // 讀取ICON
        loadingItem: ''
      },
      loadingComponent: true // 讀取動圖
    }
  },
  methods: {
    renderProducts (page = 1) { // call API get產品資訊  默認頁碼設為1 當頁碼資料被傳入時page會被改變
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/products?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.loadingComponent = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    viewDetail (id) { // 查看更多
      this.loadingStatus.loadingItem = id
      this.$refs.productModal.qty = 1
      const existingProduct = this.products.find(item => item.id === id)
      if (existingProduct) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${id}`
        this.$http.get(url)
          .then(res => {
            this.productDetail = res.data.product
            this.loadingStatus.loadingItem = ''
            this.$refs.productModal.bsModal.show()
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      }
    },
    addToCart (productId, qty = 1) { // 加入購物車
      if (qty <= 0) {
        alert('數量必須大於0')
        return
      }
      this.loadingStatus.loadingItem = productId
      const tempCart = {
        product_id: productId,
        qty
      }
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`
      this.$http.post(url, { data: tempCart })
        .then(res => {
          alert(res.data.message)
          this.loadingStatus.loadingItem = ''
          this.$refs.productModal.bsModal.hide()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.renderProducts() // 取得商品資料
  }
}
</script>

<style>
</style>
