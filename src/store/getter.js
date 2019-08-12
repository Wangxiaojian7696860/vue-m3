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
   currentSong(state){
	   return state.playList[state.currentIndex];
   }
}