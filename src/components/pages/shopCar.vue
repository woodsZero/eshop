<template>
  <div class="shopcar">
    <!-- 设置背景 -->
    <div class="bg"></div>
    <div class="top">
      <a href="javascript:;" class="back" @click="$router.go(-1)">
        <img src="../../assets/images/icon_back.png" alt />
      </a>
      <h3 class="title">购物车</h3>
    </div>
    <div class="have" v-if="isShow">
      <ul class="Carlist">
        <li v-for="(item,index) in skuArr" :key="index">
          <div class="list-top">
            <span class="car-icon"></span>
            <span car-store>杭州保税区仓</span>
          </div>

          <!-- ======================== -->
          <div class="detail" ref="move" @touchstart="moveS(index,$event)" @touchmove="moveM(index,$event)" @touchend="moveE(index,$event)">
            <van-checkbox v-model="item.checked" @click="checkOne(index)">
              <img slot="icon" slot-scope="props" :src="props.checked ? activeIcon : inactiveIcon" />
            </van-checkbox>
            <img :src="item.imgsrc" class="imgGood" />
            <div class="mid-box">
              <div class="position">
                <p class="name">{{item.describe}}</p>
                <span class="good-prop">{{item.size}}</span>
                <span class="good-prop">{{item.age}}</span>
                <div class="addnum">
                  <van-stepper v-model="item.num" input-width="0.75rem" in button-size="0.41rem" />
                </div>
              </div>
            </div>
            <span class="price">￥{{item.price*item.num}}</span>
            <div class="del" @click="delGoods(index)">删除</div>
          </div>
          <!-- =====================================-->
        </li>
      </ul>
      <div class="bottom">
        <div class="sel-all">
          <van-checkbox v-model="checkedAll" @click="checkAll">
            <img slot="icon" :src="checkedAll ? activeIcon : inactiveIcon" />
          </van-checkbox>
          <h2 class="vant-laji">全选</h2>
        </div>
        <div class="editor">
          <van-checkbox v-model="checkedEditor">
            <img slot="icon" :src="checkedEditor? activeIcon : inactiveIcon" />
          </van-checkbox>
          <h2 class="vant-laji">编辑</h2>
        </div>
        <div class="msg">
          <h2>合计：{{allPrice}}</h2>
          <h2>(不含运费)</h2>
        </div>
        <div class="right">去结算</div>
      </div>
    </div>
    <div class="nogood" v-if="!isShow">
      <img src="../../assets/images/shopping_wu.png" alt />
      <h2 class="Kong">
        购物车还是空的
        <br />快去逛逛吧~
      </h2>
    </div>
  </div>
</template>
<script>
/* let move = document.getElementsByClassName('detail')
let startY = 0
let endY = 0
let startX = 0
let endX = 0
console.log(move,'move')
for(let k=0;k<move.length;k++){
  move[k].ontouchstart=function(e){
    console.log(this,'this')
     console.log(e.touches[k].clientX, '触发的X坐标点')
     console.log(e.touches[k].clientY, '触发点的y轴坐标')
  }
} */
let startY = 0
let endY = 0
let startX = 0
let endX = 0
export default {
  inject: ["reload"],
  data() {
    return {
      isShow: false,

      // checked: false,
      checkedAll: false,
      checkedEditor: false,
      activeIcon: require("../../assets/images/radio_hig.png"),
      inactiveIcon: require("../../assets/images/radio_nor.png"),
      skuArr: [],
      amount: 0,
      goods: [
        {
          img: require("../../assets/images/carGood1.png"),
          name: "ChildLife/童年时光婴幼..."
        }
      ]
    };
  },
  /*   watch:{
    skuArr:{
      deep:true,
      handler:function(a){
        console.log(a,'sku数组中的属性被监控')
        console.log(a[1].checked,'我是被监听的布尔值')
        a.map((item,index)=>{
          allPrice=item.price*item.num
        })
      }
    }
  },
   */
  mounted() {
    this.skuArr = JSON.parse(localStorage.getItem("arrCar"));
    // console.log(this.skuArr, "11111");
    if (this.skuArr) {
      this.isShow = true; 
    } else {
      this.isShow = false;
    }
    // this.value = skuArr.num
    // console.log(JSON.parse(localStorage.getItem('arrCar')),'arrCar')
  },
  methods: {
    checkOne(i) {
      this.skuArr[i].checked = !this.skuArr[i].checked;
      console.log(this.skuArr, "skuArr");
      // 用map映射把checked状态，放置一个新的数组中
      let result = this.skuArr.map((item, index) => {
        // console.log(item.checked,'item.checked')
        return item.checked;
      });
      // console.log(result,'result')
      // 利用数组的every方法，判断结果数组是否都为true 如果都为true，就返回true
      let bool = result.every((item, index) => {
        return item == true;
      });
      // console.log(bool,'bool')
      if (bool == true) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
      // console.log(this.amount,'amount')
    },
    checkAll() {
      this.checkedAll = !this.checkedAll;
      if (this.checkedAll) {
        this.skuArr.map((item, index) => {
          item.checked = true;
        });
      } else {
        this.skuArr.map((item, index) => {
          item.checked = false;
        });
      }
    },
    delGoods(i) {
      let arr = JSON.parse(localStorage.getItem("arrCar"));
      // console.log(arr,'arr')
      arr.splice(i, 1);
      localStorage.setItem("arrCar", JSON.stringify(arr));
      if (arr.length == 0) {
        localStorage.removeItem("arrCar");
      }
      // console.log(arr,'arr')
      this.reload();
    },
    moveS(index,e) {
      // console.log(index,'index')
      // console.log(e.touches[0].clientX,'startX')
       startX = e.touches[0].clientX
    },
    moveM(index,e) {
       endX = e.touches[0].clientX
      //  console.log(startX,'startX')
       let disX=endX-startX
      //  获取按钮宽度
      //  let wd = this.$refs.move[index].offsetWidth;
      //  console.log(disX,'diX')
       if(disX<0){
          // this.$refs.move[index].style.transitionProperty='transform'
          this.$refs.move[index].style.transitionDuration='0.25s'
          this.$refs.move[index].style.transform='translateX(-0.8rem)'
        //  console.log('往左滑')
       }
       if(disX>0){
        //  this.$refs.move[index].style.transitionProperty='transform'
          this.$refs.move[index].style.transitionDuration='0.25s'
         this.$refs.move[index].style.transform='translateX(0)'
        //  console.log('往右滑')
       } 
    /*  if(diX<wd){
          this.$refs.move[index].style.left=disX+'px'
       }else{
         return
       } */
       
    },
    moveE(index,e) {

    }
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.skuArr.map((item, index) => {
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      // console.log(sum,'sum')
      return sum;
    }
  }
};
</script>
<style scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fafafa;
  z-index: -1;
}
.shopcar {
  width: 7.5rem;
  overflow: hidden;
  padding-bottom: 2rem;
}
.have {
  background: #fff;
}
.nogood {
  text-align: center;
  margin: auto;
  padding-top: 3.34rem;
}
.nogood img {
  height: 0.88rem;
}
.nogood .Kong {
  font-size: 0.33rem;
  line-height: 0.46rem;
  text-align: center;
}
.top {
  background: #ff9900;
  text-align: center;
  padding: 0.42rem 0.28rem 0.25rem 0.34rem;
}
.top a {
  float: left;
}

