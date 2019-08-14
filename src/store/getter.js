export const getters = {
   getSinger(state){
       return state.singer
   },
   getDisc(state){
    return state.disc
   },
   getFullScreen(state){
	   return state.fullScreen;	   
   },
   getPlaying(state){
	   return state.playing;	   
   },   
   getPlaylist(state){
	   return state.playList;	   
   },     
   getCurrentIndex(state){
	   return state.currentIndex;	   
   },   
   getMode(state){
       return state.mode;
   },
   currentSong(state){
	   return state.playList[state.currentIndex] || {};
   },
   favoriteList:(state)=>{
    return state.favoriteList
  },
  playHistory:(state)=>{
     return state.playHistory
  },
  searchHistory:(state)=>{
      return state.searchHistory
  }
}