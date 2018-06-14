<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
              <!-- filter -->
              <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
                <dl class="filter-price">
                  <dt>Price:</dt>
                  <dd><a href="javascript:void(0)" 
                         v-bind:class="{'cur':priceChecked == 'all'}"
                         @click="priceChecked='all'">
                         All</a></dd>
                  <dd v-for="(price,index) in priceFilter">
                    <a href="javascript:void(0)" 
                        v-bind:class="{'cur':priceChecked==index}" 
                        @click="setPriceFilter(index)">
                        {{price.startPrice}} - {{price.endPrice}}
                    </a>
                  </dd>
                </dl>
              </div>

              <!-- search result accessories list -->
              <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                    <ul>
                        <li v-for="(item,index) in goodsList">
                          <div class="pic">
                            <a href="#"><img v-lazy="'/static/'+ item.productImage" alt=""></a>
                          </div>
                          <div class="main">
                            <div class="name">{{item.productName}}</div>
                            <div class="price">{{item.salePrice}}</div>
                            <div class="btn-area">
                              <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                          </div>
                        </li>
                    </ul>
                    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                        <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
    //导入插件-会自动的去node_modules里面查找，不需要做路径匹配
    import axios from 'axios'
    //导入样式
    import './../assets/css/base.css'
    import './../assets/css/product.css'

    //导入组件
    import NavHeader from '@/components/NavHeader.vue'
    import NavFooter from '@/components/NavFooter.vue'
    import NavBread from '@/components/NavBread.vue'

    export default{
        data(){
            return {
                goodsList : [],
                sortFlag  :true,
                page:1,
                pageSize:8,
                busy: true,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice : '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice : '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice : '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice : '5000.00'
                    }
                ],
                priceChecked : 'all',
                filterBy:false,
                overLayFlag:false,
                loading : false
                
            }
        },
        mounted : function(){
          this.getGoodsList();
        },
        methods : {
            getGoodsList(flag){
                var param = {
                    page            : this.page,
                    pageSize        : this.pageSize,
                    sort            : this.sortFlag?1:-1,
                    priceLevel      : this.priceChecked
                };
                this.loading = true;
                axios.get("/goods",{
                    params : param
                }).then((result) => {
                    let res = result.data;
                    this.loading = false;
                    if(res.status === '0'){
                        if(flag){
                            this.goodsList = this.goodsList.concat(res.result.list);
                            if(res.result.count == 0){
                                this.busy = true;
                            }else{
                                this.busy = false;
                            }
                        }else{
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    }else{
                        this.goodsList =[];
                    }
                    // console.log(this.goodsList);
                })
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            showFilterPop(){
                this.filterBy = true;
                this.overLayFlag = true;

            },
            setPriceFilter(index){
                this.priceChecked=index;
                this.page = 1;
                this.getGoodsList();
                this.closePop();
            },
            closePop(){
                this.filterBy = false;
                this.overLayFlag = false;
            },
            loadMore(){   
                this.busy=true;
                setTimeout(() => {
                   this.page++;
                   this.getGoodsList(true);
                }, 500);
            }
            
        },
        components:{
            NavHeader,
            NavFooter,
            NavBread,     
         }
    }
</script>