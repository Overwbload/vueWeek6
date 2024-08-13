<template>
  <div class="container">
    <h2>订单列表</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>订单 ID</th>
          <th>创建时间</th>
          <th style="width: 100px;">是否已支付</th>
          <th>留言</th>
          <th>产品</th>
          <th>用户信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ (order.create_at) }}</td>
          <td>{{ order.is_paid ? '是' : '否' }}</td>
          <td>{{ order.message }}</td>
          <td>
            <ul>
              <li v-for="(product, key) in order.products" :key="key">
                产品 ID: {{ product.product_id }},<br>数量: {{ product.qty }}
              </li>
            </ul>
          </td>
          <td>
            <p>姓名: {{ order.user.name }}</p>
            <p>电话: {{ order.user.tel }}</p>
            <p>邮箱: {{ order.user.email }}</p>
            <p>地址: {{ order.user.address }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <PaginationComponent :pages="pagination" @emit-pages="getOrder"></PaginationComponent>
  </div>
</template>

<script>
import PaginationComponent from '../../components/PaginationComponent.vue'
const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default {
  components: { PaginationComponent },
  data () {
    return {
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrder (page = 1) {
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/orders?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch(err => {
          console.dir(err.data)
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
