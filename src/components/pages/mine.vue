<template>
  <div class="mine">
    <!-- 顶部登录 -->
    <div class="top">
      <a href="javascript:;" class="set" @click="logout">
        <img src="../../assets/images/set.png" alt />
      </a>
      <h3>个人中心</h3>
      <a href="javascript:;" class="news">
        <span></span>
        <img src="../../assets/images/news.png" alt />
      </a>
      <div class="circle">
        <div class="user-img">
          <img :src="avatarUrl" alt="头像" v-if="showNick" />
        </div>
        <a href="javascript:;" class="tolog" @click="goLog" v-if="!showNick">点击登录</a>
        <a href="javascript:;" class="tolog"  v-if="showNick">{{nickName}}</a>
      </div>
    </div>
    
    <!-- 我的收藏 -->
    <div class="mylike">
      <img src="../../assets/images/keep.png" alt />
      <span>我的收藏</span>
    </div>
    <!-- 小缝隙盒子 -->
    <div class="box"></div>
    <!-- 我的订单 -->
    <div class="my-order">
      <div class="ordertop">
        <h2>我的订单</h2>
        <h3>查看全部订单</h3>
      </div>
      <ul class="ord-bottom">
        <li v-for="(item,index) in orderState" :key="index">
          <span class="botnum"></span>
          <img :src="item.img" alt />
          <p>{{item.state}}</p>
        </li>
      </ul>
      <!-- 小缝隙盒子 -->
      <div class="box"></div>
    </div>
    <!-- 收货地址管理 -->
    <div class="address">
        收货地址管理
    </div>
  </div>
</template>
<script>
 
export default {
  inject:['reload'],
  data() {
    return {
      showNick:false,
      nickName:'',
      avatarUrl:'',
      orderState: [
        {
          img: require("../../assets/images/icon_boligation.png"),
          state: "待付款"
        },
        {
          img: require("../../assets/images/prepare.png"),
          state: "待发货"
        },
        {
          img: require("../../assets/images/icon_consignee.png"),
          state: "待收货"
        },
        {
          img: require("../../assets/images/icon_evaluate.png"),
          state: "待评价"
        },
        {
          img: require("../../assets/images/icon_refund.png"),
          state: "退款/售后"
        }
      ]
    };
  },
  methods:{
    goLog(){
      this.$router.push('/login')
    },
    logout(){
      localStorage.removeItem('mineArr')
      this.reload()
    }
  },
  mounted() {
    let arr = JSON.parse(localStorage.getItem('mineArr'))
      if(JSON.parse(localStorage.getItem('mineArr'))){
        this.showNick=true
        this.nickName=arr[0].nickname
        this.avatarUrl=arr[0].avatarUrl
        console.log(this.nickName,'33333')
      }else{
        this.showNick=false
      }
  },
};
</script>
<style scoped>
@import "../../assets/css/mine.css";
</style>