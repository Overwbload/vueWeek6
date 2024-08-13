<template>
  <div class="container">
      <div class="text-end mt-4">
        <!-- 建立新的產品按鈕 -->
        <NewProductBtn @open-new-modal="openModal">5</NewProductBtn>
      </div>
      <!-- 產品列表 -->
      <ProductTableVue :products="products" @open-created-modal="openModal"></ProductTableVue>
      <!-- 分頁 -->
      <Pagination :pages="pagination" @emit-pages="renderProducts"></Pagination>
    </div>
    <!-- Modal -->
    <ProductModal ref="productModalComponent" :temp-product="tempProduct" @confirm="confirmProduct"
    @create-img="createImages" @del-img="delImages" @upload-img="upload" @call-upload-api="uploadApi">
    </ProductModal>
    <DelProductModal ref="delProductModalComponent" :temp-product="tempProduct" @del-product="confirmDel"></DelProductModal>
    <!-- Modal -->
</template>

<script>
import NewProductBtn from '@/components/NewProductBtn.vue'
import Pagination from '@/components/PaginationComponent.vue'
import ProductTableVue from '../../components/ProductTable.vue'
import ProductModal from '../../components/ProductModal.vue'
import DelProductModal from '../../components/DelProductModal.vue'

const { VITE_APP_API_URL, VITE_APP_API_NAME } = import.meta.env

export default {
  components: { NewProductBtn, Pagination, ProductTableVue, ProductModal, DelProductModal },
  data () {
    return {
      tempProduct: {},
      products: [],
      isNew: false,
      pagination: {},
      bsModal: '',
      formData: ''
    }
  },
  methods: {
    renderProducts (page = 1) { // call API get產品資訊  默認頁碼設為1 當頁碼資料被傳入時page會被改變
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/products?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    openModal (isNew, item) {
      if (isNew === 'new') { // 開啟新增產品modal
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModalComponent.openModal()
        this.$refs.productModalComponent.$refs.fileInput.value = ''
      } else if (isNew === 'edit') { // 開啟編輯產品modal 深拷貝products的資料到tempProducts 因tempProduct有第二層屬性
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.isNew = false
        this.$refs.productModalComponent.openModal()
        this.$refs.productModalComponent.$refs.fileInput.value = ''
      } else if (isNew === 'delete') { // 開啟刪除產品modal
        this.tempProduct = { ...item }
        this.$refs.delProductModalComponent.delModalShow()
      }
    },
    checkImagesArray () { // 檢查tempProduct的imagesUrl陣列不為空白
      if (this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl.filter(item => item !== '') // 篩選新增更多圖片的連結欄位不為空白
      }
    },
    confirmProduct () { // 在productModal 按下確認後call API post產品資訊
      // 根據是否有 id 決定 API 路徑和 HTTP 方法
      const isNewProduct = !this.tempProduct.id
      const url = isNewProduct
        ? `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product`
        : `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`
      const httpMethod = isNewProduct ? 'post' : 'put'

      // 檢查圖片 URL 陣列
      this.checkImagesArray()

      // 檢查是否有編輯內容
      if (!isNewProduct) {
        const existingProduct = this.products.find(item => item.id === this.tempProduct.id)
        if (existingProduct && JSON.stringify(existingProduct) === JSON.stringify(this.tempProduct)) {
          alert('No changes made!!')
          return
        }
      }

      // 呼叫 API
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then(res => { // 當欄位不符規定就return 不關閉視窗
          if (res.data.success === false) {
            alert(res.data.message)
            return
          }
          this.renderProducts()
          alert(res.data.message)
          this.$refs.productModalComponent.closeModal()
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    confirmDel () { // 確認刪除產品
      const delProduct = this.products.find(item => item.id === this.tempProduct.id)
      if (delProduct) {
        const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/product/${this.tempProduct.id}`
        this.$http.delete(url)
          .then(res => {
            this.tempProduct = {}
            // delModal.hide();
            this.$refs.delProductModalComponent.delModalHide()
            this.renderProducts()
            alert(res.data.message)
          })
          .catch(err => {
            alert(err.response.data.message)
            console.dir(err.response.data.message)
          })
      }
    },
    createImages () { // 新增更多圖片
      if (!this.tempProduct.imagesUrl) { // 如果imagesUrl不存在 則幫他創建一個陣列
        this.tempProduct.imagesUrl = []
      }
      this.tempProduct.imagesUrl.push('') // 如果imagesUrl已經存在，則在陣列中push一個新的空白欄位供填入
    },
    delImages (index) { // 刪除圖片
      this.tempProduct.imagesUrl.splice(index, 1)
    },
    upload () { // 上傳圖片將資料儲存至formData
      const file = this.$refs.productModalComponent.$refs.fileInput.files[0]
      this.formData = new FormData()
      this.formData.append('file-to-upload', file)
    },
    uploadApi () { // 將formData打包給API上傳
      if (!this.formData) {
        alert('No file to upload')
        return
      }
      const url = `${VITE_APP_API_URL}/api/${VITE_APP_API_NAME}/admin/upload`
      this.$http.post(url, this.formData)
        .then(res => {
          alert('上傳成功')
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.productModalComponent.$refs.fileInput.value = ''
          this.formData = ''
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.renderProducts()
  }
}
</script>
