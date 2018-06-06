<template>
    <div>
        {{msg}}
        <p>{{$route.query.goodsId}}</p>
    </div>
</template>
<style>
    
</style>
<script>
    export default{
        data(){
            return {
                msg : 'Cart'
            }
        }
    }
</script>