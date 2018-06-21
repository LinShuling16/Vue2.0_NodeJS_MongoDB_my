<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>OrderSuccess</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
              <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- 进度条 -->
            <div class="check-step">
              <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li class="cur"><span>Make</span> payment</li>
                <li class="cur"><span>Order</span> confirmation</li>
              </ul>
            </div>

            <div class="order-create">
              <div class="order-create-pic"><img src="static/ok-2.png" alt=""></div>
              <div class="order-create-main">
                <h3>Congratulations! <br>Your order is under processing!</h3>
                <p>
                  <span>Order ID：{{orderId}}</span>
                  <span>Order total：{{orderTotal | currency('$')}}</span>
                </p>
                <div class="order-create-btn-wrap">
                  <div class="btn-l-wrap">
                    <router-link class="btn btn--m" to="/cart">Cart List</router-link>
                  </div>
                  <div class="btn-r-wrap">
                    <router-link class="btn btn--m" to="/">Goods List</router-link>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>
<style>
    
</style>
<script>
    //导入插件-会自动的去node_modules里面查找，不需要做路径匹配
    import axios from 'axios'
    //导入样式
    import './../assets/css/base.css'
    import './../assets/css/checkout.css'

    //导入组件
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import Modal from '@/components/Modal.vue'

    //金额格式化工具
    import {currency} from './../util/currency'
    export default{
        data(){
            return {
                orderId    : '',
                orderTotal : 0
            }
        },
        mounted(){
            this.init();
        },
        methods : {
            init(){
               var orderId = this.$route.query.orderId;
               if(!orderId){
                    return;
               }
               //更加订单ID查询订单信息
               axios.get("/users/orderDetail",{
                   params : { orderId : orderId}
               }).then((response) => {
                   let res = response.data;
                   if(res.status == '0'){
                        this.orderId = orderId;
                        this.orderTotal = res.result.orderTotal;
                   }
               })
            }
        },
        components:{
            NavHeader,
            NavFooter,
            NavBread, 
            Modal    
        },

    }
</script>