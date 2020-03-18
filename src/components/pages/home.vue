<template>
  <div class="index">
    <div class="banner">
      <van-search props="right-icon" placeholder="Montagne jeunesse" v-model="value" background />
    </div>
    <!-- 商品 -->
    <div class="str">
      <!-- ========今日疯抢================ -->
      <div class="good" v-if="index==0" v-for="(item,index) in list" :key="index">
        <div class="title">
          <img src="../../assets/images/hot.png" alt class="icon" />
          <span class="text">{{item.name}}</span>
        </div>
        <ul class="clearfix">
          <li v-for="ite in item.list" :key="ite.id" @click='toDetail(ite.id)'>
            <div class="img">
              <img :src="ite.thumbnail" alt />
            </div>
            <p class="price">
              <span class="newP">￥{{ite.reduct_price}}</span>
              <span class="oldP">￥{{ite.original_price}}</span>
            </p>
            <p class="msg">{{ite.name}}</p>
          </li>
        </ul>
      </div>
      <!-- =======循环商品==================== -->
      <div class="good" v-if="inx!=0" v-for="(it,inx) in list" :key="inx">
        <div class="title">
          <img src="../../assets/images/hot.png" alt class="icon" />
          <span class="text">{{it.name}}</span>
        </div>
        <ul class="clearfix">
          <li v-for="content in it.list" :key="content.id" @click="toDetail(content.id)">
            <div class="img">
              <img :src="content.thumbnail"/>
            </div>
            <p class="msg">美国/SUPER MILD沐浴露500ml</p>
            <p class="price He">
              <span class="newP Ha">￥{{content.reduct_price}}</span>
              <span class="oldP">￥{{content.original_price}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 导航栏 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      list: [],
    };
  },
  methods:{
    toDetail(n){
      this.$router.push({
        path:'/goodsDetail',
        query:{
          pid:n
        }
      }) 
    }
  },
   mounted() {
        this.$axios({
          url:'http://yd.msword.top/getIndexData',
          method:'get'
        })
        .then(res=>{
          // console.log(res,'我是首页挂载的res')
          this.list=res.data.data
          // console.log(this.list,'this.list')
        })
        .catch(err=>{
          console.log(err,'我是首页挂载的错误信息')
        })
      },
};
</script>
<style scoped>
.str{
  background: #fafafa;
  padding-bottom:1.22rem
}
.banner {
  height: 5.21rem;
  background: url(../../assets/images/banner.png) no-repeat;
  background-size: cover;
}
.van-cell {
  display: flex;
  flex-direction: row-reverse;
  height: 0.62rem;
  width: 5.16rem;
  padding: 0;
}
.good {
  background: #fafafa;
  padding-left: 0.19rem;
}
.title {
  font-size: 0;
  padding-top: 0.26rem;
  padding-bottom: 0.3rem;
}

.title img {
  height: 0.38rem;
  vertical-align: bottom;
}
.title .text {
  display: inline-block;
  font-size: 0.28rem;
  margin-left: 0.2rem;
}
li {
  width: 3.24rem;
  border: 2px solid #eee;
  background: #fff;
  margin-right: 0.23rem;
  float: left;
}
.img {
  height: 3.32rem;
  width: 3.24rem;
}
.img img {
  display: block;
  height: 3.32rem;
  max-width: 3.24rem;
  margin: auto;
}
.price {
  padding: 0 0.39rem 0 0.3rem;
}
.He {
  padding-bottom: 0.2rem;
}
.price .newP {
  font-size: 0.28rem;
  color: #e60012;
}
.price .oldP {
  font-size: 0.28rem;
  color: #666;
  float: right;
  text-decoration: line-through;
}
.price .Ha {
  color: #ffa002;
}
.msg {
  padding-left: 0.2rem;
  padding-right: 0.24rem;
  padding-bottom: 0.14rem;
  font-size: 0.28rem;
  line-height: 0.44rem;
  overflow: hidden;
}
</style>