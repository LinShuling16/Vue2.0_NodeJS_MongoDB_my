<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>OrderConfirm</span>
        </nav-bread>
        <div class="container">
            <div class="checkout-order">
              <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
              </div>
              <!-- process step -->
              <div class="check-step">
                <ul>
                  <li class="cur"><span>Confirm</span> address</li>
                  <li class="cur"><span>View your</span> order</li>
                  <li><span>Make</span> payment</li>
                  <li><span>Order</span> confirmation</li>
                </ul>
              </div>

              <!-- order list -->
              <div class="page-title-normal checkout-title">
                <h2><span>Order content</span></h2>
              </div>
              <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                  <div class="cart-item-head">
                    <ul>
                      <li>Order contents</li>
                      <li>Price</li>
                      <li>Quantity</li>
                      <li>Subtotal</li>
                    </ul>
                  </div>
                  <ul class="cart-item-list">
                    <li v-for="item in cartList" v-if="item.checked == '1'">
                      <div class="cart-tab-1">
                        <div class="cart-item-pic">
                          <img v-lazy="'/static/'+ item.productImage" v-bind:alt="item.productName">
                        </div>
                        <div class="cart-item-title">
                          <div class="item-name">{{item.productName}}</div>

                        </div>
                      </div>
                      <div class="cart-tab-2">
                        <div class="item-price">{{item.salePrice | currency('$')}}</div>
                      </div>
                      <div class="cart-tab-3">
                        <div class="item-quantity">
                          <div class="select-self">
                            <div class="select-self-area">
                              <span class="select-ipt">×{{item.productNum}}</span>
                            </div>
                          </div>
                          <div class="item-stock item-stock-no">In Stock</div>
                        </div>
                      </div>
                      <div class="cart-tab-4">
                        <div class="item-price-total">{{(item.productNum * item.salePrice) | currency('$')}}</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Price count -->
              <div class="price-count-wrap">
                <div class="price-count">
                  <ul>
                    <li>
                      <span>Item subtotal:</span>
                      <span>{{subTotal | currency('$')}}</span>
                    </li>
                    <li>
                      <span>Shipping:</span>
                      <span>{{shipping | currency('$')}}</span>
                    </li>
                    <li>
                      <span>Discount:</span>
                      <span>{{discount | currency('$')}}</span>
                    </li>
                    <li>
                      <span>Tax:</span>
                      <span>{{tax | currency('$')}}</span>
                    </li>
                    <li class="order-total-price">
                      <span>Order total:</span>
                      <span>{{orderTotal | currency('$')}}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="order-foot-wrap">
                <div class="prev-btn-wrap">
                   <router-link class="btn btn--m" to="/address">Previous</router-link>
                </div>
                <div class="next-btn-wrap">
                  <button class="btn btn--m btn--red" @click="payMent">Proceed to payment</button>
                </div>
              </div>
            </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
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
                shipping   : 100,
                discount   : 200,
                tax        : 400,
                orderTotal : 0,
                subTotal   : 0,
                cartList   : []
            }
        },
        mounted(){
            this.init();
        },
        components:{
            NavHeader,
            NavFooter,
            NavBread, 
            Modal    
        },
        methods : {
            init(){
               axios.get("/users/cartList").then((response) => {
                    let res = response.data;
                    this.cartList = res.result;

                    //计算商品总价格
                    this.cartList.forEach((item)=>{
                        if(item.checked == '1'){
                            this.subTotal += item.salePrice * item.productNum;
                        }
                   })

                   //计算最终价格
                   this.orderTotal = this.subTotal - this.discount + this.shipping + this.tax;
               });
            },
            payMent(){
                var addressId = this.$route.query.addressId;
                axios.post("/users/payMent", {
                    addressId  : addressId,
                    orderTotal : this.orderTotal
                }).then((response) => {
                    let res = response.data;
                    if(res.status == '0'){
                        this.$router.push({
                            path : '/orderSuccess?orderId=' + res.result.orderId
                        })
                        console.log("order created succsee.");
                    }
                })
            }
        }
    }
</script>