<template>
  <div class="recommend">
    <scroll class="recommend-scroll" :data="discList" ref="scroll">
      <div>
        <slider v-if="recommends.length" class="slider-wrapper">
          <div class="slider-item" v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl" />
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              class="item"
              @click="selectItem(item)"
              v-for="(item,index) in discList"
              :key="index"
            >
              <div class="icon">
                <img width="60" height="60" :src="item.avtar" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.descname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Slider from "../../base/slider/slider"
import Scroll from "../../base/scroll/scroll"
import {commonParams,options} from '../../common/js/config';
import jsonp from 'jsonp'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  methods:{
    _param(data){
		var url='';
		for(var key in data){
			let value = data[key] !== undefined ? data[key] : '';
			url += '&'+key+'='+encodeURIComponent(value) ;
		}
		return url ? url.substring(1) : '';
    },
	getRecommend(){
		 var url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
		 var data = Object.assign({},commonParams,{
				platform:"h5",
				uin:0,
				needNewCode:1
		 });	 
		 url += (url.indexOf("?") > 0 ? "&" : "?" ) + this._param(data);	
		 jsonp(url,options,function(a,b){
		   console.log(a,b)
		 })	   
	}
  },
  created() {
      //created:在模板渲染成html前调用
    this.getRecommend();
  },
  mounted() {
      //mounted:在模板渲染成html后调用
    console.log(1);
  },
  updated() {
      /*由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      然而在大多数情况下，你应该避免在此
      期间更改状态。如果要相应状态改变，通常
      最好使用计算属性或 watcher 取而代之。
      如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
      // DOM 还没有更新
      this.$nextTick(function () {
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
      */
    console.log(2);
  },
  activated(){
      console.log(3);
  },
  deactivated(){
      console.log(4);
  },

  components: {
    Scroll,
    Slider
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/css/variable";
.recommend {
  position: fixed;
  width: 100%;
  overflow: hidden;
  top: 89px;
  bottom: 0;
  .recommend-scroll {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>