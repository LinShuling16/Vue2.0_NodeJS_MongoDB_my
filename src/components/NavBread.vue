<template>
    <section class="bread">
        <div class="bread-wrap">
            <nav class="">
                <a href="/">
                    Home
                </a>
                <slot></slot>
            </nav>
        </div>
    </section>
</template>
<style>
  .bread{
      height: 45px;
      width: 100%;
      line-height: 45px;
      background-color: #f0f0f0;
  }
  .bread-wrap{
      width: 100%;
      margin: 0 auto;
      max-width: 1280px;
      padding: 0 20px;
      font-size: 14px;
      color: #a1a1a1;
      text-align: left;
  }
  .bread-wrap a{
    position: relative;
    margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
