<template>
  <div class="goodsDetail">
    <!-- 小蒙版 -->
    <div class="mengban" v-if="show"></div>
    <div class="detail-top">
      <div>
        <span class="back-icon" @click="$router.go(-1)">
          <img src="../assets/images/detailback.png" />
        </span>
        <span class="car-icon" @click="gocar">
          <img src="../assets/images/detailcar.png" />
        </span>
        <span class="dian-icon">
          <img src="../assets/images/threeDian.png" />
        </span>
      </div>
      <!-- 轮播图组件 -->
      <my-swiper :swiperImg="swiperImg"></my-swiper>
    </div>
    <!-- 商品介绍 -->
    <div class="goodsInfo">
      <div class="infoTop clearfix">
        <p class="title">{{goodsInfo.name}}</p>

        <div class="starLike">
          <img src="../assets/images/likeStar.png" />
          <span>收藏</span>
        </div>
      </div>
      <div class="priceDetail">
        <span class="priceNew">￥{{goodsInfo.reduct_price}}</span>
        <span class="discount">{{goodsInfo.allowance}}折</span>
        <span class="free-send">包邮</span>
      </div>
      <div class="bottom-tag">
        <span class="priceOld">￥{{goodsInfo.original_price}}</span>
        <ul class="tag clearfix">
          <li v-for="(item,index) in goodsInfo.describe" :key="index">{{item}}</li>
        </ul>
      </div> 
    </div>
    <!-- 空盒子 -->
    <div class="null"></div>
    <!-- 商品详情与商品评价 -->
    <div class="sort clearfix">
      <div class="shopDetail" :class="[flag?'select':'formal']" @click="flag=true">商品详情</div>
      <div class="res" :class="[!flag?'select':'formal' ]" @click="flag=false">买家口碑</div>
    </div>
    <!-- 商品详情 -->
    <div class="xiangqing" v-if="flag">
      <img :src="imgs" v-for="(imgs,order) in goodsInfo.shopDes" :key="order" />
    </div>
    <!-- 买家口碑 -->
    <div class="pingjia" v-if="!flag">
        <ping-jia :buyerReviews='buyerReviews'></ping-jia>
    </div>
    <!-- 底部 -->
    <div class="Guige" v-if="show">
      <div class="g-top">
        <div class="goodimg">
          <img :src="swiperImg[0]" alt />
        </div>
        <div class="props">
          <h3>￥{{goodsInfo.reduct_price}}</h3>
          <p>库存{{goodsInfo.total}}件</p>
          <p>请选择商品属性</p>
          <span class="close" @click="show=false"></span>
        </div>
      </div>
      <div class="bu-num">
        <span>购买数量</span>
        <van-stepper v-model="value" input-width="0.75rem" in button-size="0.41rem" />
      </div>
      <!-- 大小 -->
      <div class="sku">
        <p>{{sku[0].name}}</p>
        <ul class="clearfix">
          <li @click="num1=ind" v-for="(ite,ind) in size" :key="ind" :class="[ind==num1?'selected':'']">{{ite}}</li>
        </ul>
        <p>{{sku[1].name}}</p>
        <ul class="clearfix">
          <li @click="num2=inde" v-for="(item,inde) in age" :key="inde" :class="[inde==num2?'selected':'']">{{item}}</li>
        </ul>
      </div>
    </div>

    <div class="buybox">
      <div class="allprice">
        总价：
        <span>￥{{allprice}}</span>
      </div>
      <div class="buynow" @click="isShow">立即购买</div>
      <div class="addcar" @click="isShow">加入购物车</div>
    </div>
  </div>
</template>
<script>
import "../../node_modules/swiper/js/swiper.min.js";
import Swiper from "swiper";
import mySwiper from "./views/swiper";
import pingJia from './views/pingjia'

export default {
  data() {
    return {
        tags: ["正品货源", "一件代发", "全球直邮", "售后无忧"],
        flag: true,
        show: false,
        num1:-1,
        num2:-1,
        value: "",
        swiperImg:[],
        goodsInfo:[],
        sku: [],
        size:[],
        age:[],
        price:'',
        buyerReviews:{},
        data:{
          size:'',
          age:'',
          num:1,
          imgsrc:'',
          price:'',
          checked:false,
          describe:'',
          pid:''
        }
    };
  },
  methods:{
    gocar(){
       this.$router.push({path:'/shopCar'})
    },
    mySwiper(){
      var swiper = new Swiper(".swiper-container", {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      })
    },
    isShow(){
      this.show=true
      console.log(this.show)
      if(this.num1!=-1&&this.num2!=-1){
        this.$router.push({
          path:'/shopCar'
        })
        let arr=[]
        
        this.data.size = this.size[this.num1]
        this.data.age = this.age[this.num2]
        this.data.num=this.value
        this.data.imgsrc = this.swiperImg[0]
        this.data.price = this.price
        this.data.describe = this.goodsInfo.name
        this.data.pid = this.goodsInfo.pid
        console.log(this.data)
        let obj = this.data
        
        if(localStorage.getItem('arrCar')){
          arr=JSON.parse(localStorage.getItem('arrCar'))
          console.log(arr,'存储有值arr')
          arr.push(obj)
          localStorage.setItem('arrCar',JSON.stringify(arr))
        }else{
          console.log('无存储')
          arr.push(obj)
          localStorage.setItem('arrCar',JSON.stringify(arr))
        }
        
      }
    },
    init(){
        this.$axios({
            url:'http://yd.msword.top/getDetails?pid='+this.$route.query.pid,
            method:'get'
          })
          .then(res=>{
            // 轮播图
            this.swiperImg=res.data.data.swiperImgArr
            // console.log(this.swiperImg,'swiperImg')
            // 轮播图下方的商品详情
            this.goodsInfo=res.data.data
            // 商品规格
            this.sku=res.data.data.buySelect
            this.size=res.data.data.buySelect[0].list
            this.age=res.data.data.buySelect[1].list
            this.price=res.data.data.reduct_price
            console.log(res,'res商品详情')
            // 买家口碑
            this.buyerReviews=res.data.data.buyerReviews
          this.$nextTick(()=>{
              this.mySwiper();
              
            })
          })
        .catch(err=>{
          console.log(err,'商品详情的错误')
        })
    }
  },

  computed: {
    allprice(){
      // console.log(this.value,'value')
      return  this.value*this.price;
    }
  },
  mounted() {
    this.init()
  },
  activated(){
    this.init()
  },
  components: {
    mySwiper,
    pingJia
  }
};
</script>
<style scoped>
@import "../assets/css/goodsDetail.css";
@import "../assets/css/buy.css";
.mengban{
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, .4);
  z-index: 100;
}
.buybox {
  position: fixed;
  width: 100%;
  height: 0.97rem;
  bottom: 0;
  border-top: 1px solid #ddd;
  background: #fff;
  z-index: 101;
}
.allprice {
  height: 0.97rem;
  line-height: 0.97rem;
  padding-left: 0.3rem;
  font-size: 0.3rem;
  float: left;
}
.allprice span {
  display: inline-block;
  color: #ed3d3d;
  font-size: 0.3rem;
}
.addcar {
  background: #ff9900;
  color: #fff;
  height: 0.97rem;
  line-height: 0.97rem;
  font-size: 0.3rem;
  padding: 0 0.26rem;
  float: right;
}
.buynow {
  float: right;
  background: #eb2222;
  color: #fff;
  height: 0.97rem;
  line-height: 0.97rem;
  font-size: 0.3rem;
  padding: 0 0.4rem;
}
</style>