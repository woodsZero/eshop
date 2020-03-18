<template>
  <div>
    <div class="top">
      <a href="javascript:;" class="back" @click="$router.go(-1)">
        <img src="../assets/images/icon_back.png" alt />
      </a>
      <h3>注册</h3>
      <a href="javascript:;" class="register" @click="$router.push('/login')">登录</a>
    </div>
    <!-- 空白页腾距离 -->
    <div class="null"></div>
    <!-- 信息输入框 -->
    <van-cell-group>
      <div class="get-msg" @click="getPassMsg" v-if="!showpassMes">点击获取</div>
      <div class="get-msg"  v-if="showpassMes">{{nextime}}秒后重新发送</div>
      <van-field v-model="userName" clearable label="昵称：" @click="showPromP=false" />
      <van-field
        v-model="phone"
        clearable
        label="手机号："
        @blur="judgePhone"
        @click="showPromP=false"
      />
      <!-- 手机号格式判断提示信息 -->
      <div class="prompot" v-if="showPromP">{{promptP}}</div>
      <div class="pass">
        <van-field
          v-model="password"
          type="password"
          label="密码："
          placeholder="输入6-10位含数字字母密码"
          clearable
          @blur="judgeCode"
        />
        <!-- 密码匹配提示信息 -->
        <div class="prompotCode" v-if="showPromC">{{promptCode}}</div>
      </div>

      <van-field v-model="passMsg" label="验证码：" clearable />
    </van-cell-group>
    <div class="btn">
      <button @click="toLog">下一步</button>
    </div>
    <p>
      <van-checkbox v-model="checked" shape="square"></van-checkbox>我已阅读并同意使用
      <a href="javascript:;">
        <b>条款和隐私政策</b>
      </a>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      passMsg: "",
      checked: false,
      phone: "",
      promptP: "",
      showPromP: false,
      promptCode: "",
      showPromC: false,
      userName: "",
      showpassMes: false,
      nextime: 60
    };
  },
  methods: {
    judgePhone() {
      if (this.phone == "") {
        this.showPromP = true;
        this.promptP = "* 请输入手机号";
      } else {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(this.phone)) {
          this.showPromP = true;
          this.promptP = "* 请输入正确的手机号";
        } else {
          this.showPromP = false;
        }
      }
      console.log(this.phone, "手机号");
    },
    judgeCode() {
      console.log(this.password, "密码");
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
      if (!reg.test(this.password)) {
        this.showPromC = true;
        this.promptCode = "* 请输入6-10位有数字和字母混合组成的密码";
        // console.log(1111111)
      } else {
        // console.log(2222222)
        this.showPromC = false;
        this.promptCode = "";
      }
    },
    getPassMsg() {
      if(this.phone==''){
        alert('手机号不能为空！')
        return
      }
      this.showpassMes = true;
      console.log(this, "this");
     
      this.$axios("http://localhost:3000/captcha/sent?phone=" + this.phone)
        .then(res => {
          console.log(res, "发送验证码");
        })
        .catch(err => {
          console.log(err, "发送验证码失败信息");
        });
      // 设置倒计时
      let timer = null;
      clearInterval(timer);
      if (this.nextime > 0) {
        timer = setInterval(() => {
          this.nextime--;
          if (this.nextime == 0) {
            this.showpassMes = false;
            clearInterval(timer);
            this.nextime = 60;
          }
        }, 1000);
      }
    },
    toLog() {
      /*  this.$axios({
          path:''
        }) */
      if (!this.checked) {
        alert("阅读并同意使用条款和隐私政策，才能进行下一步哦！");
      } else {
        console.log(this.phone, this.passMsg);
        this.$axios({
          url: "http://localhost:3000/captcha/verify",
          params: {
            phone: this.phone,
            captcha: this.passMsg
          }
        })
          .then(res => {
            console.log(res, "res");
            this.$axios({
              url: "http://localhost:3000/cellphone/existence/check",
              params: {
                phone: this.phone
              }
            })
              .then(res => {
                console.log(res, "res验证是否注册过");
                if (res.data.exist == -1) {
                  this.$axios({
                    url: "http://localhost:3000/register/cellphone",
                    params: {
                      phone: this.phone,
                      password: this.password,
                      captcha: this.passMsg,
                      nickname: this.userName
                    }
                  })
                    .then(res => {
                      console.log(res, "调用注册接口显示的res");
                      this.$router.push({
                        path: "/mine",
                        query: {
                          phone: this.phone,
                          password: this.password,
                          captcha: this.passMsg,
                          nickname: this.userName
                        }
                      });
                      alert("注册成功，快开启你的购物之旅");
                    })
                    .catch(err => {
                      console.log(err, "注册时出现错误");
                    });
                } else if (res.data.exist == 1) {
                  alert("您已经注册过了哦，快去登录吧");
                  this.$push("/mine");
                }
              })
              .catch(err => {
                console.log(err, "是否注册错误");
              });
          })
          .catch(err => {
            alert("验证码输入错误");
            console.log(err, "验证验证码发生错误");
          });
      }
      console.log(this.checked, "check");
    }
  }
};
/* {
exist: 1,
nickname: "同手同脚098",
hasPassword: true,
code: 200
} */
</script>
<style lang="stylus" scoped>
@import '../assets/css/index.styl';

.prompotCode {
  position: absolute;
  left: 0rem;
  top: 1.6rem;
  color: #fe0041;
  // height 0.24rem;
  line-height: 0.24rem;
  font-size: 0.28rem;
  z-index: 10;
}

.pass {
  position: relative;
}

.prompot {
  position: absolute;
  left: 0.75rem;
  top: 1.6rem;
  color: #fe0041;
  // height 0.24rem;
  line-height: 0.24rem;
  font-size: 0.28rem;
  z-index: 10;
}

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
  height: 1.12rem;
}

.van-cell-group {
  padding: 0 0.75rem;
  position: relative;

  .get-msg {
    color: #fe0041;
    position: absolute;
    right: 1.25rem;
    bottom: 0.65rem;
    z-index: 10;
    font-size: 0.28rem;
  }

  .van-cell {
    width: 6.15rem;
    padding-left: 0;
    padding-bottom: 0.45rem;
    padding-top: 0.55rem;
    font-size: 0.32rem;
    color: #333;
  }
}

.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
  border: none;
}

.van-cell:not(:last-child):after {
  border: none;
}

.van-cell[data-v-8f8a1d9a]::after {
  width: 6rem;
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 2px solid #a3a3a3;
  transform: scaleY(0.5);
}

.btn {
  text-align: center;

  button {
    width: 6rem;
    height: 1rem;
    border: none;
    background: $primary;
    color: #ffffff;
    font-size: 0.38rem;
    margin-top: 0.48rem;
  }
}

p {
  margin-top: 0.5rem;
  padding: 0 0.75rem;
  text-align: left;
}

.van-checkbox {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 0.05rem;
}
</style>