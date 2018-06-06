<template>
    <div>
        this is GoodsList
        <p>{{msg}}</p>
        <p>{{$route.params.goodsId}}</p>
        <p>{{$route.params.name}}</p>
    </div>
</template>
<style>
    
</style>
<script>
    export default{
        data(){
            return {
                msg : 'linshuling'
            }
        }
    }
</script>