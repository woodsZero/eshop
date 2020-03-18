<template>
  <div>
    <div class="pingja">
      <ul>
        <li :class="[ifShow==0?'select':'']" @click="ifShow=0">全部好评</li>
        <li :class="[ifShow==1?'select':'']" @click="ifShow=1">好评</li>
        <li :class="[ifShow==2?'select':'']" @click="ifShow=2">差评</li>
        <li :class="[ifShow==3?'select':'']" @click="ifShow=3" style="margin-right:0;">晒单</li>
      </ul>
      <!-- 评价详情 -->
      <div class="content-box" v-if="s==ifShow" v-for="(value,key,s) in buyerReviews" :key="s">
        <div v-for="(review,reId) in value" :key="reId">
          <div class="c-top clearfix">
            <span class="user-name">{{review.buyerName}}</span>
            <span class="time">{{review.createTime | Totime(review.createTime)}}</span>
          </div>
          <div class="c-img">
            <img :src="img" alt="商品" v-for="(img,imgId) in review.postImg" :key="imgId" />
          </div>
          <p class="buyer-say">{{review.postDescribe}}</p>
          <p class="seller-say">{{review.adminReviews}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifShow: 0,
    };
  },
  props: ["buyerReviews"],
  filters:{
    Totime(n){
    // console.log(n,'nnnnnnn');
    let date = new Date(parseInt(n))
    // console.log(date,'ddddddd')
    let year = date.getFullYear()
    // console.log(year,'年')
    let month = date.getMonth()+1 >=10 ? date.getMonth()+1 : "0" +( date.getMonth()+1)
    let day = date.getDate() >=10 ? date.getDate() : "0"+ date.getDate()
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds()
    // console.log(day,'天')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
  }
};
</script>
<style scoped>
@import "../../assets/css/pingjia.css";
</style>