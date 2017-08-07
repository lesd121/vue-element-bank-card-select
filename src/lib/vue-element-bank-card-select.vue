<template>
  <div class="bank-card-select" :style="width?'width:'+width+'px':'width:100%'">
    <el-select v-model="value"
               placeholder="请选择储蓄卡"
               ref="mySelect"
               popperClass="bank-card-dropdown"
               @change="valueChange">
      <el-option
        v-for="item in list"
        :key="item[valueName]"
        :label="item[keyName]"
        :value="item[valueName]">
        <div class="card-item">
          <div class="bank-pic">
            <img :src="item.logoUrl"  @error="showErrorPic($event)"/>
          </div>
          <div class="name-info">
            <p :class="!isShowCardTip ? 'h100':''">{{item.bankName}}&nbsp;&nbsp;&nbsp;{{item[keyName]}}</p>
            <p class="tip" v-if="isShowCardTip">{{item.tip}}</p>
          </div>
        </div>
      </el-option>
    </el-select>
    <div class="cover" tabindex="1"
         @click="showMenu"
         @mouseover="handleMouseover"
         @mouseout="hanldeMouseout($event)"
         @keydown.down.prevent="navigateOptions('next')"
         @keydown.up.prevent="navigateOptions('prev')"
         @keydown.enter.prevent="selectOption"
         @keydown.esc.stop.prevent="hideMenu()">
      <div class="cover-show" v-if="selectItem">
        <div class="bank-pic">
          <img :src="selectItem.logoUrl" @error="showErrorPic($event)"/>
        </div>
        <div class="name-info">
          <p>{{selectItem.bankName}}&nbsp;&nbsp;&nbsp;{{selectItem[keyName]}}</p>
          <p class="tip">{{selectItem.tip}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../utils/common'
  let blankSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTZCODFGNzc2NDExRTc4M0NERkJFMDZERTk3QjkyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZEOTZCODIwNzc2NDExRTc4M0NERkJFMDZERTk3QjkyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQ5NkI4MUQ3NzY0MTFFNzgzQ0RGQkUwNkRFOTdCOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkQ5NkI4MUU3NzY0MTFFNzgzQ0RGQkUwNkRFOTdCOTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6SO2H4AAAAD0lEQVR42mJ4/PgxQIABAAVWAqpFmNnRAAAAAElFTkSuQmCC'
  export default {
    name: 'VueElementBankCardSelect',
    props: {
      keyName: {
        type: String,
        default: 'cardNo'
      },
      valueName: {
        type: String,
        default: 'value'
      },
      width: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: []
      },
      blankSrc: {
        type: String,
        default: blankSrc
      },
      isShowCardTip: {
        type: Boolean,
        default: true
      },
      cardNo: String,
      relateNode: String
    },
    data () {
      return {
        selectItem: null,
        mySelect: null,
        mySelectElInput: null,
        value: ''
      }
    },
    mounted () {
      this.mySelect = this.$refs.mySelect
      this.mySelectElInput = this.mySelect.$el.querySelector('.el-input__inner')
      /*if (this.mySelectElInput) {
        this.mySelectElInput.style.height = this.height + 'px'
      }*/
    },
    watch: {
      'mySelect.visible' (val, oldVal) {
        if (val) {
          if (this.mySelectElInput) {
//            this.mySelectElInput.style.borderColor = '#ff6600'
            this.mySelectElInput.style.borderColor = '#20a0ff'
          }
        } else {
          if (this.mySelectElInput) {
            if (!this.relateNode) {
              this.mySelectElInput.style.borderColor = '#bfcbd9'
            } else {
              let relateNode = document.querySelector(this.relateNode)
              if (relateNode.className.indexOf('is-error') >= 0) {
                this.mySelectElInput.style.borderColor = '#ff4949'
              } else {
                this.mySelectElInput.style.borderColor = '#bfcbd9'
              }
            }
          }
        }
      },
      'value' (val, oldVal) {
        this.$emit('update:cardNo', val)
        if (val) {
          this.mySelectElInput.style.borderColor = '#bfcbd9'
        }
      }
    },
    methods: {
      showMenu () {
        this.mySelect.visible = true
      },
      hideMenu () {
        this.mySelect.visible = false
      },
      navigateOptions (action) {
        this.mySelect.navigateOptions(action)
      },
      selectOption () {
        this.mySelect.selectOption()
      },
      handleMouseover () {
        if (this.mySelectElInput && !this.mySelect.visible) {
          this.mySelectElInput.style.borderColor = '#8391a5'
        }
      },
      hanldeMouseout (e) {
        if (this.mySelectElInput && !this.mySelect.visible) {
          this.mySelectElInput.style.borderColor = '#bfcbd9'
        }
      },
      valueChange (value) {
        let _this = this
        let index = common.findIndex(this.list, function (o) {
          return o[_this.valueName] === value
        })

        if (index >= 0) {
          this.selectItem = this.list[index]
        }
      },
      setBorderColor (flag) {
        if (flag) {
          this.mySelectElInput.style.borderColor = '#bfcbd9'
        } else {
          this.mySelectElInput.style.borderColor = '#ff4949'
        }
      },
      showErrorPic (e) {
        e.target.src = this.blankSrc
      }
    }
  }
