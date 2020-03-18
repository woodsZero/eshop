<template>
  <div>
    <div class="sort">
      <div class="top">
        <van-search props="right-icon" placeholder="Montagne jeunesse" v-model="value" background />
      </div>
      <div class="list">
        <!-- 侧边导航栏 -->
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="母婴专区" @click="num=0" />
          <van-sidebar-item title="美妆护肤" @click="num=1" />
          <van-sidebar-item title="家居生活" @click="num=2"/>
          <van-sidebar-item title="食品营养" @click="num=3"/>
          <van-sidebar-item title="全球直邮" @click="num=4"/>
        </van-sidebar>
        <div class="right">
          <ul class="clearfix"v-if='index==num' v-for="(item,index) in sort" :key="index">
            <li  v-for="(ite,inde) in item.list" :key="inde" @click="toDetail(ite.id)">
              <a href="javascript:;" class="link-good">
                <div class="img"><img :src="ite.thumbnail" alt=""/></div>
                <p class="name">{{ite.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      activeKey: 0,
      num:0,
      sort: []
    };
  },
  methods:{
    toDetail(sId){
      this.$router.push({
        path:'/goodsDetail',
        query:{
          pid:sId
        }
      })
    }
  },
  mounted() {
    this.$axios({
      url:'http://yd.msword.top/getClassify'
    })
    .then(res=>{
      this.sort=res.data.data
      console.log(res,'res')
    })
    .catch(err=>{
      console.log(err,'我是商品分类中的err')
    })
  },

};
</script>
<style scoped>
.top {
  background: #ff9900;
  text-align: center;
  padding: 0.42rem 0.28rem 0.25rem 0.34rem;
}
.van-cell {
  display: flex;
  flex-direction: row-reverse;
  height: 0.62rem;
  width: 5.16rem;
  padding: 0;
}
.van-sidebar {
  float: left;
}
.van-sidebar-item {
  width: 2.34rem;
  height: 0.94rem;
  /* line-height: 0.94rem; */
  text-align: center;
}
.van-sidebar-item--select {
  width: 2.24rem;
  height: 0.94rem;
  /* line-height: 0.94rem; */
  border-left: 0.1rem solid #1d84a7;
}

.right {
  float: right;
  width: 5.16rem;
  padding-top:0.21rem;
  padding-bottom: 1.26rem;
 
}
.right li{
    float: left;
    width: 2.26rem;
    height: 2.2rem;
    border: 2px solid #1d84a7;
    border-radius: 5px;
    padding-top:0.14rem;
    margin-left:0.22rem;
    margin-bottom: 0.23rem;
    
}
.link-good{
    display: block;
}
.link-good .img img{
    display: block;
    height: 1.73rem;
    margin: auto
}
.name{
    background: #1d84a7;
    height: 0.47rem;
    text-align: center;
    color:#fff;
    line-height: 0.47rem;
}
.van-sidebar{
    width: 2.34rem;
}
</style>