import{P as f}from"./PaginationComponent-CVp8NEMY.js";import{L as y}from"./LoadingOverlay-DjhGZX1z.js";import{_ as C,r as p,o as i,c as r,b as _,a as t,F as g,e as k,n as I,t as d,f as l,d as E}from"./index-Bv1ygyXE.js";const A={BASE_URL:"/vueWeek6/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API_NAME:"jasonfu-api-vuetest",VITE_APP_API_URL:"https://ec-course-api.hexschool.io/v2"},{VITE_APP_API_URL:h,VITE_APP_API_NAME:m}=A,S={components:{PaginationComponent:f,LoadingOverlay:y},data(){return{products:[],pagination:{},cart:{carts:[]},loadingStatus:{loadingItem:""},loadingComponent:!0}},methods:{renderProducts(s=1){const a=`${h}/api/${m}/products?page=${s}`;this.$http.get(a).then(n=>{this.products=n.data.products,this.pagination=n.data.pagination,this.loadingComponent=!1}).catch(n=>{alert(n.response.data.message)})},viewDetail(s){this.products.find(n=>n.id===s)&&this.$router.push(`products/${s}`)},addToCart(s,a=1){this.loadingStatus.loadingItem=s;const n={product_id:s,qty:a},u=`${h}/api/${m}/cart`;this.$http.post(u,{data:n}).then(o=>{alert(o.data.message),this.loadingStatus.loadingItem="",this.$refs.productModal.bsModal.hide()}).catch(o=>{alert(o.response.data.message)})}},mounted(){this.renderProducts()}},V={class:"container"},x={class:"mt-4"},L={class:"table align-middle"},$=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),T={style:{width:"200px"}},D={key:0,class:"h5"},N={key:1,class:"h6"},M={key:2,class:"h5"},O={class:"btn-group btn-group-sm"},R=["onClick"],U=["onClick","disabled"],w={key:0,class:"fas fa-spinner fa-pulse"};function B(s,a,n,u,o,c){const P=p("LoadingOverlay"),v=p("PaginationComponent");return i(),r(g,null,[_(P,{active:o.loadingComponent,"onUpdate:active":a[0]||(a[0]=e=>o.loadingComponent=e),"is-full-page":!0},null,8,["active"]),t("div",V,[t("div",x,[t("table",L,[$,t("tbody",null,[(i(!0),r(g,null,k(o.products,e=>(i(),r("tr",{key:e.id},[t("td",T,[t("div",{style:I([{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${e.imageUrl})`}])},null,4)]),t("td",null,d(e.title),1),t("td",null,[e.price?l("",!0):(i(),r("div",D,d(e.origin_price)+" 元",1)),e.price?(i(),r("del",N,"原價 "+d(e.origin_price)+" 元",1)):l("",!0),e.price?(i(),r("div",M,"現在只要 "+d(e.price)+" 元",1)):l("",!0)]),t("td",null,[t("div",O,[t("button",{type:"button",class:"btn btn-outline-secondary",onClick:b=>c.viewDetail(e.id)}," 查看更多 ",8,R),t("button",{type:"button",class:"btn btn-outline-danger",onClick:b=>c.addToCart(e.id),disabled:o.loadingStatus.loadingItem===e.id||!e.is_enabled},[o.loadingStatus.loadingItem===e.id?(i(),r("i",w)):l("",!0),E(" 加到購物車 ")],8,U)])])]))),128))])]),_(v,{pages:o.pagination,onEmitPages:c.renderProducts},null,8,["pages","onEmitPages"])])])],64)}const W=C(S,[["render",B]]);export{W as default};
