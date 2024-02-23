<template>
<div id='swiper'>
  <div class="swiper"  @mouseenter="mySwiper.autoplay.stop()" @mouseleave="mySwiper.autoplay.start()">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 11</div>
        <div class="swiper-slide">Slide 12</div>
        <div class="swiper-slide">Slide 13</div>
        <div class="swiper-slide">Slide 21</div>
        <div class="swiper-slide">Slide 22</div>
        <div class="swiper-slide">Slide 23</div>
    </div>
</div>
</div>
</template>

<script>
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'
export default {
  mounted(){
    this.mySwiper = new Swiper ('.swiper', {
        speed: 1000,
        mousewheel: true,
        autoplay:false,
        autoplay: { // 自动开始
          delay: 500, // 时间间隔
          stopOnLastSlide: false,
          disableOnInteraction: false, //* 手动操作轮播图后不会暂停*
          pauseOnMouseEnter: true
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true, // 循环模式选项
    })
  }
}
</script>
<style lang='less' scoped>
#swiper{
  margin:  0 auto;
  width: 100%;
}
.swiper {
    width: 50%;
    line-height: 30px;
    height: 30px;
    margin:  0 auto;
}
.swiper-wrapper,
.swiper-slide{
  width: 100%;
  height: 100%;
  background: #2baa0c;
  border: #2a073b solid 1px;
}
</style>
