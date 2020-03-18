<template>
  <div>
    <div class="top">
      <a href="javascript:;" class="back" @click="$router.go(-1)" >
        <img src="../assets/images/icon_back.png" alt />
      </a>
      <h3>登录</h3>
      <a href="javascript:;" class="register" @click="toRegister">注册</a>
    </div>
    <!-- 空白页腾距离 -->
    <div class="null"></div>
    <!-- 信息输入框 -->
    <van-cell-group>
      <van-field
        v-model="userPhone" 
        clearable
        label="手机号："
      />
      <van-field v-model="password" type="password" label="密码："  clearable/>
    </van-cell-group>
    <!-- 忘记密码 -->
    <div class="clearfix forget"><span>忘记密码</span></div>
    <div class="btn"><button @click="toMine">登录</button></div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            userPhone:'',
            password:''
        }
    },
    methods:{
      toRegister(){
        this.$router.push('/register')
      },
      toMine(){
        if(this.userPhone==''||this.password==''){
          alert('请填入必传参数')
        }else{
          this.$axios({
            url:'http://localhost:3000/login/cellphone',
            params:{
              phone:this.userPhone,
              password:this.password
            }
          })
          .then(res=>{
            console.log(res,'登录页面res')
             this.$router.push('/mine')
             let mineArr=[]
             let obj={
               nickname:res.data.profile.nickname,
               avatarUrl:res.data.profile.avatarUrl,
             }
             mineArr.push(obj)
             localStorage.setItem('mineArr',JSON.stringify(mineArr))
          })
          .catch(err=>{
            alert('密码或手机号输入错误')
            console.log(err,'登录页面的错误')
          })
        }
       
      }
    }
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/index.styl';

.top {
  background: $primary;
  text-align: center;
  padding: 0.42rem 0.28rem 0.25rem 0.34rem;

  a {
    float: left;

    img {
      width: 0.24rem;
      height: 0.42rem;
    }
  }

  h3 {
    display: inline-block;
    font-family: $hei;
    font-size: 0.38rem;
    color: #fff;
  }

  .register {
    float: right;
    font-family: $hei;
    font-size: 0.38rem;
    color: #fff;
  }
}

.null {
  height:1.89rem;
}
.van-cell-group
    padding 0 0.75rem
    .van-cell
        width 6.15rem
        padding-left 0
        padding-bottom 0.45rem
        padding-top:0.55rem
        font-size 0.32rem
        color:#333
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border none
.van-cell:not(:last-child):after
    border none
.van-cell[data-v-10d9df09]::after
    width 6rem
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #a3a3a3;
    transform: scaleY(.5);  
.forget
    margin-top 0.43rem
    margin-bottom 0.29rem
    span 
     padding 0 0.75rem
     float right
     color #666
.btn
    text-align center
    button 
        width 6rem
        height 1rem
        border  none 
        background $primary
        color #ffffff
        font-size 0.38rem
        border-radius 0.05rem
</style>