<template>
   <transition name="slide">
      <music-list  :songs="songs" :title="title" :bgImage="bgImage"></music-list>
   </transition>
</template>
<script>
  import MusicList from '../music-list/music-list'
  import { mapGetters } from 'vuex'
  import {song} from '../../api/api'
  export default{
    data(){
	   return {
	      songs:[]
	   }
	},
	methods:{
		_getSongList(){
			if (!this.getDisc.dissid) {
			  this.$router.push('/recommend')
			  return
			}
			this.$http({
				method: 'get',
				url:"https://wangxiaojian7696860.github.io/cao/static/data/singerdetail.json"
			}).then((res)=>{
                if(res.status ==200){
				      for(var item in res.data){
					     if(item == this.getDisc.dissid){
						   this.songs = this._normalizeSongs(res.data[item].list);		

						 }
					  }					
				}
			})		
		},
		_normalizeSongs(data){
			var ret = [];
           data.forEach(item => {
			   ret.push(new song(item.musicData))
		   });
		   return ret;
		}
	},
	created(){
       this._getSongList();
	},
	components:{
		MusicList
	},
	computed:{
		title(){
			return this.getDisc.name
		},
		bgImage(){
			return this.getDisc.avtar
		},
		...mapGetters([
			"getDisc"
		])
	}
    
  }
</script>
<style scoped lang="scss">
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }	
</style>