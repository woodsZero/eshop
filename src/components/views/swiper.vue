<template>
  <div>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperImg" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {};
    
  },
  props: ['swiperImg'],
  methods: {
    
  },
  mounted() {
  }
};
</script>
<style >
@import "../../../node_modules/swiper/css/swiper.min.css";
.swiper-container {
  height: 5.42rem;
}
.swiper-container img {
  height: 5rem;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-container .swiper-pagination-bullet-active {
  background-color: #ff9900;
}
</style>