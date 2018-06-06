<template>
    <div>
        this is GoodsList
        <!-- 
            嵌套路由：同一个页面不同菜单的切换
            注意这里的to属性要写绝对地址
         -->
        <router-link to="/goods/title">显示Title</router-link>
        <router-link to="/goods/img">显示Image</router-link>

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
        }
    }
</script>