.top img {
  width: 0.24rem;
  height: 0.42rem;
}

.top .title {
  display: inline-block;
  font-size: 0.38rem;
  color: #fff;
}
.Carlist {
  background: #fafafa;
}
.Carlist li {
  padding-left: 0.35rem;
  padding-top: 0.38rem;
  height: 2.93rem;
}
.list-top {
  font-size: 0;
  height: 0.35rem;
}
.list-top span {
  display: inline-block;
  color: #999;
  font-size: 0.28rem;
  /* line-height: 0.36rem; */
  vertical-align: middle;
}
.list-top .car-icon {
  width: 0.36rem;
  height: 0.35rem;
  background: url(../../assets/images/store.png) no-repeat;
  background-size: cover;
  margin-right: 0.26rem;
}
.detail {
  width: 7.95rem;
  padding-top: 0.52rem;
  position: relative;
}
.van-checkbox {
  display: inline-block;
}
.Carlist .van-checkbox img {
  height: 0.42rem;
  width: 0.42rem;
}
.Carlist .imgGood {
  width: 1.57rem;
  vertical-align: middle;
  margin-left: 0.2rem;
}
.mid-box {
  position: relative;
  display: inline-block;
  width: 2.72rem;
  height: 1.6rem;
  margin-left: 0.21rem;
  vertical-align: middle;
}
.mid-box .position {
  position: absolute;
  left: 0;
  top: 0;
}
.mid-box .name {
  width: 2.72rem;
  line-height: 0.42rem;
  font-size: 0.33rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mid-box .good-prop {
  display: inline-block;
  color: #999;
  font-size: 0.28rem;
  margin-bottom: 0.2rem;
}
.mid-box .position .van-stepper__input {
  margin: 0;
}
.price {
  display: inline-block;
  font-size: 0.33rem;
  text-align: center;
}
.del {
  height: 2rem;
  width: 0.8rem;
  position: absolute;
  right: 0;
  top: 0.52rem;
  /* display: inline-block; */
  text-align: center;
  background: #ff9900;
  line-height: 2rem;
  /* float: right; */
  vertical-align: middle;
  color: #fff;
  letter-spacing: 2px;
}
.bottom {
  position: fixed;
  width: 7.5rem;
  bottom: 1.04rem;
  height: 1.12rem;
  border-top: 2px solid #eee;
}
.bottom div {
  float: left;
}

.bottom img {
  width: 0.42rem;
  height: 0.42rem;
}
/* .bottom .editor img {
  width: 0.47rem;
  height: 0.47rem;
} */

.editor .van-checkbox {
  height: 0.42rem;
  margin-bottom: 0.12rem;
}
.sel-all {
  margin-left: 0.38rem;
  padding-top: 0.18rem;
}
.sel-all .van-checkbox {
  margin-bottom: 0.1rem;
}
.vant-laji {
  font-size: 0.28rem;
  color: #666;
}
.editor {
  padding-top: 0.14rem;
  margin-left: 0.74rem;
  margin-right: 1.11rem;
}
.msg {
  float: left;
  text-align: center;
  padding-top: 0.3rem;
}
.msg h2 {
  font-size: 0.23rem;
  color: #999;
  line-height: 0.29rem;
}
.bottom .right {
  float: right;
  width: rem;
  background-color: #ff5500;
  color: #fff;
  width: 2rem;
  text-align: center;
  line-height: 1.15rem;
}
</style>