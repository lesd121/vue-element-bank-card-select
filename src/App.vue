<template>
  <div id="app">
    <vue-element-bank-card-select ref="bankCardSelect" :width="370" :list="bankList" ></vue-element-bank-card-select>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
          bankList: [
              {
                  bankName: "中国建设银行",
                  canUse: true,
                  cardNo: "6217 ******* 711",
//                  logoUrl: "https://filestest.qianduan.com/common/170322/c8a574ac3b9b4c6f82e2.png",
                  logoUrl: "",
                  tip: "单笔限额40万元，当日限额50万元",
                  value: "6217003320015847110"
              }
          ]
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
