<template>
  <div class="container">
    <LoadingOverlay v-model:active="loadingComponent" :is-full-page="true"></LoadingOverlay>
    <!-- 購物車列表 -->
    <div class="text-end mt-2">
      <button class="btn btn-outline-danger" type="button" @click="delAll"
        :disabled="loadingStatus.loadingItem !== ''">清空購物車
        <span class="badge rounded-pill bg-primary">{{ cart.carts.length }}</span>
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th class="text-center" style="width: 150px">數量/單位</th>
          <th class="text-end">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input min="1" type="number" class="form-control" v-model.number="item.qty"
                    :disabled="loadingStatus.loadingItem === item.id" @blur="updateQty(item)">
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- 使用者表單 -->
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="required|email" v-model="form.user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required"  v-model="form.user.name"></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required|regex:^(09)[0-9]{8}$" v-model="form.user.tel"></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <v-field name="留言" as="textarea" id="message" class="form-control" cols="30" rows="10" rules=""
          :class="{ 'is-invalid': errors['留言'] }" v-model="form.message">
          </v-field>
          <error-message name="留言" class="invalid-feedback"></error-message>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
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
      cart: {
        carts: []
      }, // 購物車
      cart2: {
        carts: []
      },
      loadingStatus: {
        loadingItem: ''
      },
      loadingComponent: true,
      form: {
        user: { // 顧客
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCartList () { // 取得購物車清單
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart`
      this.$http.get(url)
        .then(res => {
          this.cart = res.data.data
          this.cart2 = JSON.parse(JSON.stringify(res.data.data))
          this.loadingComponent = false
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    updateQty (item) { // 更改購買數量
      this.loadingStatus.loadingItem = item.id
      if (item.qty <= 0) {
        alert('數量必須大於0')
        item.qty = 1
      }
      const existingProduct = this.cart2.carts.find(cart2 => cart2.product_id === item.product_id)
      if (existingProduct && existingProduct.qty !== item.qty) { // 當函式觸發如果產品存在且數量不為原數量
        const tempCart = {
          product_id: item.product_id,
          qty: item.qty
        }
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${item.id}`
        this.$http.put(url, { data: tempCart })
          .then(res => {
            this.loadingStatus.loadingItem = ''
            alert(res.data.message)
            this.getCartList()
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      } else {
        this.loadingStatus.loadingItem = ''
      }
    },
    delProduct (id) { // 刪除單一商品
      this.loadingStatus.loadingItem = id
      const existingProduct = this.cart.carts.find(item => item.id === id)
      if (existingProduct) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/cart/${id}`
        this.$http.delete(url)
          .then(res => {
            alert(res.data.message)
            this.getCartList()
            this.loadingStatus.loadingItem = ''
          })
          .catch(err => {
            alert(err.response.data.message)
          })
      }
    },
    delAll () { // 刪除購物車內全部商品
      this.loadingComponent = true
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/carts`
      this.$http.delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCartList()
          this.loadingComponent = false
        })
        .catch(err => {
          alert(err.response.data.message)
          this.loadingComponent = false
        })
    },
    // isPhone (value) { // 驗證電話欄位自訂義規則
    //   const phoneNumber = /^(09)[0-9]{8}$/
    //   return phoneNumber.test(value) ? true : '需要正確的台灣電話號碼'
    // }
    sendOrder () { // 送出訂單
      const Order = this.form
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/order`
      this.$http.post(url, { data: Order })
        .then(res => {
          this.getCartList()
          alert(res.data.message)
          this.$refs.form.resetForm()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCartList() // 取得購物車資料
  }
}
</script>
