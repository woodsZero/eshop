<template>
  <div class="foot">
    <div class="footNav">
      <router-link to="/home" activeClass="colorOne" class="index">首页</router-link>
      <router-link to="/sort" active-class="colorTwo" class="sort">分类</router-link>
      <router-link to="/shopCar" active-class="colorThree" class="shopCar">购物车</router-link>
      <router-link to="/mine" active-class="colorFour" class="mine">我</router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.foot {
  position: relative;
}

.footNav {
  width: 100%;
  height: 1.01rem;
  display: flex;
  position: fixed;
  background: #fff;
  border-top: 2px solid #eee;
  bottom: 0;
  left: 0;

  a {
    flex: 1;
    height: 0.35rem;
    padding-top: 0.66rem;
    font-size: 0.24rem;
    text-align: center;
  }
}

.index {
  background: url('../../assets/images/tab_home_nor.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}
.sort {
  background: url('../../assets/images/tab_menu_nor.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}

.shopCar {
  background: url('../../assets/images/tab_shopping_nor.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}

.mine {
  background: url('../../assets/images/tab_me_nor.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.7rem 0.12rem;
}
.colorOne {
  color: #fb9b00;
  background: url('../../assets/images/tab_home_hig.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}

.colorTwo {
  color: #fb9b00;
  background: url('../../assets/images/tab_menu_hig.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}

.colorThree {
  color: #fb9b00;
  background: url('../../assets/images/tab_shopping_hig.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.72rem 0.14rem;
}

.colorFour {
  color: #fb9b00;
  background: url('../../assets/images/tab_me_hig.png') no-repeat;
  background-size: 0.43rem;
  background-position: 0.7rem 0.12rem;
}
</style>