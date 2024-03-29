<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode()" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" :data="getSequenceList" class="list-content" :refreshDelay="refreshDelay">
          <transition-group ref="list" name="list" tag="ul">
            <li :key="item.id" class="item" v-for="(item,index) in getSequenceList"
                @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span @click.stop="deleteOne(item)" class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div @click="addSong" class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <!--<add-song ref="addSong"></add-song>-->
    </div>
  </transition>
</template>

<script>
  import {mapActions,mapGetters,mapMutations} from 'vuex'
  import {playMode} from '../../common/js/config'
  import {shuffle} from '../../common/js/util'
  import Scroll from '../../base/scroll/scroll'
  import Confirm from '../../base/confirm/confirm'


  export default {
    data() {
      return {
        showFlag: false,
        refreshDelay: 120
      }
    },
    computed: {
      modeText() {
        return this.getMode === 0 ? '顺序播放' : this.getMode ===2 ? '随机播放' : '单曲循环'
      },
/*	  iconMode(){
	     return this.getMode === 0 ? 'icon-sequence' : this.getMode === 1 ? 'icon-loop' : 'icon-random'
	  },*/
	  ...mapGetters(["getSequenceList","getMode","currentSong","favoriteList"])
	 },
     methods: {
	  hide(){
	    this.showFlag = false;
	  },
	  show(){
	     this.showFlag = true;
	  },
	  changeMode(){
		  var mode = this.getMode;
		  mode = (mode + 1) % 3;
		  this.setMode(mode);
		  let list = null;
		  if (mode === 2) {
			list = shuffle(this.getSequenceList);
		  } else {
			list = this.getSequenceList;
		  }
		  this.resetCurrentIndex(list);  
		  this.setPlaylist(list);	
	  },
	  showConfirm(){
	    this.$refs.confirm.show()
	  },
	  getCurrentIcon(item){
        if (this.currentSong.id === item.id) {
          return 'icon-play'
        }
        return ''
	  },
	  iconMode(){
	     return this.getMode === 0 ? 'icon-sequence' : this.getMode === 1 ? 'icon-loop' : 'icon-random'
	  },	  
	  selectItem(){},
	  toggleFavorite(item){
	     if(this.isFavorite(item)){
		   this.deleteFavorite(item)
		 }else{
		   this.saveFavorite(item)
		 }  
	  },
	  getFavoriteIcon(item){
	     if(this.isFavorite(item)){
		    return 'icon-favorite'
		 }
		 return 'icon-not-favorite'
	  },
	  isFavorite(song){
	     var index = this.favoriteList.findIndex((item)=>{
		     return item.id === song.id
		 })		 
		 return index > -1;	 
	  },
	  deleteOne(song){
	    this.deleteSong(song);
        if (!this.getSequenceList.length) {
          this.hide()
        }		
	  },
	  addSong(){},
	  confirmClear(){
        this.deleteSongList()
        this.hide()	  
	  },
	  resetCurrentIndex(list) {
		  let index = list.findIndex(item => {
			return item.id === this.currentSong.id;
		  });
		  this.setCurrentIndex(index);
	  },	  
	  ...mapMutations({
	    setPlaylist:"changePlayList",
		setCurrentIndex:"changeCurrentIndex",
		setMode:"changeMode"
	  }),
	  ...mapActions(["deleteSongList","deleteSong","deleteFavorite","saveFavorite"])
	},
	components: {
      Scroll,
      Confirm
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/css/variable";
  @import "../../common/css/mixin";

  .playlist{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active{
      transition: opacity 0.3s;
      .list-wrapper{
        transition: all 0.3s;
	  }	
	}	
    &.list-fade-enter, &.list-fade-leave-to{
      opacity: 0;
      .list-wrapper{
        transform: translate3d(0, 100%, 0);
	  }	
	}	
    &.list-fade-enter{}
    .list-wrapper{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header{
        position: relative;
        padding: 20px 30px 10px 20px;
        .title{
          display: flex;
          align-items: center;
          .icon{
            margin-right: 10px;
            font-size: 30px;
            color: $color-theme-d;
		  }	
          .text{
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
		  }	
          .clear{
            @include extend-click();
            .icon-clear{
              font-size: $font-size-medium;
              color: $color-text-d;
			 }  
		  }	  
		}	  
	  }		  
      .list-content{
        max-height: 240px;
        overflow: hidden;
        .item{
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active, &.list-leave-active{
            transition: all 0.1s;
		  }	
          &.list-enter, &.list-leave-to{
            height: 0;
		  }	
          .current{
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
		  }	
          .text{
            flex: 1;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text-d;
		  }	
          .like{
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite{
              color: $color-sub-theme;
			} 
		  }	  
          .delete{
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
		   }	
		}	
	  }		
      .list-operate{
        width: 140px;
        margin: 20px auto 30px auto;
        .add{
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add{
            margin-right: 5px;
            font-size: $font-size-small-s;
		  }	
          .text{
            font-size: $font-size-small
		  }	
		}	
	  }		
      .list-close{
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
	  }	
  }		
}		
</style>