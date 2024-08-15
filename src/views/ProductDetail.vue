<template>
  <LoadingOverlay v-model:active="loadingComponent" :is-full-page="true"></LoadingOverlay>
  <div class="container">
    <div class="" role="document">
      <div class="border-0">
        <div class="bg-dark text-white">
          <h5 class="p-3">{{ product.title }}</h5>
        </div>
        <div class="">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid mb-2" :src="product.imageUrl" alt="">
              <span v-for="(item, index) in product.imagesUrl" :key="index">
                <img class="img-fluid" :src="item">
              </span>
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill my-2">{{ product.category }}</span>
              <h5 class="my-2">商品描述：{{ product.description }}</h5>
              <h5>商品內容：{{ product.content }}</h5>
              <div class="h5" v-if="!product.price">{{ }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model.number="qty">
                  <button type="button" class="btn btn-primary" @click="addToCart(product.id, qty)">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingOverlay from '../components/LoadingOverlay.vue'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default {
  components: { LoadingOverlay },
  data () {
    return {
      product: [], // 產品內容
      qty: 1,
      loadingComponent: true
    }
  },
  methods: {
    getDetail () {
      const { id } = this.$route.params
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/product/${id}`
      this.$http.get(url)
        .then(res => {
          this.product = res.data.product
          this.loadingComponent = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    addToCart (productId, qty = 1) { // 加入購物車
      if (qty <= 0) {
        alert('數量必須大於0')
        this.qty = 1
        return
      }
      const tempCart = {
        product_id: productId,
        qty
      }
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`
      this.$http.post(url, { data: tempCart })
        .then(res => {
          alert(res.data.message)
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>