</script>
<style lang="scss">
  .bank-card-select{
    position: relative;
    display: inline-block;
    box-sizing: border-box;

    *,
    *::before,
    *::after{
      box-sizing: border-box;
    }
    .el-select{
      width:100%;

      .el-input__inner{
        height:72px;
        line-height: 70px;
      }
    }

    .cover{
      position: absolute;
      left:1px;
      top:1px;
      right:1px;
      bottom:1px;
      background-color:transparent;
      cursor: pointer;
      padding-right:35px;
      overflow: hidden;
      border-radius: 4px;
      outline:none;

      .cover-show{
        width:100%;
        height:70px;
        line-height: 70px;
        background-color:#fff;
        padding:17px 0 17px 13px;
        position: relative;
        padding-left: 49px;

        .bank-pic {
          position: absolute;
          left: 13px;
          top:50%;
          margin-top:-18px;
          height: 36px;
          width: 36px;
          display: block;
          background-color: #e6e6e6;
          border-radius: 50%;
          overflow:hidden;

          img {
            height: 100%;
            width: 100%;
            display: block;
          }
        }
        .name-info {
          width:100%;
          height:100%;
          padding-left:10px;
          text-align: left;

          p{
            line-height: 16px;
            width:100%;
            margin:0;
            font-size:16px;
            color:#333;
            font-weight: bold;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }

          p.tip{
            line-height: 12px;
            font-size:12px;
            color:#999999;
            margin-top:6px;
          }
        }
      }
    }
  }

  .bank-card-dropdown{
    .el-select-dropdown__list{
      padding:0;
    }
    .el-select-dropdown__item {
      width:100%;
      padding:17px 13px;
      height:70px;
      margin:0;
      display: block;

      .card-item {
        height: 36px;
        line-height: 36px;
        position: relative;
        padding-left: 36px;

        .bank-pic {
          position: absolute;
          height: 36px;
          width: 36px;
          left: 0;
          top:50%;
          margin-top:-18px;
          border-radius: 50%;
          overflow:hidden;

          img {
            height: 100%;
            width: 100%;
            display: block;
          }
        }
        .name-info {
          width:100%;
          height:100%;
          padding-left:10px;

          p{
            line-height: 16px;
            width:100%;
            margin:0;
            font-size:16px;
            color:#333;
            font-weight: bold;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }

          p.tip{
            line-height: 12px;
            font-size:12px;
            color:#999999;
            margin-top:6px;
          }
        }
      }
    }
    .el-select-dropdown__item.selected{
      background-color: #ffac63;
      .card-item{
        .name-info {
          p.tip {
            color: #ececec;
          }
        }
      }
    }
    .el-select-dropdown__item.selected.hover {
      background-color: #ffac63;
    }
  }
</style>
