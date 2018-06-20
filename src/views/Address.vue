<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Address</span>
        </nav-bread>
        <div class="checkout-addr">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>Confirm</span> address</li>
              <li><span>View your</span> order</li>
              <li><span>Make</span> payment</li>
              <li><span>Order</span> confirmation</li>
            </ul>
          </div>

          <!-- address list -->
          <div class="page-title-normal checkout-title">
            <h2><span>Shipping address</span></h2>
          </div>
          <div class="addr-list-wrap">
            <div class="addr-list">
              <ul>
                <li v-for="item in addressList">
                  <dl>
                    <dt class="userName">{{item.userName}}</dt>
                    <dd class="address">{{item.streetName}}</dd>
                    <dd class="tel">{{item.tel}}</dd>
                  </dl>
                  <div class="addr-opration addr-del">

                    <a href="javascript:;" class="addr-del-btn">
                        删除
                      <!-- <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg> -->
                    </a>
                  </div>
                  <div class="addr-opration addr-set-default">
                    <a href="javascript:;" class="addr-set-default-btn"><i>Set default</i></a>
                  </div>
                  <div class="addr-opration addr-default">Default address</div>
                </li>
                <li class="addr-new">
                  <div class="add-new-inner">
                    <i class="icon-add">
                      <svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
                    </i>
                    <p>Add new address</p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="shipping-addr-more">
              <a class="addr-more-btn up-down-btn" href="javascript:;">
                more
                <i class="i-up-down">
                  <i class="i-up-down-l"></i>
                  <i class="i-up-down-r"></i>
                </i>
              </a>
            </div>
          </div>

          <!-- shipping method-->
          <div class="page-title-normal checkout-title">
            <h2><span>Shipping method</span></h2>
          </div>
          <div class="lemall-msg-info hidden">
            <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
          </div>
          <div class="shipping-method-wrap">
            <div class="shipping-method">
              <ul>
                <li class="check">
                  <div class="name">Standard shipping</div>
                  <div class="price">Free</div>
                  <div class="shipping-tips">
                    <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="next-btn-wrap">
            <a class="btn btn--m btn--red">Next</a>
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

    //导入组件
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'
    import Modal from '@/components/Modal.vue'
    export default{
        data(){
            return {
                addressList : [],
            }
        },
        mounted(){
            this.getAddressList();
        },
        methods : {
            getAddressList(){
                axios.get("/users/addressList").then((response) => {
                    let res = response.data;
                    this.addressList = res.result;
                })
            },
        },
        components:{
            NavHeader,
            NavFooter,
            NavBread, 
            Modal    
         }
    }
</script>