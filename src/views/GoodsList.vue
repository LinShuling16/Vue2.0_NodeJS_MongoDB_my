<template>
    <div>
        this is GoodsList
        <!-- 
            嵌套路由：同一个页面不同菜单的切换
            注意这里的to属性要写绝对地址
         -->
        <router-link to="/goods/title">显示Title</router-link>
        <router-link to="/goods/img">显示Image</router-link>
        <p>
            <!-- 这里使用router-link实现页面跳转 -->
            <router-link to="/Cart">跳转到购物车页面</router-link>
            
            <!-- 这里使用js(编程式路由)来实现跳转 -->
            <button v-on:click="jump">button - 跳转到购物车页面</button>


            <!-- 通过命名路由来实现跳转 -->
            <!-- 注意这里要用v-bind指令 -->
            <router-link v-bind:to="{name:'cart',params:{cartId:22}}">跳转到购物车页面</router-link>
        </p>

        <div>
            <router-view/>
        </div>
    </div>
    
</template>
<style>
    
</style>
<script>
    export default{
        data(){
            return {
                msg : '77'
            }
        },


        methods : {
            //编程式路由
            jump(){
                // this.$router.push("/cart");//ok
                
                // this.$router.push({path:'./cart'});//ok
                
                this.$router.push({path:'./cart?goodsId=123'});//ok

            }
        }
    }
</script>